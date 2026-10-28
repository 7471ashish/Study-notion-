import React, { useEffect, useRef, useState } from "react"
import { FiUploadCloud } from "react-icons/fi"
import { FaTrash } from "react-icons/fa"

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null,
}) {
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewSource, setPreviewSource] = useState(
    viewData ? viewData : editData ? editData : ""
  )
  const [isDragActive, setIsDragActive] = useState(false)
  const inputRef = useRef(null)

  const handleFileChange = (file) => {
    if (!file) return
    setSelectedFile(file)
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragActive(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragActive(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0])
    }
  }

  useEffect(() => {
    register(name, { required: !viewData && !editData })
  }, [register, name, viewData, editData])

  useEffect(() => {
    setValue(name, selectedFile)
  }, [selectedFile, setValue, name])

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-richblack-200" htmlFor={name}>
        {label} {!viewData && !editData && <sup className="text-pink-200">*</sup>}
      </label>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => {
          if (!previewSource && inputRef.current) {
            inputRef.current.click()
          }
        }}
        className={`relative flex min-h-[240px] items-center justify-center rounded-2xl border-2 border-dashed transition-all duration-200 ${
          isDragActive
            ? "border-yellow-50 bg-yellow-50/5 scale-[1.01]"
            : "border-richblack-600 bg-richblack-800/60 hover:border-richblack-500"
        } ${!previewSource ? "cursor-pointer" : ""}`}
      >
        <input
          type="file"
          ref={inputRef}
          accept={!video ? "image/*" : "video/*"}
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleFileChange(e.target.files[0])
            }
          }}
        />

        {previewSource ? (
          <div className="flex w-full flex-col p-5">
            {!video ? (
              <img
                src={previewSource}
                alt="Preview"
                className="max-h-[300px] w-full rounded-xl object-contain bg-richblack-900"
              />
            ) : (
              <video
                src={previewSource}
                controls
                className="max-h-[300px] w-full rounded-xl object-contain bg-richblack-900"
              />
            )}
            {!viewData && (
              <div className="flex items-center justify-between pt-3 mt-3 border-t border-richblack-700">
                <span className="text-xs text-richblack-300 truncate max-w-xs">
                  {selectedFile?.name || "Uploaded Media"}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setPreviewSource("")
                    setSelectedFile(null)
                    setValue(name, null)
                  }}
                  className="flex items-center gap-1.5 text-xs font-semibold text-pink-200 hover:text-pink-100 px-3 py-1.5 rounded-lg bg-pink-900/30 border border-pink-700/40 transition-colors cursor-pointer"
                >
                  <FaTrash size={11} /> Remove
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center p-8 text-center">
            <div className="grid aspect-square w-14 place-items-center rounded-full bg-richblack-700 text-yellow-50 shadow-inner mb-3">
              <FiUploadCloud size={28} />
            </div>
            <p className="text-sm font-medium text-richblack-200">
              Drag and drop {!video ? "an image" : "a video"}, or{" "}
              <span className="font-bold text-yellow-50 underline">browse</span>
            </p>
            <p className="mt-2 text-xs text-richblack-400">
              {!video
                ? "Recommended aspect ratio 16:9 (1024x576) • PNG, JPG, WebP"
                : "MP4, WebM formats supported"}
            </p>
          </div>
        )}
      </div>

      {errors[name] && (
        <span className="text-xs text-pink-200 mt-1">
          {label} is required
        </span>
      )}
    </div>
  )
}