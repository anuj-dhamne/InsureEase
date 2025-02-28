"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface HeroSectionProps {
  onGetStarted: () => void
}

export default function HeroSection({ onGetStarted }: HeroSectionProps) {
  const floatingImages = [
    { src: "/placeholder.svg", alt: "Health Insurance", width: 120, height: 120, delay: 0 },
    { src: "/placeholder.svg", alt: "Vehicle Insurance", width: 100, height: 100, delay: 0.5 },
    { src: "/placeholder.svg", alt: "Life Insurance", width: 90, height: 90, delay: 1 },
    { src: "/placeholder.svg", alt: "Home Insurance", width: 110, height: 110, delay: 1.5 },
    { src: "/placeholder.svg", alt: "Travel Insurance", width: 80, height: 80, delay: 2 },
  ]

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Floating Images */}
      {floatingImages.map((image, index) => (
        <motion.div
          key={index}
          className="absolute opacity-20"
          initial={{
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            opacity: 0,
          }}
          animate={{
            x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`, `${Math.random() * 100}%`],
            y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`, `${Math.random() * 100}%`],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 20,
            delay: image.delay,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          <Image
            src={image.src || "/placeholder.svg"}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className="rounded-full"
          />
        </motion.div>
      ))}

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Protect What Matters Most
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-8 text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Discover tailored insurance solutions that fit your lifestyle and budget. Get personalized recommendations
            in minutes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button size="lg" className="text-lg px-8 py-6" onClick={onGetStarted}>
              Get Started
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background pointer-events-none" />
    </section>
  )
}

