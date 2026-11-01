"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}

export function FadeIn({
  children,
  className = "",
  delay = 0,
  duration = 0.5,
  direction = "up",
}: FadeInProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const offset = 24;
  let initialX = 0;
  let initialY = 0;

  if (direction === "up") initialY = offset;
  if (direction === "down") initialY = -offset;
  if (direction === "left") initialX = offset;
  if (direction === "right") initialX = -offset;

  return (
    <motion.div
      initial={{ opacity: 0, x: initialX, y: initialY }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.1,
}: StaggerProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.21, 0.47, 0.32, 0.98],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
