import { useEffect, useState } from "react"
import { Routes, Route } from "react-router"
import Accueil from "./Pages/Accueil"
import Admin from "./Pages/Admin"
import Extension from "./Pages/Extension"
import Trade from "./Pages/Trade"
import NavBarOutlet from "./Components/NavBar/NavBarOutlet"
function App() {
  const [login, setLogin] = useState(false)
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
    <Routes>
      <Route path="/admin" element={<Admin />} />
      <Route element={<NavBarOutlet login={login} name={name} logout={Logout} />}>
        <Route index element={<Accueil login={login} name={name} logout={Logout} />} />
        <Route path="/extension/:id" element={<Extension name={name} />} />
        <Route path="/trade" element={<Trade name={name} />} />
      </Route>
    </Routes>
  )
}

export default App
