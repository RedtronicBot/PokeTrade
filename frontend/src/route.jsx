import { useEffect, useState } from "react"
import Accueil from "./Pages/Accueil"
import Admin from "./Pages/Admin"
import Extension from "./Pages/Extension"

function Route() {
	const [route, setRoute] = useState("Accueil")
	const [login, setLogin] = useState(false)
	const [routeExtension, setRouteExtension] = useState("")
	const [name, setName] = useState("")
	useEffect(() => {
		const params = new URLSearchParams(window.location.search)
		const nom = params.get("nom")
		if (nom !== null) {
			document.cookie = `nom=${nom}; max-age=${24 * 60 * 60}; path=/; SameSite=Lax`
			window.location.href = "/"
		}
	}, [])
	function getCookie(nom) {
		const value = `; ${document.cookie}`
		const parts = value.split(`; ${nom}=`)
		if (parts.length === 2) return parts.pop().split(";").shift()
	}
	useEffect(() => {
		const cookieNom = getCookie("nom")
		if (cookieNom) {
			setLogin(true)
			setName(cookieNom)
		}
	}, [])
	function Logout() {
		document.cookie = "nom=; max-age=0; path=/"
		setName("")
		setLogin(false)
	}
	return (
		<div>
			{route === "Accueil" && (
				<Accueil
					setRoute={setRoute}
					login={login}
					setRouteExtension={setRouteExtension}
					name={name}
					logout={Logout}
				/>
			)}
			{route === "Admin" && <Admin setRoute={setRoute} />}
			{route === "Extension" && <Extension setRoute={setRoute} routeExtension={routeExtension} name={name} />}
		</div>
	)
}

export default Route
