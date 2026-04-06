import React from 'react'
import type { Media } from '@/payload-types'

export type GalleryBlockProps = {
  blockType: 'gallery'
  title?: string | null
  images?: {
    image: number | Media
    caption?: string | null
    id?: string | null
  }[] | null
  columns?: number | null
}

export default function GalleryBlock({ block }: { block: GalleryBlockProps }) {
  const { title, images, columns = 3 } = block

  if (!images || images.length === 0) return null

  const gridColsClass = `gallery-grid--cols-${columns}`

  return (
    <section className="about-gallery">
      <div className="container">
        {title && <h2>{title}</h2>}
        <div className={`gallery-grid ${gridColsClass}`}>
          {images.map((item, index) => {
            const image = item.image as Media
            if (!image || !image.url) return null

            return (
              <div key={item.id ?? index} className="gallery-item">
                <img
                  src={image.url}
                  alt={image.alt || title || 'Zdjęcie w galerii'}
                  loading="lazy"
                />
                {item.caption && (
                  <div className="gallery-item__overlay">
                    <span className="gallery-item__caption">{item.caption}</span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
