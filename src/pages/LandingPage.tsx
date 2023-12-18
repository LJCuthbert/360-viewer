// LandingPage.tsx
import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {UploadLogo} from '../assets/Images.tsx'
import ImageDropzone from '../components/ImageDropzone.tsx'
import background from '../assets/background2.jpg'

const LandingPage: React.FC = () => {
    const navigate = useNavigate()
    const [selectedImage, setSelectedImage] = useState<File | undefined>(undefined)
    const [image, setImage] = useState<string | null>(null)
    const [isUploading, setIsUploading] = useState<boolean>(false)
    const handleImageChange = (file: File) => {
        const imageURL = URL.createObjectURL(file)
        setSelectedImage(file)
        setImage(imageURL)
    }

    const handleUpload = async () => {
        if (selectedImage) {
            const formData = new FormData()
            formData.append('file', selectedImage)
            formData.append('upload_preset', 'cyiem4hd')
            formData.append('api_key', import.meta.env.VITE_CLOUDINARY_API_KEY)
            setIsUploading(true)
            const results = await fetch(`${import.meta.env.VITE_API_URL}`, {
                method: 'POST',
                body: formData,
            }).then((res) => res.json())
            setIsUploading(false)
            const url = results.public_id.split('/')[1]
            navigate(`/view/${url}`)
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
                    {isUploading ? (
                        <div role="status">
                            <svg
                                aria-hidden="true"
                                className="h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"
                                />
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                    ) : (
                        <button
                            className={
                                'inline-flex items-center gap-2 rounded-lg border-b-4 border-blue-700 bg-blue-500 px-4 py-2 font-bold text-white hover:border-blue-500 hover:bg-blue-400'
                            }
                            onClick={handleUpload}>
                            <UploadLogo size={32} />
                            <span>Upload</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default LandingPage
