'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'

export default function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}>
      <Button
        variant="ghost"
        className="faq-item__question h-auto justify-between px-5 py-4.5 text-[0.97rem] font-semibold hover:bg-transparent"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        {question}
      </Button>
      <div className="faq-item__transition-wrapper">
        <div className="faq-item__transition-inner">
          <div className="faq-item__body">{answer}</div>
        </div>
      </div>
    </div>
  )
}
