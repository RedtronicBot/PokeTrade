import trash from "../assets/trash-solid.svg"
import modify from "../assets/pen-solid.svg"
import { deleteExtension } from "../function/Admin/deleteExtension"
import PropTypes from "prop-types"
function ShowExtension({
	extension,
	setExtension,
	setModifyExtension,
	setOpenModifyExtention,
	openModifyExtention,
	setOpenModifyOneExtension,
	setExtensionInModification,
	openModifyOneExtension,
}) {
	function onModifyExtension(value) {
		setModifyExtension(value)
		setOpenModifyExtention(!openModifyExtention)
	}
	function onModifyOneExtension(nomExtension) {
		setOpenModifyOneExtension(!openModifyOneExtension)
		setExtensionInModification(nomExtension)
	}
	return (
		<div className="bg-secondary min-h-[200px] flex flex-wrap justify-center gap-[10px] w-[90%] rounded-xl py-[15px] px-[10px]">
			{extension.length > 0 &&
				extension.map((extensions, index) => (
					<div key={index} className="flex relative w-fit">
						<img
							src={trash}
							alt=""
							className="h-[20px] cursor-pointer absolute top-0 left-0"
							style={{
								filter: "invert(100%) sepia(100%) saturate(1%) hue-rotate(313deg) brightness(110%) contrast(101%)",
							}}
							onClick={() => deleteExtension(extensions.nom, setExtension)}
						/>
						<img
							src={modify}
							alt=""
							className="h-[20px] cursor-pointer absolute top-0 right-0"
							style={{
								filter: "invert(100%) sepia(100%) saturate(1%) hue-rotate(313deg) brightness(110%) contrast(101%)",
							}}
							onClick={() => onModifyOneExtension(extensions.nom)}
						/>
						<div
							className="w-[300px] bg-tertiary rounded-md text-white flex flex-col items-center justify-center py-[10px]"
							onClick={() => onModifyExtension(extensions.nom)}
						>
							<p className="text-lg">{extensions.nom}</p>
							<div className="flex gap-[10px] justify-center items-center pt-[5px]">
								<img src={extensions.image} className="max-w-[200px] max-h-[130px]" />
							</div>
						</div>
					</div>
				))}
		</div>
	)
}
ShowExtension.propTypes = {
	extension: PropTypes.array.isRequired,
	setExtension: PropTypes.func.isRequired,
	setModifyExtension: PropTypes.func.isRequired,
	setOpenModifyExtention: PropTypes.func.isRequired,
	openModifyExtention: PropTypes.bool.isRequired,
	setOpenModifyOneExtension: PropTypes.func.isRequired,
	setExtensionInModification: PropTypes.func.isRequired,
	openModifyOneExtension: PropTypes.bool.isRequired,
}
export default ShowExtension
