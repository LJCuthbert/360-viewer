import React from "react";
import { ReactPhotoSphereViewer } from 'react-photo-sphere-viewer';
import {Link} from "react-router-dom";

const LandingPage: React.FC = () => {
    return (
        <div>
            <h1>360 Photo Viewer</h1>
            <ReactPhotoSphereViewer src="test.jpg" height={'90vh'} width={"100%"}></ReactPhotoSphereViewer>
            <Link to="/viewer/test">Go to Dynamic Page with ID 1</Link>
        </div>
    );
}
export default LandingPage;