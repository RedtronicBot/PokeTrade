import PropTypes from "prop-types"
function CarteTable({ carteFirstTable, carteSecondTable }) {
  return (
    <div className="flex flex-1 overflow-auto">
      <div className="flex-1">
        <table className="w-full border-collapse border-b-2 border-l-2 border-t-2 border-tertiary">
          <thead>
            <tr className="bg-secondary">
              <th className="border-2 border-tertiary px-4 py-2 text-white">Extension</th>
              <th className="border-2 border-tertiary px-4 py-2 text-white">Numéro</th>
              <th className="border-2 border-tertiary px-4 py-2 text-white">Nom</th>
              <th className="border-b-2 border-l-2 border-t-2 border-tertiary px-4 py-2 text-white">Rareté</th>
            </tr>
          </thead>
          <tbody>
            {carteFirstTable.map((extensions) => {
              return extensions.carte.map((carte, indexCarte) => (
                <tr key={indexCarte} className="text-center">
                  <td className="border-2 border-tertiary px-4 py-2 text-white">{extensions.nomExtension}</td>
                  <td className="border-2 border-tertiary px-4 py-2 text-white">{carte.numero}</td>
                  <td className="border-2 border-tertiary px-4 py-2 text-white">{carte.nom}</td>
                  <td className="border-b-2 border-l-2 border-r-2 border-t-2 border-tertiary px-4 py-2 text-white last:border-r-0">
                    <div className="flex w-full justify-center">
                      <p className="hidden">{carte.rarete.id}</p>
                      <img src={`${import.meta.env.VITE_API_URL}/${carte.rarete.url}`} className="h-[40px]" />
                    </div>
                  </td>
                </tr>
              ))
            })}
          </tbody>
        </table>
      </div>
      <div className="flex-1">
        <table className="w-full border-collapse border-b-2 border-r-2 border-t-2 border-tertiary">
          <thead>
            <tr className="bg-secondary">
              <th className="border-2 border-tertiary px-4 py-2 text-white">Extension</th>
              <th className="border-2 border-tertiary px-4 py-2 text-white">Numéro</th>
              <th className="border-2 border-tertiary px-4 py-2 text-white">Nom</th>
              <th className="border-2 border-tertiary px-4 py-2 text-white">Rareté</th>
            </tr>
          </thead>
          <tbody>
            {carteSecondTable.map((extensions) => {
              return extensions.carte.map((carte, indexCarte) => (
                <tr key={indexCarte} className="text-center">
                  <td className="border-2 border-tertiary px-4 py-2 text-white">{extensions.nomExtension}</td>
                  <td className="border-2 border-tertiary px-4 py-2 text-white">{carte.numero}</td>
                  <td className="border-2 border-tertiary px-4 py-2 text-white">{carte.nom}</td>
                  <td className="border-2 border-tertiary px-4 py-2 text-white">
                    <div className="flex w-full justify-center">
                      <p className="hidden">{carte.rarete.id}</p>
                      <img src={`${import.meta.env.VITE_API_URL}/${carte.rarete.url}`} className="h-[40px]" />
                    </div>
                  </td>
                </tr>
              ))
            })}
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
