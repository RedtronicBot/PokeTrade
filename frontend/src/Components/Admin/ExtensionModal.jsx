import { useRef, useState } from "react"
import PropTypes from "prop-types"
import { uploadCarteImage } from "../function/Admin/uploadCarteImage"
import { uploadCarte } from "../function/Admin/UploadCarte"
import { modifyCarte } from "../function/Admin/modifyCarte"
/*Components*/
import DropDownRarete from "../Components/Admin/DropDownRarete"
function ExtensionModal({
	extension,
	modifyExtension,
	setExtension,
	rarete,
	setOpenModifyExtention,
	openModifyExtention,
}) {
	const imageCarteRef = useRef(new FormData())
	const [previewImage, setPreviewImage] = useState({})
	return (
		<div className=" bg-secondary w-[95%] h-[90%] rounded-lg py-[10px]">
			{extension.length > 0 &&
				extension
					.filter((fileredExtension) => fileredExtension.nom === modifyExtension)
					.map((extensions, index) => (
						<div key={index} className="flex flex-col items-center gap-[10px] h-full">
							<p className="text-xl text-white">Cartes {modifyExtension}</p>
							<div className="flex justify-center flex-wrap gap-[10px] overflow-y-auto flex-grow max-h-full">
								{extensions.carte.map((cartes, indexCarte) => (
									<div
										key={indexCarte}
										className="bg-tertiary w-[330px] h-[370px] rounded-lg py-[5px] flex flex-col gap-[10px] items-center"
									>
										<div className="flex gap-[10px] justify-center items-center">
											<p className="text-xl text-white">N°{cartes.numero}</p>
											<input
												type="text"
												defaultValue={cartes.nom}
												className="h-10 rounded-sm bg-secondary pl-2 text-xl text-gray-100 outline-none w-[200px]"
												onChange={(e) => modifyCarte("nom", e.target.value, indexCarte, modifyExtension, setExtension)}
											/>
										</div>
										<div className="flex justify-between items-center px-[5px] w-full">
											<input
												type="file"
												className="hidden"
												id={`file-upload-${indexCarte}`}
												onChange={(e) =>
													uploadCarteImage(
														e.target.files[0],
														indexCarte,
														modifyExtension,
														imageCarteRef,
														setPreviewImage,
														setExtension
													)
												}
											/>
											<label
												htmlFor={`file-upload-${indexCarte}`}
												className="px-4 py-2 flex items-center gap-2 bg-blue-500 text-white rounded-lg shadow-md cursor-pointer hover:bg-blue-600 transition duration-300"
											>
												<p>Upload</p>
											</label>
											<div className="flex gap-[10px]">
												<DropDownRarete
													cartes={cartes}
													rarete={rarete}
													indexCarte={indexCarte}
													modifyCarte={modifyCarte}
													modifyExtension={modifyExtension}
													setExtension={setExtension}
												/>
											</div>
										</div>
										<img src={previewImage[indexCarte] ?? cartes.image} alt="" className="h-[220px]" />
									</div>
								))}
							</div>
							<div
								className="bg-tertiary rounded-md px-[15px] py-[10px] cursor-pointer text-white"
								onClick={() =>
									uploadCarte(modifyExtension, imageCarteRef, extension, setOpenModifyExtention, openModifyExtention)
								}
							>
								<p>Modifier</p>
							</div>
						</div>
					))}
		</div>
	)
}
ExtensionModal.propTypes = {
	extension: PropTypes.array.isRequired,
	modifyExtension: PropTypes.string.isRequired,
	setExtension: PropTypes.func.isRequired,
	rarete: PropTypes.array.isRequired,
	setOpenModifyExtention: PropTypes.func.isRequired,
	openModifyExtention: PropTypes.bool.isRequired,
}
export default ExtensionModal
