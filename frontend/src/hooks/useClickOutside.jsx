import { useEffect } from "react"

export function useClickOutside(ref, callback, active = true) {
	useEffect(() => {
		if (!active) return

		const handleClickOutside = (event) => {
			if (ref.current && event.target === ref.current) {
				callback()
			}
		}

		document.addEventListener("mousedown", handleClickOutside)
		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [ref, callback, active])
}
