import PropTypes from "prop-types"
function CarteTable({ carteFirstTable, carteSecondTable }) {
  return (
    <div className="flex flex-1 overflow-auto">
      <div className="flex-1">
        <table className="w-full border-collapse border-b-2 border-l-2 border-t-2 border-tertiary">
          <thead>
            <tr className="bg-secondary">
              <th className="border-2 border-tertiary px-4 py-2 text-white">Numéro</th>
              <th className="border-2 border-tertiary px-4 py-2 text-white">Nom</th>
              <th className="border-2 border-tertiary px-4 py-2 text-white">Obtenu</th>
              <th className="border-b-2 border-l-2 border-t-2 border-tertiary px-4 py-2 text-white">Trade</th>
            </tr>
          </thead>
          <tbody>
            {carteFirstTable.map((carte, index) => (
              <tr key={index} className="text-center">
                <td className="border-2 border-tertiary px-4 py-2 text-white">{carte.numero}</td>
                <td className="border-2 border-tertiary px-4 py-2 text-white">{carte.nom}</td>
                <td className="border-2 border-tertiary px-4 py-2 text-white">{carte.obtenu ? "Oui" : "Non"}</td>
                <td className="border-b-2 border-l-2 border-r-2 border-t-2 border-tertiary px-4 py-2 text-white last:border-r-0">
                  {carte.trade ? "Oui" : "Non"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex-1">
        <table className="w-full border-collapse border-b-2 border-r-2 border-t-2 border-tertiary">
          <thead>
            <tr className="bg-secondary">
              <th className="border-2 border-tertiary px-4 py-2 text-white">Numéro</th>
              <th className="border-2 border-tertiary px-4 py-2 text-white">Nom</th>
              <th className="border-2 border-tertiary px-4 py-2 text-white">Obtenu</th>
              <th className="border-2 border-tertiary px-4 py-2 text-white">Trade</th>
            </tr>
          </thead>
          <tbody>
            {carteSecondTable.map((carte, index) => (
              <tr key={index} className="text-center">
                <td className="border-2 border-tertiary px-4 py-2 text-white">{carte.numero}</td>
                <td className="border-2 border-tertiary px-4 py-2 text-white">{carte.nom}</td>
                <td className="border-2 border-tertiary px-4 py-2 text-white">{carte.obtenu ? "Oui" : "Non"}</td>
                <td className="border-2 border-tertiary px-4 py-2 text-white">{carte.trade ? "Oui" : "Non"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
CarteTable.propTypes = {
  carteFirstTable: PropTypes.array.isRequired,
  carteSecondTable: PropTypes.array.isRequired,
}
export default CarteTable
