import { useState } from "react"
import PropTypes from "prop-types"
import cross from "../assets/x-solid.svg"
import axios from "axios"
import trade_logo from "../assets/arrow-right-arrow-left-solid.svg"
/*fonctions*/
import { onModifyCarte } from "../function/onModifyCarte"
function MenuCartes({ cartes, indexCarte, nomExtension, setUser, user }) {
	const [open, setOpen] = useState(false)
	const [obtenu, setObtenu] = useState(false)
	const [trade, setTrade] = useState(false)

	function onSetOpen(carteData) {
		setOpen(!open)
		setObtenu(carteData.obtenu)
		setTrade(carteData.trade)
	}

	function uploadExtension() {
		axios
			.put(`${import.meta.env.VITE_API_URL}/user/${user.nom}`, {
				carte: user.carte,
			})
			.then(() => {
				axios
					.get(`${import.meta.env.VITE_API_URL}/user/${user.nom}`)
					.then((res) => setUser(res.data))
					.catch((err) => console.error(err))
			})
			.catch((err) => console.error(err))
		setOpen(!open)
	}

	function onReset() {
		axios
			.get(`${import.meta.env.VITE_API_URL}/user/${user.nom}`)
			.then((res) => {
				setUser(res.data)
				setOpen(!open)
			})
			.catch((err) => console.error(err))
	}
	return (
		<div className="flex flex-col gap-[10px] items-center relative">
			<div className="flex w-full justify-around">
				<p className="text-xl text-white">{cartes.numero}</p>
				<p className="text-xl text-white max-w-[130px] h-[28px] overflow-hidden whitespace-nowrap text-ellipsis">
					{cartes.nom}
				</p>
			</div>

			{user.carte !== undefined && (
				<div
					className={`bg-black ${
						user.carte.find((ext) => ext.nom === nomExtension).carte[indexCarte].obtenu
							? "opacity-100"
							: "opacity-50"
					} rounded-lg relative`}
				>
					<img
						src={cartes.image}
						alt=""
						onClick={() =>
							(user.nom !== undefined || user.nom !== "") &&
							onSetOpen(user.carte.find((ext) => ext.nom === nomExtension).carte[indexCarte])
						}
						className="rounded-lg h-[240px]"
					/>
					<div
						className={`absolute top-[-5px] left-[-5px] ${
							user.carte.find((ext) => ext.nom === nomExtension).carte[indexCarte].trade
								? "flex"
								: "hidden"
						} bg-green-600 p-[5px] rounded-md`}
					>
						<img
							src={trade_logo}
							alt=""
							className="h-[20px]"
							style={{
								filter: "invert(100%) sepia(100%) saturate(1%) hue-rotate(313deg) brightness(110%) contrast(101%)",
							}}
						/>
					</div>
				</div>
			)}
			<div
				className={`${
					open ? "flex" : "hidden"
				} flex-col absolute bg-secondary rounded-md w-[183px] h-[288px] items-center justify-around gap-[10px] p-[10px]`}
			>
				<div className="flex absolute justify-end right-[10px] top-[10px]">
					<img
						src={cross}
						alt=""
						className="h-[20px] cursor-pointer"
						onClick={() => onReset()}
						style={{
							filter: "invert(100%) sepia(100%) saturate(1%) hue-rotate(313deg) brightness(110%) contrast(101%)",
						}}
					/>
				</div>

				<div className="flex flex-col gap-[10px] justify-center items-center">
					<div
						className={`text-xl text-white flex justify-center items-center ${
							obtenu ? "bg-green-700" : "bg-red-700"
						} py-[5px] px-[8px] rounded-lg select-none cursor-pointer w-[100px]`}
						onClick={() => onModifyCarte("obtenu", obtenu, nomExtension, indexCarte, setUser, setObtenu)}
					>
						<p>Obtenu</p>
					</div>
					{user.carte !== undefined && (
						<div
							className={`${
								user.carte.find((ext) => ext.nom === nomExtension).carte[indexCarte].obtenu
									? ""
									: "cursor-not-allowed opacity-50"
							} text-xl text-white flex justify-center items-center ${
								trade ? "bg-green-700" : "bg-red-700"
							} py-[5px] px-[8px] rounded-lg select-none cursor-pointer w-[100px]`}
							onClick={() => {
								if (!user.carte.find((ext) => ext.nom === nomExtension).carte[indexCarte].obtenu) return
								onModifyCarte("trade", trade, nomExtension, indexCarte, setUser, setTrade)
							}}
						>
							<p>Tradable</p>
						</div>
					)}
				</div>

				<div className="bg-tertiary rounded-md px-[15px] py-[10px] cursor-pointer w-fit">
					<p className="text-xl text-white" onClick={() => uploadExtension()}>
						Modifier
					</p>
				</div>
			</div>
		</div>
	)
}
MenuCartes.propTypes = {
	cartes: PropTypes.object.isRequired,
	indexCarte: PropTypes.number.isRequired,
	nomExtension: PropTypes.string.isRequired,
	setUser: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
}
export default MenuCartes
