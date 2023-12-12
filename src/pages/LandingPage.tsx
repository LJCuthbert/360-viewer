// LandingPage.tsx
import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {UploadLogo} from '../assets/Images.tsx'
import ImageDropzone from '../components/ImageDropzone.tsx'
import background from '../assets/background2.jpg'

const LandingPage: React.FC = () => {
    const navigate = useNavigate()
    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    const [image, setImage] = useState<string | null>(null)
    const handleImageChange = (file: File) => {
        const imageURL = URL.createObjectURL(file)
        setSelectedImage(file)
        setImage(imageURL)
    }

    const handleUpload = () => {
        if (selectedImage) {
            const formData = new FormData()
            formData.append('file', selectedImage)

            fetch(`${import.meta.env.VITE_API_URL}/api/upload`, {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data.message)
                    navigate(`/view/${data.file}`)
                })
                .catch((error) => {
                    console.error('Error uploading image:', error)
                })
        } else {
            console.warn('No image selected')
        }
    }

    return (
        <div
            style={{backgroundImage: `url(${background})`}}
            className={'flex h-full flex-col items-center justify-evenly bg-auto bg-top bg-repeat-y'}>
            <h1 className={'text-center text-7xl font-bold underline'}>360 Photo Viewer</h1>
            <div className={'flex w-full flex-col items-center justify-center gap-5'}>
                {image && (
                    <img
                        src={image}
                        alt="Selected Image"
                        style={{maxWidth: '100%', maxHeight: '200px', margin: '10px 0'}}
                    />
                )}
                <div className={`flex w-full flex-col items-center justify-center gap-5`}>
                    <ImageDropzone uploadFile={handleImageChange} />
                    <button
                        className={
                            'inline-flex items-center gap-2 rounded-lg border-b-4 border-blue-700 bg-blue-500 px-4 py-2 font-bold text-white hover:border-blue-500 hover:bg-blue-400'
                        }
                        onClick={handleUpload}>
                        <UploadLogo size={32} />
                        <span>Upload</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LandingPage
