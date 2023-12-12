import React, {useEffect, useMemo, useState} from 'react'
import {useParams} from 'react-router-dom'
import View360, {EquirectProjection, ControlBar} from '@egjs/react-view360'
import '@egjs/react-view360/css/view360.min.css'
import background from '../assets/background1.jpg'
import logo from '../assets/logoFull.jpg'
import {Tick, Exclamation} from '../assets/Images.tsx'

const ViewPage: React.FC = () => {
    const {url} = useParams<{url: string}>()
    const [imageSrc, setImageSrc] = useState<string | null>(null)
    const [buttonClicked, setButtonClicked] = useState(false)

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/image/${url}`)
                if (response.ok) {
                    const blob = await response.blob()
                    const imageURL = URL.createObjectURL(blob)
                    setImageSrc(imageURL)
                } else {
                    console.error(`Failed to fetch image. Status: ${response.status}`)
                    console.error(`Message: ${response.body}`)
                }
            } catch (error) {
                console.error('Error fetching image:', error)
            }
        }

        fetchImage()
    }, [url])
    const projection = useMemo(
        () =>
            new EquirectProjection({
                src: `${imageSrc}`,
            }),
        [imageSrc]
    )

    const handleCopyLink = () => {
        if (imageSrc) {
            const pageLink = window.location.href
            navigator.clipboard
                .writeText(pageLink)
                .then(() => {
                    console.log('Link copied to clipboard:', pageLink)
                    setButtonClicked(true)
                })
                .catch((error) => {
                    console.error('Error copying link to clipboard:', error)
                    setButtonClicked(false)
                })
        }
    }
    return (
        <div
            style={{backgroundImage: `url(${background})`}}
            className={'flex h-full flex-col items-center justify-evenly bg-contain bg-top'}>
            {imageSrc && (
                <>
                    <View360
                        id="viewer"
                        style={{
                            width: '96%',
                            height: '75vh',
                        }}
                        onLoad={(evt) => {
                            evt.target.fov = 120
                        }}
                        projection={projection}
                        plugins={[new ControlBar()]}
                        autoInit={true}
                    />
                    <button
                        className={`flex items-center gap-1.5 rounded-lg border-b-4 px-4 py-2 font-bold text-white ${
                            buttonClicked
                                ? 'border-green-700 bg-green-500 hover:border-green-500 hover:bg-green-400'
                                : 'border-blue-700 bg-blue-500 hover:border-blue-500 hover:bg-blue-400'
                        } `}
                        onClick={handleCopyLink}>
                        <span className={'text-2xl font-light'}>{buttonClicked ? 'Link Copied' : 'Copy Link'}</span>
                        {buttonClicked ? <Tick size={24} /> : <Exclamation size={24} />}
                    </button>
                    <img
                        src={logo}
                        alt="Logo"
                        width={'30%'}
                    />
                </>
            )}
        </div>
    )
}

export default ViewPage
