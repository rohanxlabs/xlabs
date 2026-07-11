import { Variants } from "framer-motion"

export const easings = {
  smooth: [0.25, 0.1, 0.25, 1],
  snappy: [0.4, 0, 0.2, 1],
  gentle: [0.3, 0.1, 0.3, 1],
  emphasized: [0.1, 0.9, 0.2, 1],
  linear: [0, 0, 1, 1],
} as const

export const durations = {
  fast: 0.15,
  quick: 0.25,
  default: 0.4,
  slow: 0.6,
  slower: 0.8,
  page: 1.2,
} as const

export const springs = {
  button: {
    type: "spring",
    stiffness: 400,
    damping: 30,
    mass: 0.8,
  },
  card: {
    type: "spring",
    stiffness: 300,
    damping: 30,
    mass: 1,
  },
  magnetic: {
    type: "spring",
    stiffness: 500,
    damping: 25,
    mass: 0.5,
  },
  soft: {
    type: "spring",
    stiffness: 200,
    damping: 20,
    mass: 1.5,
  },
  bounce: {
    type: "spring",
    stiffness: 600,
    damping: 15,
    mass: 0.6,
  },
} as const

export const viewport = {
  once: true,
  margin: "-100px 0px -100px 0px",
  amount: 0.2,
} as const

export const staggers = {
  fast: 0.05,
  default: 0.08,
  slow: 0.12,
  section: 0.15,
} as const

export const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
}

export const slideDown: Variants = {
  hidden: { opacity: 0, y: -32 },
  visible: { opacity: 1, y: 0 },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
}

export const blurIn: Variants = {
  hidden: { opacity: 0, filter: "blur(8px)" },
  visible: { opacity: 1, filter: "blur(0px)" },
}

export const container: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggers.default,
      delayChildren: 0.1,
    },
  },
}

export const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.default,
      ease: easings.smooth,
    },
  },
}

export const buttonHover: Variants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.03,
    transition: springs.button,
  },
  tap: { scale: 0.97 },
}

export const magneticButton: Variants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.05,
    boxShadow: "0 12px 40px -8px rgba(38, 128, 74, 0.4)",
    transition: springs.magnetic,
  },
  tap: { scale: 0.95 },
}

export const cardHover: Variants = {
  initial: { y: 0, boxShadow: "0 0 0 0 rgba(0,0,0,0)" },
  hover: { 
    y: -8,
    boxShadow: "0 20px 40px -12px rgba(0,0,0,0.3)",
    transition: springs.card,
  },
}

export const card3DTilt: Variants = {
  initial: { rotateX: 0, rotateY: 0, scale: 1 },
  hover: { 
    scale: 1.02,
    transition: { duration: 0.4, ease: easings.smooth },
  },
}

export const spotlight: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  hover: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: durations.quick, ease: easings.smooth },
  },
}

export const glowPulse: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { 
    opacity: [0, 0.5, 0],
    scale: [0.8, 1.2, 0.8],
    transition: {
      duration: 2,
      ease: easings.smooth,
      repeat: Infinity,
      repeatDelay: 1,
    },
  },
}

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggers.section,
      delayChildren: 0.2,
    },
  },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.slow,
      ease: easings.smooth,
    },
  },
}