import React, { useState } from "react";
import { Link } from "react-router-dom";
import uploadImage from "../utilities/UploadImage.tsx";

const LandingPage: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileChange = (e: { target: { files: React.SetStateAction<null>[]; }; }) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = () => {
        if (selectedFile) {
            const fileName = uploadImage(selectedFile);
            console.log('File uploaded:', fileName);
        }
    };


    return (
        <div className={"flex flex-col justify-center items-center"}>
            <h1 className={"text-3xl font-bold underline"}>360 Photo Viewer</h1>
            <Link to="/viewer/test">Go to test page</Link>

            <div>
                {selectedFile && (
                    <img
                        src={selectedFile}
                        alt="Selected Image"
                        style={{ maxWidth: "100%", maxHeight: "200px", margin: "10px 0" }}
                    />
                )}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                <button onClick={handleUpload} className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}>Upload</button>
            </div>
        </div>
    );
};

export default LandingPage;
