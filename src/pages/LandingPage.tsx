import React from "react";
import {Link} from "react-router-dom";

const LandingPage: React.FC = () => {
    return (
        <div className={"flex flex-col justify-center items-center"}>
            <h1 className={"text-3xl font-bold underline"}>360 Photo Viewer</h1>
            <Link to="/viewer/test">Go to test page</Link>
        </div>
    );
}
export default LandingPage;