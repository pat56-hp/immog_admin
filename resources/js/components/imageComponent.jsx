import { Plus, Trash } from "lucide-react";
import React from "react";
import ImageUploading from "react-images-uploading";

export default function ImageComponent({
    image,
    imageMaxNumber,
    onChangeImage,
    dataUrl = "data_url",
    multiple = false,
}) {
    console.log(image);
    return (
        <ImageUploading
            multiple={multiple}
            value={image}
            onChange={onChangeImage}
            maxNumber={imageMaxNumber}
            dataURLKey={dataUrl}
        >
            {({ onImageUpload, onImageUpdate, onImageRemove, dragProps }) => (
                <div className="upload__image-wrapper mt-2">
                    {multiple ? (
                        ""
                    ) : (
                        <div
                            className="relative w-30 h-30 border-1 border-dashed flex justify-center items-center p-2 hover:cursor-pointer"
                            {...dragProps}
                        >
                            {image.length > 0 ? (
                                image.map((image, index) => (
                                    <React.Fragment key={index}>
                                        <img
                                            src={image["data_url"]}
                                            className="h-auto"
                                            onClick={() => onImageUpdate(index)}
                                        />
                                        <Trash
                                            className="w-4 h-4 text-red-600 absolute top-2 right-1 hover:cursor-point"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onImageRemove(index);
                                            }}
                                        />
                                    </React.Fragment>
                                ))
                            ) : (
                                <div
                                    className="flex flex-col items-center space-y-2"
                                    onClick={onImageUpload}
                                >
                                    <span className="text-xs">Ajouter ici</span>
                                    <Plus className="w-4 h-4 text-gray-400" />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </ImageUploading>
    );
}
