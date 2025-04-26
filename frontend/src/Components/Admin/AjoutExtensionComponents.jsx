import PropTypes from "prop-types"

function AjoutExtensionComponents({
	nomExtensionRef,
	nbCarteTotalExtensionRef,
	nbCarteExtensionRef,
	imageExtensionRef,
	AjoutExtension,
	rarete,
	setExtension,
	rareteRef,
	imageRareteRef,
	AjoutRarete,
	setRarete,
}) {
	return (
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
					onClick={() =>
						AjoutExtension(
							nbCarteTotalExtensionRef,
							rarete,
							nomExtensionRef,
							nbCarteExtensionRef,
							imageExtensionRef,
							setExtension
						)
					}
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
					onClick={() => AjoutRarete(imageRareteRef, rareteRef, setRarete)}
					className="bg-tertiary rounded-md px-[15px] py-[10px] cursor-pointer"
				>
					<p>Ajouter</p>
				</div>
			</div>
		</div>
	)
}
AjoutExtensionComponents.propTypes = {
	nomExtensionRef: PropTypes.object.isRequired,
	nbCarteTotalExtensionRef: PropTypes.object.isRequired,
	nbCarteExtensionRef: PropTypes.object.isRequired,
	imageExtensionRef: PropTypes.object.isRequired,
	AjoutExtension: PropTypes.func.isRequired,
	rarete: PropTypes.array.isRequired,
	setExtension: PropTypes.func.isRequired,
	rareteRef: PropTypes.object.isRequired,
	imageRareteRef: PropTypes.object.isRequired,
	AjoutRarete: PropTypes.func.isRequired,
	setRarete: PropTypes.func.isRequired,
}
export default AjoutExtensionComponents
