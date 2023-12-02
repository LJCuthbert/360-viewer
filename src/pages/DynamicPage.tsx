import React from 'react';
import { useParams } from 'react-router-dom';
import {ReactPhotoSphereViewer} from "react-photo-sphere-viewer";

const DynamicPage: React.FC = () => {
    const { url } = useParams<{ url: string }>();

    return (
        <div>
            <h2>Dynamic Page</h2>
            <ReactPhotoSphereViewer src={`${url}.jpg`} height={'90vh'} width={"100%"}></ReactPhotoSphereViewer>
        </div>
    );
};

export default DynamicPage;