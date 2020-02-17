import React  from "react"
import { useDropzone } from "react-dropzone"

const Dropzone = ({ onDrop, accept, multiple=true, style }) => {
  // Initializing useDropzone hooks with options
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple,
    style
  });

  return (
    <div {...getRootProps()} >
      <input {...getInputProps()} />
      <div className={style}>
        {isDragActive ? (
          <p className="large">Now Release!</p>
        ) : (
          <div >
             <p/>Drag your picture here, 
             <p/>or click to select from your files
          </div>
        )}
      </div>
    </div>
  )
}

export default Dropzone
