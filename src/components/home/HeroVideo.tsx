'use client'

import { useRef, useEffect, useState } from 'react'

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleCanPlay = () => {
      setReady(true)
      // fade out the image sitting behind the video
      video.parentElement?.classList.add('video-ready')
    }

    if (video.readyState >= 3) {
      handleCanPlay()
      return
    }

    video.addEventListener('canplay', handleCanPlay)
    return () => video.removeEventListener('canplay', handleCanPlay)
  }, [])

  return (
    <video
      ref={videoRef}
      className="hero__bg-video"
      style={{ opacity: ready ? 0.9 : 0 }}
      autoPlay
      muted
      loop
      playsInline
    >
      <source src="/hero-pantera.webm" type="video/webm" />
      <source src="/hero-pantera.mp4" type="video/mp4" />
    </video>
  )
}
