import { useEffect, useRef, useState } from "react"
import { Link } from "react-router"
import retour from "../assets/back_logo.png"
import axios from "axios"
/*Components*/
import AjoutExtensionComponents from "../Components/Admin/AjoutExtensionComponents"
import ExtensionModal from "../Components/Admin/ExtensionModal"
import ShowExtension from "../Components/Admin/ShowExtension"
import ModifyExtensionModal from "../Components/Admin/ModifyExtensionModal"
import ShowRarete from "../Components/Admin/ShowRarete"
import ModifyRareteModal from "../Components/Admin/ModifyRareteModal"
/*Functions*/

/*Hooks*/
import { useScrollPosition } from "../hooks/useScrollPosition"
import { useClickOutside } from "../hooks/useClickOutside"
import { useModalBehavior } from "../hooks/useModalBehavior"
function Admin() {
  const [extension, setExtension] = useState([])
  const [modifyExtension, setModifyExtension] = useState("")
  const [openModifyExtention, setOpenModifyExtention] = useState(false)
  const [openModifyOneExtension, setOpenModifyOneExtension] = useState(false)
  const [extensionInModification, setExtensionInModification] = useState("")
  const [rarete, setRarete] = useState([])
  const [openModifyRarete, setOpenModifyRarete] = useState(false)
  const [rareteInModification, setRareteInModification] = useState("")
  const nomExtensionRef = useRef(null)
  const expandRef = useRef(null)
  const expandExtensionModifyRef = useRef(null)
  const expandRareteModifyRef = useRef(null)

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
  useClickOutside(expandRareteModifyRef, () => setOpenModifyRarete(false), openModifyRarete)

  useModalBehavior({ isOpen: openModifyExtention, ref: expandRef, scrollY })
  useModalBehavior({
    isOpen: openModifyOneExtension,
    ref: expandExtensionModifyRef,
    scrollY,
  })
  useModalBehavior({ isOpen: openModifyRarete, ref: expandRareteModifyRef, scrollY })
  return (
    <div className="flex h-full min-h-screen flex-col items-center gap-[10px] bg-primary font-sans">
      <div className="mt-[20px] flex w-full items-center justify-between px-[15px]">
        <Link to="/">
          <img src={retour} alt="" />
        </Link>
        <h1 className="text-3xl text-white">Mode Admin</h1>
        <p className="select-none"></p>
      </div>
      <AjoutExtensionComponents
        nomExtensionRef={nomExtensionRef}
        rarete={rarete}
        setExtension={setExtension}
        setRarete={setRarete}
      />
      <h3 className="text-xl text-white">Rareté existantes</h3>
      <ShowRarete
        rarete={rarete}
        setRarete={setRarete}
        setOpenModifyRarete={setOpenModifyRarete}
        openModifyRarete={openModifyRarete}
        setRareteInModification={setRareteInModification}
      />
      <h3 className="text-xl text-white"> extensions existantes</h3>
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
        } absolut absolute h-[100%] w-full items-center justify-center`}
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
        } absolut absolute h-[100%] w-full items-center justify-center`}
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
      <div
        className={`${
          openModifyRarete ? "flex" : "hidden"
        } absolut absolute h-[100%] w-full items-center justify-center`}
        ref={expandRareteModifyRef}
      >
        <ModifyRareteModal rarete={rarete} rareteInModification={rareteInModification} setRarete={setRarete} />
      </div>
    </div>
  )
}
export default Admin
