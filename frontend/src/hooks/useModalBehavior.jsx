import { useEffect } from "react"

export function useModalBehavior({ isOpen, ref, scrollY }) {
  useEffect(() => {
    if (isOpen && ref.current) {
      document.body.style.overflow = "hidden"
      ref.current.style.top = `${scrollY}px`
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen, scrollY, ref])
}
