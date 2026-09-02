"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { ContactPageContent } from "@/content/pages/types"
import {
  contactFormSchema,
  fieldErrorsFromZod,
} from "@/lib/validations/contact"
import { cn } from "@/lib/utils"

type ContactFormProps = {
  content: ContactPageContent["form"]
  className?: string
}

type ContactFormValues = {
  name: string
  email: string
  company: string
  topic: string
  message: string
  website: string
}

export function ContactForm({ content, className }: ContactFormProps) {
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    defaultValues: {
      name: "",
      email: "",
      company: "",
      topic: content.topics[0]?.value ?? "adviesgesprek",
      message: "",
      website: "",
    },
  })

  const onSubmit = handleSubmit(async (values) => {
    setFormError(null)
    const parsed = contactFormSchema.safeParse(values)
    if (!parsed.success) {
      const fieldErrors = fieldErrorsFromZod(parsed.error)
      for (const [key, message] of Object.entries(fieldErrors)) {
        setError(key as keyof ContactFormValues, { message })
      }
      return
    }

    // Honeypot filled → silent fake success for bots
    if (parsed.data.website) {
      setSuccess(true)
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      })

      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as {
          error?: string
        } | null
        setFormError(body?.error ?? content.errorGeneric)
        return
      }

      setSuccess(true)
      reset({
        name: "",
        email: "",
        company: "",
        topic: content.topics[0]?.value ?? "adviesgesprek",
        message: "",
        website: "",
      })
    } catch {
      setFormError(content.errorGeneric)
    } finally {
      setSubmitting(false)
    }
  })

  if (success) {
    return (
      <div
        className={cn("border-t border-border pt-8", className)}
        role="status"
      >
        <h3 className="text-xl">{content.successHeading}</h3>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          {content.successBody}
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-6"
          onClick={() => {
            setSuccess(false)
            setFormError(null)
          }}
        >
          Nog een bericht sturen
        </Button>
      </div>
    )
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn("space-y-5", className)}
      noValidate
    >
      <div className="space-y-1.5">
        <label htmlFor="contact-name" className="text-sm font-medium">
          {content.nameLabel}
        </label>
        <Input
          id="contact-name"
          autoComplete="name"
          aria-invalid={Boolean(errors.name) || undefined}
          {...register("name")}
        />
        {errors.name ? (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        ) : null}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="contact-email" className="text-sm font-medium">
          {content.emailLabel}
        </label>
        <Input
          id="contact-email"
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email) || undefined}
          {...register("email")}
        />
        {errors.email ? (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        ) : null}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="contact-company" className="text-sm font-medium">
          {content.companyLabel}{" "}
          <span className="font-normal text-muted-foreground">
            {content.companyOptional}
          </span>
        </label>
        <Input
          id="contact-company"
          autoComplete="organization"
          {...register("company")}
        />
        {errors.company ? (
          <p className="text-sm text-destructive">{errors.company.message}</p>
        ) : null}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="contact-topic" className="text-sm font-medium">
          {content.topicLabel}
        </label>
        <select
          id="contact-topic"
          className="flex h-9 w-full rounded-lg border border-input bg-transparent px-2.5 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm"
          aria-invalid={Boolean(errors.topic) || undefined}
          {...register("topic")}
        >
          {content.topics.map((topic) => (
            <option key={topic.value} value={topic.value}>
              {topic.label}
            </option>
          ))}
        </select>
        {errors.topic ? (
          <p className="text-sm text-destructive">{errors.topic.message}</p>
        ) : null}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="contact-message" className="text-sm font-medium">
          {content.messageLabel}
        </label>
        <Textarea
          id="contact-message"
          rows={6}
          aria-invalid={Boolean(errors.message) || undefined}
          {...register("message")}
        />
        {errors.message ? (
          <p className="text-sm text-destructive">{errors.message.message}</p>
        ) : null}
      </div>

      {/* Honeypot — visually hidden */}
      <div
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="contact-website">Website</label>
        <Input
          id="contact-website"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      {formError ? (
        <p className="text-sm text-destructive" role="alert">
          {formError}
        </p>
      ) : null}

      <Button type="submit" variant="accent" size="lg" disabled={submitting}>
        {submitting ? content.submittingLabel : content.submitLabel}
      </Button>
    </form>
  )
}
