import 'react-toggle/style.css'
import styles from './Toggle.module.css'

import { ReactNode } from 'react'
import ReactToggle from 'react-toggle'

interface ToggleProps {
  defaultChecked: boolean
  icons: {
    checked: ReactNode
    unchecked: ReactNode
  }
  className: string
  onChange: () => any
}

console.log({ styles })

const Toggle = (props: ToggleProps) => <ReactToggle {...props} className={styles.toggle} />

export default Toggle
