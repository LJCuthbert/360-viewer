import React, {ChangeEvent, useState, DragEvent} from 'react'
import UploadLogo from '../assets/UploadLogo.tsx'

const LandingPage: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    const [image, setImage] = useState<string | null>(null)

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]

        if (file && file.type.startsWith('image/')) {
            const imageURL = URL.createObjectURL(file)
            setSelectedImage(file)
            setImage(imageURL)
        } else {
            console.warn('Please select a valid image file')
        }
    }

    const handleUpload = () => {
        if (selectedImage) {
            const formData = new FormData()
            formData.append('file', selectedImage)

            fetch('http://localhost:5000/api/upload', {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data.message)
                })
                .catch((error) => {
                    console.error('Error uploading image:', error)
                })
        } else {
            console.warn('No image selected')
        }
    }

    const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
        event.preventDefault()

        const file = event.dataTransfer.files[0]

        if (file && file.type.startsWith('image/')) {
            const imageURL = URL.createObjectURL(file)
            setSelectedImage(file)
            setImage(imageURL)
        }
    }

    const handleDragOver = (event: DragEvent<HTMLLabelElement>) => {
        event.preventDefault()
    }

    return (
        <div className={'flex h-screen flex-col items-center justify-center gap-16'}>
            <h1 className={'text-center text-9xl font-bold underline'}>360 Photo Viewer</h1>
            <div className={'flex w-full flex-col items-center justify-center gap-5'}>
                {image && selectedImage && (
                    <img
                        src={image}
                        alt="Selected Image"
                        style={{maxWidth: '100%', maxHeight: '200px', margin: '10px 0'}}
                    />
                )}
                <label
                    htmlFor="dropzone-file"
                    className="dark:hover:bg-bray-800 flex w-fit cursor-pointer flex-col items-center justify-center
                    rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-10 hover:bg-gray-100
                     dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}>
                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                        <UploadLogo size={50} />
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                    </div>
                    <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </label>
                <button
                    className={
                        'inline-flex items-center gap-2 rounded border-b-4 border-blue-700 bg-blue-500 px-4 py-2 font-bold text-white hover:border-blue-500 hover:bg-blue-400'
                    }
                    onClick={handleUpload}>
                    <UploadLogo size={32} />
                    <span className={'p-0'}>Upload</span>
                </button>
            </div>
        </div>
    )
}

export default LandingPage
