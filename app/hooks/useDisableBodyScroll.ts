import { useEffect } from 'react'

export function useDisableBodyScroll(disableBodyScroll: boolean) {
  useEffect(() => {
    if (disableBodyScroll) {
      document.body.style.overflow = 'hidden'
      document.body.style.top = '0'
      document.body.style.position = 'fixed'
    }
    else {
      document.body.style.overflow = 'unset'
      document.body.style.top = 'unset'
      document.body.style.position = 'unset'
    }
  }, [disableBodyScroll])
}
