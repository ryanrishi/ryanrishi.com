'use client'

import { motion } from 'framer-motion'

interface LogoProps {
  width?: number
}

export default function Logo({ width = 105 }: LogoProps) {
  const duration = 1
  const type = 'spring'
  const delay = 0.2
  const height = width * 100 / 105

  return (
    <motion.svg
      stroke="currentColor"
      strokeWidth={100 / 6}
      width={width}
      height={height}
      viewBox="0 0 105 100"
    >
      <motion.g>
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration,
            type,
            delay: delay * 0,
          }}
          d="M 0,8.3333 A 41.6666,41.6666 0 0 1 41.6666,50"
          fill="none"
        />
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration,
            type,
            delay: delay * 1,
          }}
          d="M 20.8333,50 A 41.6666,41.6666 0 0 0 62.5,91.775291"
          fill="none"
        />
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration,
            type,
            delay: delay * 2,
          }}
          d="M 42.5,8.6441708 A 41.6666,41.6666 0 0 1 84.351978,50.5"
          fill="none"
        />
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration,
            type,
            delay: delay * 3,
          }}
          d="M 62.4236,50.5 A 41.6666,41.6666 0 0 0 104.16,92.21952"
          fill="none"
        />
      </motion.g>

    </motion.svg>
  )
}
