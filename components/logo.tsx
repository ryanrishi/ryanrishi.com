import { motion } from 'framer-motion'

export default function Logo() {
  const duration = 1;
  const type = 'spring';
  const delay = 0.2;

  return (
    <motion.svg
      className="text-black"
      stroke="currentColor"
      width={105/3}
      height={100/3}
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
          // d="M 41.66292,50.065404 A 41.66292,41.662917 0 0 0 0,8.4024838"
          d="M 0,8.4024838 A 41.66292,41.662917 0 0 1 41.66292,50.065404"
          fill="none"
          strokeWidth={100/6}
        />
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration,
            type,
            delay: delay * 1,
          }}
          d="M 20.7247,50 A 41.775282,41.775278 0 0 0 62.5,91.775291"
          fill="none"
          strokeWidth={100/6}
        />
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration,
            type,
            delay: delay * 2,
          }}
          d="M 42.5,8.6441708 A 41.851973,41.851979 0 0 1 84.351978,50.496149"
          fill="none"
          strokeWidth={100/6}
        />
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration,
            type,
            delay: delay * 3,
          }}
          d="M 62.4236,50.483138 A 41.736388,41.736372 0 0 0 104.16,92.21952"
          fill="none"
          strokeWidth={100/6}
        />
      </motion.g>

    </motion.svg>
  )
}
