import { ReactNode } from 'react'

type CalloutType = 'success' | 'info' | 'warning' | 'error'

interface CalloutProps {
  children: ReactNode;
  type?: CalloutType;
}

const calloutTypeToColorName: Record<CalloutType, string> = {
  success: 'green',
  info: 'blue',
  warning: 'yellow',
  error: 'red',
}

export default function Callout({ type = 'info', children }: CalloutProps) {
  const color = calloutTypeToColorName[type]

  return (
    <div className={`not-prose text-${color}-800 border-l-4 border-${color}-800 bg-${color}-100 pl-2 py-4 mb-4 dark:bg-${color}-800 dark:text-${color}-50 dark:border-${color}-300 transition-colors rounded`}>{children}</div>
  )
}
