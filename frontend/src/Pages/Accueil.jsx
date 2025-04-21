import { useEffect, useState } from "react"
import pokeliste from "../assets/logo.png"
import axios from "axios"
import PropTypes from "prop-types"
function Accueil({ setRoute, login, setLogin, setRouteExtension, name }) {
	const [menu, setMenu] = useState(false)
	const [extension, setExtension] = useState([])
	const [user, setUser] = useState({})

	useEffect(() => {
		axios
			.get(`${import.meta.env.VITE_API_URL}/extension`)
			.then((res) => setExtension(res.data))
			.catch((err) => console.error(err))
		if (name !== "") {
			axios
				.get(`${import.meta.env.VITE_API_URL}/user/${name}`)
				.then((res) => setUser(res.data))
				.catch((err) => console.error(err))
		}
	}, [name])
	function onSetRouteExtension(extension) {
		setRoute("Extension")
		setRouteExtension(extension)
	}
	function Logout() {
		document.cookie = "nom=; max-age=0; path=/"
		setLogin(false)
	}
	return (
		<div className="bg-primary font-sans min-h-screen h-full flex flex-col gap-[10px] items-center">
			<div className="bg-menu h-[100px] flex justify-between py-[20px] px-[15px] w-full mb-[25px]">
				<img src={pokeliste} alt="" />
				{login ? (
					<div
						className="bg-secondary text-3xl text-white flex justify-center gap-[10px] cursor-pointer items-center py-[10px] px-[15px] rounded-xl select-none"
						onClick={() => (user.admin ? setMenu(!menu) : Logout())}
					>
						<p>{user.nom}</p>
						<img src={user.avatar_url} className="h-[40px] object-cover rounded-full" />
					</div>
				) : (
					<a href={`${import.meta.env.VITE_API_URL}/auth`}>
						<div className="bg-secondary text-3xl text-white flex justify-center cursor-pointer items-center py-[10px] px-[15px] rounded-xl select-none">
							<p>Login</p>
						</div>
					</a>
				)}
				{login && menu && (
					<div className="absolute bg-secondary text-white rounded-xl py-[10px] px-[10px] top-[85px] right-[15px] flex flex-col gap-[10px] justify-center items-center  w-[124px]">
						<div className="bg-tertiary py-[10px] px-[15px] rounded-md w-full flex justify-center select-none">
							<div onClick={() => setRoute("Admin")}>Admin</div>
						</div>
						<div
							className="bg-tertiary py-[10px] px-[15px] rounded-md w-full flex justify-center select-none"
							onClick={() => Logout()}
						>
							<p>Logout</p>
						</div>
					</div>
				)}
			</div>

			<div className="w-auto flex flex-wrap justify-center gap-[45px]">
				{extension.length > 0 &&
					extension
						.sort((a, b) => new Date(a.date) - new Date(b.date))
						.map((extensions, index) => (
							<div
								key={index}
								className="w-[300px] bg-tertiary rounded-md text-white flex flex-col items-center justify-center py-[10px] cursor-pointer"
								onClick={() => onSetRouteExtension(extensions.nom)}
							>
								<p className="text-lg">{extensions.nom}</p>
								<div className="flex gap-[10px] justify-center items-center pt-[5px]">
									{extensions.logo !== "" && (
										<img src={extensions.logo} className="max-w-[64px] max-h-[64px]" />
									)}
									<img src={extensions.image} className="max-w-[200px] max-h-[130px]" />
								</div>
							</div>
						))}
			</div>
		</div>
	)
}
Accueil.propTypes = {
	setRoute: PropTypes.func.isRequired,
	login: PropTypes.bool.isRequired,
	setLogin: PropTypes.func.isRequired,
	setRouteExtension: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired,
}
export default Accueil
