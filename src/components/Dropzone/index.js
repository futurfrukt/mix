import {useDropzone} from "react-dropzone";
import './index.css';
import cn from "classnames";

export const DropZone = ({onDrop}) => {
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop: (files) => onDrop({files}),
        accept: "audio/*",
    });

    return (
        <div className={cn("dropzone", { "dropzone_active": isDragActive })} {...getRootProps()}>
            <input {...getInputProps()} />
            <div className={"dropzone__area"}>
                <div className={"dropzone__button"}>
                    {
                        isDragActive
                            ? "Now drop the files here"
                            : "Drag'n'drop audio files to this page"
                    }
                    <br/>
                    <span>or click this button</span>
                </div>
            </div>
        </div>
    )
}