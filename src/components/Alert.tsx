import React from 'react'

interface AlertProps {
    show: string | undefined
    color: string | null
    header: string | null
    subheader: string | null
}

const Alert: React.FC<AlertProps> = ({color, show, header, subheader}) => {
    return (
        <div
            className={`${show} w-full md:w-fit`}
            role="alert">
            <div className={`rounded-t bg-${color}-500 px-8 py-2 text-center font-bold text-white`}>{header}</div>
            <div
                className={`rounded-b border border-t-0 text-center border-${color}-400 bg-${color}-100 px-8 py-3 text-${color}-700`}>
                <p>{subheader}</p>
            </div>
        </div>
    )
}
export default Alert
