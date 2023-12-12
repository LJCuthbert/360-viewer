// ImageDropzone.tsx
import React, {ChangeEvent, DragEvent, useState} from 'react'
import {UploadLogo} from '../assets/Images.tsx'
import Alert from './Alert.tsx'

interface ImageDropzoneProps {
    uploadFile: (file: File) => void
}

const ImageDropzone: React.FC<ImageDropzoneProps> = ({uploadFile}) => {
    const [showAlert, isAlertShowing] = useState<string>('hidden')
    const [isDragging, setIsDragging] = useState(false)

    function imageErrorValidation(file: File | undefined) {
        if (file && file.type.startsWith('image/')) {
            uploadFile(file)
            isAlertShowing('hidden')
        } else {
            isAlertShowing('block')
        }
    }
    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        imageErrorValidation(file)
    }
    const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
        event.preventDefault()

        const file = event.dataTransfer.files[0]
        imageErrorValidation(file)

        setIsDragging(false)
    }

    const handleDragOver = (event: DragEvent<HTMLLabelElement>) => {
        event.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = () => {
        setIsDragging(false)
    }

    return (
        <>
            <label
                htmlFor="dropzone-file"
                className={` dark:hover:bg-bray-800 flex h-64 w-[50%] cursor-pointer flex-col items-center justify-center rounded-lg
                     border-4 max-md:w-full
                    ${
                        isDragging
                            ? 'border-dashed border-blue-500 bg-blue-100 dark:border-blue-600 dark:bg-blue-600'
                            : 'border-gray-300 bg-gray-50 shadow-xl hover:border-dashed hover:bg-gray-100 hover:shadow ' +
                              'dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600'
                    }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}>
                <div className="flex flex-col items-center justify-center gap-2.5">
                    <UploadLogo size={50} />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-bold">Click to choose file</span> or drag and drop
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
            <Alert
                show={showAlert}
                color={'red'}
                header={'Could not upload image'}
                subheader={'Please select a jpg'}
            />
        </>
    )
}

export default ImageDropzone
