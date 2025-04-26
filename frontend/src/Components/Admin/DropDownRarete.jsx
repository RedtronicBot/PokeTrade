import { useState, useRef, useEffect } from "react"
import PropTypes from "prop-types"
function DropDownRarete({ cartes, rarete, modifyCarte, indexCarte, modifyExtension, setExtension }) {
	const [open, setOpen] = useState(false)
	const dropdownRef = useRef(null)

	function onModifyCarte(raretes) {
		setOpen(!open)
		modifyCarte("rarete", raretes, indexCarte, modifyExtension, setExtension)
	}

	useEffect(() => {
		function handleClickOutside(event) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setOpen(false)
			}
		}
		document.addEventListener("mousedown", handleClickOutside)
		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [])

	return (
		<div
			ref={dropdownRef}
			className="relative bg-secondary w-[35px] h-[35px] p-[5px] rounded-lg flex justify-center items-center"
			onClick={() => setOpen(!open)}
		>
			<img src={rarete.find((e) => e.nom === cartes.rarete).url} alt="" className="min-h-[10px] min-w-[10px]" />
			<div
				className={`${
					open ? "flex" : "hidden"
				} absolute bg-secondary w-[35px] flex-col p-[5px] rounded-lg items-center gap-[5px] top-[38px]`}
			>
				{rarete.map((raretes, index) => (
					<img src={raretes.url} alt="" key={index} onClick={() => onModifyCarte(raretes.nom)} />
				))}
			</div>
		</div>
	)
}
DropDownRarete.propTypes = {
	cartes: PropTypes.object.isRequired,
	rarete: PropTypes.array.isRequired,
	modifyCarte: PropTypes.func.isRequired,
	indexCarte: PropTypes.number.isRequired,
	modifyExtension: PropTypes.string.isRequired,
	setExtension: PropTypes.func.isRequired,
}
export default DropDownRarete
