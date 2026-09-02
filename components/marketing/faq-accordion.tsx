"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

type FaqEntry = {
  id: string
  question: string
  answer: string
}

type FaqAccordionProps = {
  items: readonly FaqEntry[]
  className?: string
}

export function FaqAccordion({ items, className }: FaqAccordionProps) {
  return (
    <Accordion className={cn("w-full", className)}>
      {items.map((item) => (
        <AccordionItem key={item.id} value={item.id}>
          <AccordionTrigger className="py-4 text-base text-foreground hover:no-underline">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            <p>{item.answer}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
