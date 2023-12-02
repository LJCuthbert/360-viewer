import {Link} from "react-router-dom";
import React from "react";

interface ButtonProps {
    url: string
}

const Button: React.FC<ButtonProps> = ({url}) => {
    return (
        <div>
            <Link to={url}>Go to test page</Link>
        </div>
    )
}

export default Button