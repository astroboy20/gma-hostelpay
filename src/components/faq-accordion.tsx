"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FadeIn } from "./animation"

interface FAQItem {
  question: string
  answer: string
}

interface FAQAccordionProps {
  faqs: FAQItem[]
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, index) => (
        <FadeIn key={index} delay={0.1 * index} fullWidth>
          <AccordionItem value={`item-${index}`} className="border-b border-gray-200">
            <AccordionTrigger className="text-left font-medium py-4 hover:text-blue-600 transition-colors">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 pb-4">{faq.answer}</AccordionContent>
          </AccordionItem>
        </FadeIn>
      ))}
    </Accordion>
  )
}
