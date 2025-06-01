import { useEffect, useState } from "react"
import { Link } from "react-router"
import { ArrowLeft } from "lucide-react"
import axios from "axios"
import CarteTable from "../Components/Trade/CarteTable"
import PropTypes from "prop-types"
import { getInterestingTradeCards } from "../function/Trade/getInterestingCards"
function Trade({ name }) {
  const [user, setUser] = useState([])
  const [firstUser, setFirstUser] = useState({})
  const [secondUser, setSecondUser] = useState({})
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/user`)
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [res.data]
        const filteredData = data.map((obj) => ({
          ...obj,
          extensions: obj.extensions
            .map((ext) => ({
              ...ext,
              carte: ext.carte.filter((card) => card.rarete.id <= 5),
            }))
            .filter((ext) => ext.carte.length > 0),
        }))
        setUser(filteredData)
        if (name) {
          const userMe = filteredData.find((users) => users.nom === name)
          const otherUser = filteredData.find(
            (users) => users.nom === filteredData.filter((users) => users.nom !== name)[0].nom,
          )
          const result = getInterestingTradeCards(userMe, otherUser)
          setFirstUser({
            ...userMe,
            extensions: result.me,
          })
          setSecondUser({
            ...otherUser,
            extensions: result.other,
          })
        }
      })
      .catch((err) => console.error(err))
  }, [name])

  const onSetSecondUser = (nameSecond) => {
    const result = getInterestingTradeCards(
      user.find((users) => users.nom === name),
      user.find((users) => users.nom === nameSecond),
    )
    setSecondUser({
      ...nameSecond,
      extensions: result.other,
    })
  }

  return (
    <div className="flex h-screen flex-col items-center bg-primary font-sans">
      <div className="my-[20px] flex w-[95%] items-center justify-between">
        <Link to="/">
          <ArrowLeft size={36} className="text-white" />
        </Link>
        {<h1 className="text-bold text-center text-2xl text-white">Tableau d&apos;échange</h1>}
        <p className="select-none"></p>
      </div>
      {user.length > 0 && (
        <div className="mb-[10px] flex min-h-0 w-[90%] flex-1 flex-col">
          <div className="flex w-full">
            <select
              className="h-[50px] flex-1 border-l-2 border-r-2 border-t-2 border-tertiary bg-secondary text-center text-xl text-white"
              onChange={(e) => onSetSecondUser(e.target.value)}
            >
              {user.map((users, index) => {
                if (users.nom !== name) {
                  return (
                    <option key={index} value={users.nom}>
                      {users.nom}
                    </option>
                  )
                }
              })}
            </select>
          </div>
          {name && firstUser.extensions && secondUser.extensions ? (
            <CarteTable carteFirstTable={firstUser.extensions} carteSecondTable={secondUser.extensions} />
          ) : (
            <p className="text-center text-xl text-white">Aucune carte à échanger pour cette extension.</p>
          )}
        </div>
      )}
    </div>
  )
}
Trade.propTypes = {
  name: PropTypes.string.isRequired,
}
export default Trade
