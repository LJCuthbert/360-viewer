import React, {useEffect, useMemo, useState} from 'react'
import {useParams} from 'react-router-dom'
import View360, {EquirectProjection, ControlBar} from '@egjs/react-view360'
import '@egjs/react-view360/css/view360.min.css'

const ViewPage: React.FC = () => {
    const {url} = useParams<{url: string}>()
    const [imageSrc, setImageSrc] = useState<string | null>(null)

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/image/${url}`)
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
    return (
        <div className={'flex h-full flex-col items-center justify-evenly p-4 pt-2'}>
            <h2>Dynamic Page</h2>
            {imageSrc && (
                <View360
                    id="viewer"
                    style={{
                        width: '100%',
                        height: '75vh',
                    }}
                    onLoad={(evt) => {
                        evt.target.fov = 120
                    }}
                    projection={projection}
                    plugins={[new ControlBar()]}
                    autoInit={true}
                />
            )}
        </div>
    )
}

export default ViewPage
