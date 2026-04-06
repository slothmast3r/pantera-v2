import React from 'react'
import Link from 'next/link'
import type { Offer } from '@/payload-types'

import GalleryBlock, { GalleryBlockProps } from './GalleryBlock'

type LayoutBlock = NonNullable<Offer['layout']>[number] | GalleryBlockProps

// ---- RichText ----
function RichTextBlockRenderer({ block }: { block: Extract<LayoutBlock, { blockType: 'richText' }> }) {
  const text = (block.content?.root?.children as any[])
    ?.map((node: any) => node.children?.map((c: any) => c.text).join('') ?? '')
    .filter(Boolean)
    .join('\n\n')

  if (!text) return null

  return (
    <section className="offer-richtext">
      <div className="container">
        {text.split('\n\n').map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </section>
  )
}

// ---- OfferCards ----
function OfferCardsBlockRenderer({ block }: { block: Extract<LayoutBlock, { blockType: 'offerCards' }> }) {
  return (
    <section className="offer-offerings">
      <div className="container">
        {block.label && <div className="label">{block.label}</div>}
        {block.heading && <h2>{block.heading}</h2>}
        {block.subheading && <p className="offer-offerings__subtitle">{block.subheading}</p>}
        <div className="offer-cards-grid">
          {block.items?.map((item, i) => (
            <div key={item.id ?? i} className="offer-card-item">
              {item.icon && <span className="offer-card-item__icon">{item.icon}</span>}
              <h3>{item.title}</h3>
              {item.description && <p>{item.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---- ForWho ----
function ForWhoBlockRenderer({ block }: { block: Extract<LayoutBlock, { blockType: 'forWho' }> }) {
  const isDark = block.variant !== 'light'
  return (
    <section className={isDark ? 'offer-for-who' : 'offer-for-who offer-for-who--light'}>
      <div className="container">
        <div className="offer-for-who__inner">
          {block.label && <div className={`label ${isDark ? 'label--white' : ''}`}>{block.label}</div>}
          <h2>{block.title}</h2>
          {block.content && <p>{block.content}</p>}
          {block.bullets && block.bullets.length > 0 && (
            <ul className="offer-bullets">
              {block.bullets.map((b, i) => (
                <li key={b.id ?? i}>{b.text}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}

// ---- ContactCard ----
function ContactCardBlockRenderer({ block }: { block: Extract<LayoutBlock, { blockType: 'contactCard' }> }) {
  if (!block.email && !block.phone) return null
  return (
    <section className="offer-contact-section">
      <div className="container">
        <div className="offer-contact-card">
          <h4>{block.heading ?? 'Kontakt w sprawie oferty'}</h4>
          {block.email && (
            <div className="offer-contact-card__line">
              <span>📧</span>
              <a href={`mailto:${block.email}`}>{block.email}</a>
            </div>
          )}
          {block.phone && (
            <div className="offer-contact-card__line">
              <span>📞</span>
              <a href={`tel:${block.phone.replace(/\s/g, '')}`}>{block.phone}</a>
            </div>
          )}
          {block.note && <p className="offer-contact-card__note">{block.note}</p>}
        </div>
      </div>
    </section>
  )
}

// ---- CTA ----
function CTABlockRenderer({ block }: { block: Extract<LayoutBlock, { blockType: 'cta' }> }) {
  const variantClass = block.variant === 'dark' ? 'offer-cta offer-cta--block' : 'offer-cta offer-cta--block offer-cta--light'
  return (
    <section className={variantClass}>
      <div className="container">
        <h2>{block.heading}</h2>
        {block.description && <p>{block.description}</p>}
        <div className="offer-cta__buttons">
          {block.primaryButton?.text && (
            <Link href={(block.primaryButton.link ?? '/kontakt') as any} className="btn btn--orange">
              {block.primaryButton.text}
            </Link>
          )}
          {block.secondaryButton?.text && (
            <Link href={(block.secondaryButton.link ?? '#') as any} className="btn btn--outline-white">
              {block.secondaryButton.text}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}

// ---- FAQ ----
function FAQBlockRenderer({ block }: { block: Extract<LayoutBlock, { blockType: 'faqSection' }> }) {
  const faqs = block.faqs as any[]
  if (!faqs?.length) return null
  return (
    <section className="offer-faq">
      <div className="container">
        {block.heading && <h2>{block.heading}</h2>}
        <div className="offer-faq__list">
          {faqs.map((item: any, i: number) => (
            <details key={item.id ?? i} className="offer-faq__item">
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---- Main renderer ----
export default function BlockRenderer({ layout }: { layout: Offer['layout'] }) {
  if (!layout?.length) return null

  return (
    <>
      {layout.map((block, i) => {
        switch (block.blockType) {
          case 'richText':      return <RichTextBlockRenderer key={i} block={block} />
          case 'offerCards':    return <OfferCardsBlockRenderer key={i} block={block} />
          case 'forWho':        return <ForWhoBlockRenderer key={i} block={block} />
          case 'contactCard':   return <ContactCardBlockRenderer key={i} block={block} />
          case 'cta':           return <CTABlockRenderer key={i} block={block} />
          case 'faqSection':    return <FAQBlockRenderer key={i} block={block} />
          case 'gallery':       return <GalleryBlock key={i} block={block as GalleryBlockProps} />
          default:              return null
        }
      })}
    </>
  )
}
