import { useEffect, useRef, useState } from "react"
import retour from "../assets/back_logo.png"
import axios from "axios"
import PropTypes from "prop-types"
/*Components*/
import AjoutExtensionComponents from "../Components/Admin/AjoutExtensionComponents"
import ExtensionModal from "../Components/Admin/ExtensionModal"
import ShowExtension from "../Components/Admin/ShowExtension"
import ModifyExtensionModal from "../Components/Admin/ModifyExtensionModal"
/*Functions*/
import { AjoutExtension } from "../function/Admin/AjoutExtension"
import { AjoutRarete } from "../function/Admin/AjoutRarete"
/*Hooks*/
import { useScrollPosition } from "../hooks/useScrollPosition"
import { useClickOutside } from "../hooks/useClickOutside"
import { useModalBehavior } from "../hooks/useModalBehavior"
function Admin({ setRoute }) {
	const [extension, setExtension] = useState([])
	const [modifyExtension, setModifyExtension] = useState("")
	const [openModifyExtention, setOpenModifyExtention] = useState(false)
	const [openModifyOneExtension, setOpenModifyOneExtension] = useState(false)
	const [extensionInModification, setExtensionInModification] = useState("")
	const [rarete, setRarete] = useState([])
	const nomExtensionRef = useRef(null)
	const imageExtensionRef = useRef(null)
	const nbCarteTotalExtensionRef = useRef(null)
	const nbCarteExtensionRef = useRef(null)
	const expandRef = useRef(null)
	const rareteRef = useRef(null)
	const imageRareteRef = useRef(null)
	const expandExtensionModifyRef = useRef(null)

	useEffect(() => {
		axios
			.get(`${import.meta.env.VITE_API_URL}/extension`)
			.then((res) => setExtension(res.data))
			.catch((err) => console.error(err))
		axios
			.get(`${import.meta.env.VITE_API_URL}/rarete`)
			.then((res) => setRarete(res.data))
			.catch((err) => console.error(err))
	}, [])
	/*Gesion des modales et retrait du scroll si ouvert*/
	const scrollY = useScrollPosition()

	useClickOutside(expandRef, () => setOpenModifyExtention(false), openModifyExtention)
	useClickOutside(expandExtensionModifyRef, () => setOpenModifyOneExtension(false), openModifyOneExtension)

	useModalBehavior({ isOpen: openModifyExtention, ref: expandRef, scrollY })
	useModalBehavior({ isOpen: openModifyOneExtension, ref: expandExtensionModifyRef, scrollY })

	return (
		<div className="bg-primary font-sans min-h-screen h-full flex flex-col gap-[10px] items-center">
			<div className="w-full flex justify-between items-center mt-[20px] px-[15px]">
				<img src={retour} alt="" onClick={() => setRoute("Accueil")} />
				<h1 className="text-3xl text-white">Mode Admin</h1>
				<p className="text-transparent select-none">u</p>
			</div>
			<AjoutExtensionComponents
				nomExtensionRef={nomExtensionRef}
				nbCarteTotalExtensionRef={nbCarteTotalExtensionRef}
				nbCarteExtensionRef={nbCarteExtensionRef}
				imageExtensionRef={imageExtensionRef}
				AjoutExtension={AjoutExtension}
				rarete={rarete}
				setExtension={setExtension}
				rareteRef={rareteRef}
				imageRareteRef={imageRareteRef}
				AjoutRarete={AjoutRarete}
				setRarete={setRarete}
			/>
			<h3 className="text-white text-xl">Rareté existantes</h3>
			<div className="bg-secondary min-h-[100px] flex items-center gap-[10px] w-auto rounded-xl py-[15px] px-[10px]">
				{rarete.map((raretes) => (
					<div
						key={raretes._id}
						className="bg-tertiary h-[80px] flex flex-col justify-center gap-[10px] py-[15px] px-[10px] rounded-md"
					>
						<p className="text-white text-lg">{raretes.nom}</p>
						<div className="flex gap-[10px] justify-center items-center pt-[5px]">
							<img src={raretes.url} className="max-h-[32px]" alt="" />
						</div>
					</div>
				))}
			</div>
			<h3 className="text-white text-xl"> extensions existantes</h3>
			<ShowExtension
				extension={extension}
				setExtension={setExtension}
				setModifyExtension={setModifyExtension}
				setOpenModifyExtention={setOpenModifyExtention}
				openModifyExtention={openModifyExtention}
				setOpenModifyOneExtension={setOpenModifyOneExtension}
				setExtensionInModification={setExtensionInModification}
				openModifyOneExtension={openModifyOneExtension}
			/>
			<div
				className={`${
					openModifyExtention ? "flex" : "hidden"
				} absolute justify-center items-center absolut w-full h-[100%]`}
				ref={expandRef}
			>
				<ExtensionModal
					extension={extension}
					modifyExtension={modifyExtension}
					setExtension={setExtension}
					rarete={rarete}
					setOpenModifyExtention={setOpenModifyExtention}
					openModifyExtention={openModifyExtention}
				/>
			</div>
			<div
				className={`${
					openModifyOneExtension ? "flex" : "hidden"
				} absolute justify-center items-center absolut w-full h-[100%]`}
				ref={expandExtensionModifyRef}
			>
				<ModifyExtensionModal
					extension={extension}
					extensionInModification={extensionInModification}
					setExtension={setExtension}
					rarete={rarete}
					nomExtensionRef={nomExtensionRef}
					setOpenModifyOneExtension={setOpenModifyOneExtension}
					openModifyOneExtension={openModifyOneExtension}
				/>
			</div>
		</div>
	)
}
Admin.propTypes = {
	setRoute: PropTypes.func.isRequired,
}
export default Admin
