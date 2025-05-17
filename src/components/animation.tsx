"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { motion, useAnimation, useInView } from "framer-motion"

interface FadeInProps {
  children: ReactNode
  width?: "fit-content" | "100%"
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  fullWidth?: boolean
  className?: string
}

export function FadeIn({
  children,
  width = "fit-content",
  delay = 0,
  direction = "up",
  fullWidth = false,
  className = "",
}: FadeInProps) {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const getDirectionVariants = () => {
    switch (direction) {
      case "up":
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }
      case "down":
        return {
          hidden: { opacity: 0, y: -20 },
          visible: { opacity: 1, y: 0 },
        }
      case "left":
        return {
          hidden: { opacity: 0, x: 20 },
          visible: { opacity: 1, x: 0 },
        }
      case "right":
        return {
          hidden: { opacity: 0, x: -20 },
          visible: { opacity: 1, x: 0 },
        }
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }
    }
  }

  const variants = getDirectionVariants()

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={variants}
      transition={{ duration: 0.5, delay: delay }}
      style={{ width: fullWidth ? "100%" : width }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface StaggerContainerProps {
  children: ReactNode
  delay?: number
  className?: string
}

export function StaggerContainer({ children, delay = 0, className = "" }: StaggerContainerProps) {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.1,
            delayChildren: delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface PulseProps {
  children: ReactNode
  className?: string
}

export function Pulse({ children, className = "" }: PulseProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface FloatProps {
  children: ReactNode
  className?: string
  yOffset?: number
  duration?: number
}

export function Float({ children, className = "", yOffset = 10, duration = 2 }: FloatProps) {
  return (
    <motion.div
      animate={{
        y: [0, -yOffset, 0],
      }}
      transition={{
        duration: duration,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
