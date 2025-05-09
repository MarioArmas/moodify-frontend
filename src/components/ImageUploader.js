import React, { useState } from 'react'
import { CiImageOn } from "react-icons/ci";
import styles from './ImageUploader.module.css'

export default function ImageUploader() {
  const [preview, setPreview] = useState(null)
  const [dragActive, setDragActive] = useState(false)

  const handleImage = (file) => {
    if (file && file.type.startsWith('image/')) {
      const imageURL = URL.createObjectURL(file)
      setPreview(imageURL)
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    handleImage(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    const file = e.dataTransfer.files[0]
    handleImage(file)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(true)
  }

  const handleDragLeave = () => {
    setDragActive(false)
  }

  return (
    <div className={styles.container}>
      <div
        className={`${styles.uploadBox} ${dragActive ? styles.dragOver : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {preview ? (
          <img src={preview} alt='preview' className={styles.previewImage} />
        ) : (
          <CiImageOn className={styles.placeholderIcon} />
        )}

        <input
          type='file'
          id='fileInput'
          accept='image/*'
          onChange={handleFileChange}
          className={styles.hiddenInput}
        />
        <label htmlFor='fileInput' className={styles.overlay}></label>
      </div>
    </div>
  )
}