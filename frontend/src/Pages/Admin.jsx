import { useEffect, useRef, useState } from "react"
import retour from "../assets/back_logo.png"
import trash from "../assets/trash-solid.svg"
import modify from "../assets/pen-solid.svg"
import axios from "axios"
import PropTypes from "prop-types"
import DropDownRarete from "../Components/DropDownRarete"
function Admin({ setRoute }) {
	const [extension, setExtension] = useState([])
	const [modifyExtension, setModifyExtension] = useState("")
	const [openModifyExtention, setOpenModifyExtention] = useState(false)
	const [openModifyOneExtension, setOpenModifyOneExtension] = useState(false)
	const [extensionInModification, setExtensionInModification] = useState("")
	const [previewImage, setPreviewImage] = useState({})
	const [scrollY, setScrollY] = useState(0)
	const [rarete, setRarete] = useState([])
	const nomExtensionRef = useRef(null)
	const imageExtensionRef = useRef(null)
	const imageCarteRef = useRef(new FormData())
	const nbCarteTotalExtensionRef = useRef(null)
	const nbCarteExtensionRef = useRef(null)
	const expandRef = useRef(null)
	const rareteRef = useRef(null)
	const imageRareteRef = useRef(null)
	const expandExtensionModifyRef = useRef(null)
	const nomExtensionModifyRef = useRef(null)
	const nbCarteTotalExtensionModifyRef = useRef(null)
	const nbCarteExtensionModifyRef = useRef(null)
	const imageExtensionModifyRef = useRef(null)

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

	function AjoutExtension() {
		const carte = []
		for (var i = 0; i < parseInt(nbCarteTotalExtensionRef.current.value); i++) {
			var carteObj

			carteObj = {
				nom: "",
				image: "",
				obtenu: false,
				trade: false,
				numero: i + 1,
				rarete: rarete[0].nom,
				mission_premium: false,
			}
			carte.push(carteObj)
		}
		axios
			.post(`${import.meta.env.VITE_API_URL}/extension`, {
				nom: nomExtensionRef.current.value,
				nbCarteTotal: parseInt(nbCarteTotalExtensionRef.current.value),
				nbCarte: parseInt(nbCarteExtensionRef.current.value),
				carte: carte,
			})
			.then(() => {
				const file = imageExtensionRef.current.files[0]
				const extension = file.name.split(".").pop()
				const newFileName = `${nomExtensionRef.current.value}.${extension}`
				const newFile = new File([file], newFileName, {
					type: file.type,
				})
				const formDataImage = new FormData()
				formDataImage.append("image", newFile)
				formDataImage.append("nom", nomExtensionRef.current.value)
				axios
					.post(`${import.meta.env.VITE_API_URL}/extension/image`, formDataImage, {
						headers: { "Content-Type": "multipart/form-data" },
					})
					.then(() => {
						axios
							.get(`${import.meta.env.VITE_API_URL}/extension`)
							.then((res) => {
								setExtension(res.data)
								nomExtensionRef.current.value = ""
								nbCarteTotalExtensionRef.current.value = ""
								nbCarteExtensionRef.current.value = ""
								imageExtensionRef.current.value = ""
							})
							.catch((err) => console.error(err))
					})
					.catch((err) => console.error(err))
			})
			.catch((err) => console.error(err))
	}

	function onModifyExtension(value) {
		setModifyExtension(value)
		setOpenModifyExtention(!openModifyExtention)
	}

	useEffect(() => {
		if (openModifyExtention || openModifyOneExtension) {
			document.body.style.overflow = "hidden"
			expandRef.current.style.top = `${scrollY}px`
			expandExtensionModifyRef.current.style.top = `${scrollY}px`
		} else {
			document.body.style.overflow = "auto"
		}
		return () => {
			document.body.style.overflow = "auto"
		}
	}, [openModifyExtention, openModifyOneExtension, scrollY])

	const handleScroll = () => {
		setScrollY(window.scrollY)
	}

	useEffect(() => {
		window.addEventListener("scroll", handleScroll)
		return () => {
			window.removeEventListener("scroll", handleScroll)
		}
	}, [])

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (expandRef.current && event.target === expandRef.current) {
				setOpenModifyExtention(false)
			}
		}
		document.addEventListener("mousedown", handleClickOutside)
		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [openModifyExtention])

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (expandExtensionModifyRef.current && event.target === expandExtensionModifyRef.current) {
				setOpenModifyOneExtension(false)
			}
		}
		document.addEventListener("mousedown", handleClickOutside)
		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [openModifyOneExtension])

	function uploadCarteImage(file, index, nomExtension) {
		const extension = file.name.split(".").pop()
		const newFileName = `${nomExtension.replace(/[\s'"]/g, "_")}_${(index + 1)
			.toString()
			.padStart(3, "0")}.${extension}`
		const newFile = new File([file], newFileName, { type: file.type })
		imageCarteRef.current.append("carte", newFile)
		const previewUrl = URL.createObjectURL(file)
		setPreviewImage((prev) => ({
			...prev,
			[index]: previewUrl,
		}))
		setExtension((prevExtensions) => {
			const extensionCopy = [...prevExtensions]
			const extensionToUpdate = extensionCopy.find((ext) => ext.nom === nomExtension)
			if (extensionToUpdate) {
				extensionToUpdate.carte[index].image = `${import.meta.env.VITE_API_URL}/cartes/${newFileName}`
			}
			return extensionCopy
		})
	}

	function uploadCarte(nomExtension) {
		axios
			.put(`${import.meta.env.VITE_API_URL}/extension`, {
				nom: nomExtension,
				carte: extension.find((ext) => ext.nom === nomExtension).carte,
			})
			.then(() => {
				axios
					.post(`${import.meta.env.VITE_API_URL}/extension/carte`, imageCarteRef.current, {
						headers: { "Content-Type": "multipart/form-data" },
					})
					.then(() => setOpenModifyExtention(!openModifyExtention))
					.catch((err) => console.error(err))
			})
			.catch((err) => console.error(err))
	}

	function AjoutRarete() {
		const rareteFormData = new FormData()
		rareteFormData.append("rarete", imageRareteRef.current.files[0])
		rareteFormData.append("nom", rareteRef.current.value)
		axios
			.post(`${import.meta.env.VITE_API_URL}/rarete`, rareteFormData, {
				headers: { "Content-Type": "multipart/form-data" },
			})
			.then(() => {
				axios
					.get(`${import.meta.env.VITE_API_URL}/rarete`)
					.then((res) => setRarete(res.data))
					.catch((err) => console.error(err))
			})
			.catch((err) => console.error(err))
		rareteRef.current.value = ""
		imageRareteRef.current.value = ""
	}

	function modifyCarte(field, value, index, nomExtension) {
		setExtension((prevExtensions) => {
			const extensionCopy = [...prevExtensions]
			const extensionToUpdate = extensionCopy.find((ext) => ext.nom === nomExtension)
			if (extensionToUpdate) {
				extensionToUpdate.carte[index][field] = value
			}
			return extensionCopy
		})
	}

	function deleteExtension(nomExtension) {
		axios
			.delete(`${import.meta.env.VITE_API_URL}/extension`, {
				data: { nom: nomExtension },
			})
			.then(() => {
				axios
					.get(`${import.meta.env.VITE_API_URL}/extension`)
					.then((res) => {
						setExtension(res.data)
					})
					.catch((err) => console.error(err))
			})
			.catch((err) => console.error(err))
	}

	function onModifyOneExtension(nomExtension) {
		setOpenModifyOneExtension(!openModifyOneExtension)
		setExtensionInModification(nomExtension)
	}

	const foundExtension = extension.find((ext) => ext.nom === extensionInModification)

	useEffect(() => {
		if (foundExtension) {
			nomExtensionModifyRef.current.value = foundExtension.nom
			nbCarteExtensionModifyRef.current.value = foundExtension.nbCarte
			nbCarteTotalExtensionModifyRef.current.value = foundExtension.nbCarteTotal
		}
	}, [foundExtension])

	function modifyFieldExtension(field, value, nomExtension) {
		setExtension((prevExtensions) => {
			const extensionCopy = [...prevExtensions]
			const extensionToUpdate = extensionCopy.find((ext) => ext.nom === nomExtension)
			if (extensionToUpdate) {
				extensionToUpdate[field] = value
			}
			return extensionCopy
		})
	}

	function uploadModification(id) {
		const array_card = extension.find((ext) => ext.nom === extensionInModification).carte
		const last_index = array_card[array_card.length - 1].numero
		var carte = []
		carte = [...array_card]
		const difference = parseInt(nbCarteTotalExtensionModifyRef.current.value) - carte.length
		if (difference > 0) {
			for (var i = last_index; i < last_index + difference; i++) {
				var carteObj

				carteObj = {
					nom: "",
					image: "",
					obtenu: false,
					trade: false,
					numero: i + 1,
					rarete: rarete[0].nom,
					mission_premium: false,
				}
				carte.push(carteObj)
			}
		} else if (difference < 0) {
			carte = carte.slice(0, difference)
		}
		axios
			.put(`${import.meta.env.VITE_API_URL}/extension/${id}`, {
				nom: nomExtensionModifyRef.current.value,
				nbCarteTotal: nbCarteTotalExtensionModifyRef.current.value,
				nbCarte: nbCarteExtensionModifyRef.current.value,
				carte: carte,
			})
			.then(() => {
				if (imageExtensionModifyRef.current.files[0] !== undefined) {
					const formDataImage = new FormData()
					formDataImage.append("image", imageExtensionModifyRef.current.files[0])
					formDataImage.append("nom", nomExtensionRef.current.value)
					axios
						.post(`${import.meta.env.VITE_API_URL}/extension/image`, formDataImage, {
							headers: { "Content-Type": "multipart/form-data" },
						})
						.then(() => {
							axios
								.get(`${import.meta.env.VITE_API_URL}/extension`)
								.then((res) => {
									setExtension(res.data)
									setOpenModifyOneExtension(!openModifyOneExtension)
								})
								.catch((err) => console.error(err))
						})
						.catch((err) => console.error(err))
				} else {
					axios
						.get(`${import.meta.env.VITE_API_URL}/extension`)
						.then((res) => {
							setExtension(res.data)
							setOpenModifyOneExtension(!openModifyOneExtension)
						})
						.catch((err) => console.error(err))
				}
			})
			.catch((err) => console.error(err))
	}
	return (
		<div className="bg-primary font-sans min-h-screen h-full flex flex-col gap-[10px] items-center">
			<div className="w-full flex justify-between items-center mt-[20px] px-[15px]">
				<img src={retour} alt="" onClick={() => setRoute("Accueil")} />
				<h1 className="text-3xl text-white">Mode Admin</h1>
				<p className="text-transparent select-none">u</p>
			</div>
			<div className="flex gap-[50px] justify-center text-white mt-[25px]">
				<div className="flex flex-col items-center gap-[10px] bg-secondary px-[15px] py-[10px] rounded-md">
					<h2>Ajouter une extension</h2>
					<input
						type="text"
						placeholder="Nom"
						className="h-10 rounded-sm bg-gray-500 pl-2 text-xl text-gray-100 outline-none"
						ref={nomExtensionRef}
					/>
					<input
						type="text"
						placeholder="NbCarteTotal"
						className="bg-tertiary px-[15px] py-[10px] rounded-md"
						ref={nbCarteTotalExtensionRef}
					/>
					<input
						type="text"
						placeholder="NbCarte"
						className="bg-tertiary px-[15px] py-[10px] rounded-md"
						ref={nbCarteExtensionRef}
					/>
					<p>Image</p>
					<input type="file" ref={imageExtensionRef} />
					<div
						onClick={() => AjoutExtension()}
						className="bg-tertiary rounded-md px-[15px] py-[10px] cursor-pointer"
					>
						Ajouter
					</div>
				</div>
				<div className="flex flex-col items-center gap-[10px] bg-secondary px-[15px] py-[10px] rounded-md">
					<h2>Ajouter une rareté</h2>
					<input
						type="text"
						placeholder="Nom"
						className="h-10 rounded-sm bg-gray-500 pl-2 text-xl text-gray-100 outline-none"
						ref={rareteRef}
					/>
					<input type="file" ref={imageRareteRef} />
					<div
						onClick={() => AjoutRarete()}
						className="bg-tertiary rounded-md px-[15px] py-[10px] cursor-pointer"
					>
						<p>Ajouter</p>
					</div>
				</div>
			</div>

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
			<div className="bg-secondary min-h-[200px] flex flex-wrap justify-center gap-[10px] w-[90%] rounded-xl py-[15px] px-[10px]">
				{extension.length > 0 &&
					extension.map((extensions, index) => (
						<div key={index} className="flex relative w-fit">
							<img
								src={trash}
								alt=""
								className="h-[20px] cursor-pointer absolute top-0 left-0"
								style={{
									filter: "invert(100%) sepia(100%) saturate(1%) hue-rotate(313deg) brightness(110%) contrast(101%)",
								}}
								onClick={() => deleteExtension(extensions.nom)}
							/>
							<img
								src={modify}
								alt=""
								className="h-[20px] cursor-pointer absolute top-0 right-0"
								style={{
									filter: "invert(100%) sepia(100%) saturate(1%) hue-rotate(313deg) brightness(110%) contrast(101%)",
								}}
								onClick={() => onModifyOneExtension(extensions.nom)}
							/>
							<div
								className="w-[300px] bg-tertiary rounded-md text-white flex flex-col items-center justify-center py-[10px]"
								onClick={() => onModifyExtension(extensions.nom)}
							>
								<p className="text-lg">{extensions.nom}</p>
								<div className="flex gap-[10px] justify-center items-center pt-[5px]">
									<img src={extensions.image} className="max-w-[200px] max-h-[130px]" />
								</div>
							</div>
						</div>
					))}
			</div>
			<div
				className={`${
					openModifyExtention ? "flex" : "hidden"
				} absolute justify-center items-center absolut w-full h-[100%]`}
				ref={expandRef}
			>
				<div className=" bg-secondary w-[95%] h-[90%] rounded-lg py-[10px]">
					{extension.length > 0 &&
						extension
							.filter((fileredExtension) => fileredExtension.nom === modifyExtension)
							.map((extensions, index) => (
								<div key={index} className="flex flex-col items-center gap-[10px] h-full">
									<p className="text-xl text-white">Cartes {modifyExtension}</p>
									<div className="flex justify-center flex-wrap gap-[10px] overflow-y-auto flex-grow max-h-full">
										{extensions.carte.map((cartes, indexCarte) => (
											<div
												key={indexCarte}
												className="bg-tertiary w-[330px] h-[370px] rounded-lg py-[5px] flex flex-col gap-[10px] items-center"
											>
												<div className="flex gap-[10px] justify-center items-center">
													<p className="text-xl text-white">N°{cartes.numero}</p>
													<input
														type="text"
														defaultValue={cartes.nom}
														className="h-10 rounded-sm bg-secondary pl-2 text-xl text-gray-100 outline-none w-[200px]"
														onChange={(e) =>
															modifyCarte(
																"nom",
																e.target.value,
																indexCarte,
																modifyExtension
															)
														}
													/>
												</div>
												<div className="flex justify-between items-center px-[5px] w-full">
													<input
														type="file"
														className="hidden"
														id={`file-upload-${indexCarte}`}
														onChange={(e) =>
															uploadCarteImage(
																e.target.files[0],
																indexCarte,
																modifyExtension
															)
														}
													/>
													<label
														htmlFor={`file-upload-${indexCarte}`}
														className="px-4 py-2 flex items-center gap-2 bg-blue-500 text-white rounded-lg shadow-md cursor-pointer hover:bg-blue-600 transition duration-300"
													>
														<p>Upload</p>
													</label>
													<div className="flex gap-[10px]">
														<DropDownRarete
															cartes={cartes}
															rarete={rarete}
															indexCarte={indexCarte}
															modifyCarte={modifyCarte}
															modifyExtension={modifyExtension}
														/>
													</div>
												</div>
												<img
													src={previewImage[indexCarte] ?? cartes.image}
													alt=""
													className="h-[220px]"
												/>
											</div>
										))}
									</div>
									<div
										className="bg-tertiary rounded-md px-[15px] py-[10px] cursor-pointer text-white"
										onClick={() => uploadCarte(modifyExtension)}
									>
										<p>Modifier</p>
									</div>
								</div>
							))}
				</div>
			</div>
			<div
				className={`${
					openModifyOneExtension ? "flex" : "hidden"
				} absolute justify-center items-center absolut w-full h-[100%]`}
				ref={expandExtensionModifyRef}
			>
				<div className=" bg-secondary w-[95%] h-[90%] rounded-lg py-[10px]">
					{foundExtension && (
						<div className="flex flex-col items-center gap-[20px]">
							<input
								type="text"
								placeholder="Nom"
								className="h-10 rounded-sm bg-gray-500 pl-2 text-xl text-gray-100 outline-none"
								ref={nomExtensionModifyRef}
								onChange={(e) => modifyFieldExtension("nom", e.value, foundExtension.name)}
							/>
							<input
								type="text"
								placeholder="NbCarteTotal"
								className="bg-tertiary px-[15px] py-[10px] rounded-md"
								ref={nbCarteTotalExtensionModifyRef}
								onChange={(e) => modifyFieldExtension("nbCarteTotal", e.value, foundExtension.name)}
							/>
							<input
								type="text"
								placeholder="NbCarte"
								className="bg-tertiary px-[15px] py-[10px] rounded-md"
								ref={nbCarteExtensionModifyRef}
								onChange={(e) => modifyFieldExtension("nbCarte", e.value, foundExtension.name)}
							/>
							<img src={foundExtension.image} className="max-h-[300px]" alt="" />
							<input type="file" ref={imageExtensionModifyRef} />
							<div
								className="bg-tertiary rounded-md px-[15px] py-[10px] cursor-pointer text-white"
								onClick={() => uploadModification(foundExtension._id)}
							>
								<p>Modifier</p>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
Admin.propTypes = {
	setRoute: PropTypes.func.isRequired,
}
export default Admin
