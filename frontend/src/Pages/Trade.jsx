import { useEffect, useState } from "react"
import axios from "axios"
import CarteTable from "../Components/Trade/CarteTable"
function Trade() {
  const [user, setUser] = useState([])
  const [firstUser, setFirstUser] = useState(0)
  const [secondUser, setSecondUser] = useState(0)
  const [extension, setExtension] = useState(0)
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/user`)
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err))
  }, [])
  return (
    <div className="flex h-screen flex-col items-center bg-primary font-sans">
      {user.length > 0 && (
        <div className="flex h-full w-[90%] flex-col">
          <div className="mt-4 flex w-full">
            <select
              className="h-[50px] flex-1 border-l border-r-2 border-t-2 border-tertiary bg-secondary text-center text-xl text-white"
              onChange={(e) => setExtension(e.target.value)}
            >
              {user[0].extensions.map((users, index) => (
                <option key={index} value={index}>
                  {users.nomExtension}
                </option>
              ))}
            </select>
          </div>
          <div className="flex w-full">
            <select
              className="h-[50px] flex-1 border-l-2 border-r border-t-2 border-tertiary bg-secondary pl-[1px] text-center text-xl text-white"
              onChange={(e) => setFirstUser(e.target.value)}
            >
              {user.map((users, index) => (
                <option key={index} value={index}>
                  {users.nom}
                </option>
              ))}
            </select>
            <select
              className="h-[50px] flex-1 border-l border-r-2 border-t-2 border-tertiary bg-secondary text-center text-xl text-white"
              onChange={(e) => setSecondUser(e.target.value)}
            >
              {user.map((users, index) => (
                <option key={index} value={index}>
                  {users.nom}
                </option>
              ))}
            </select>
          </div>
          <CarteTable
            carteFirstTable={user[Number(firstUser)].extensions[Number(extension)].cartes}
            carteSecondTable={user[Number(secondUser)].extensions[Number(extension)].cartes}
          />
        </div>
      )}
    </div>
  )
}

export default Trade
