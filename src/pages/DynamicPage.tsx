import React, {useMemo} from 'react';
import { useParams } from 'react-router-dom';
import View360, {EquirectProjection, ControlBar} from "@egjs/react-view360";
import "@egjs/react-view360/css/view360.min.css";

const DynamicPage: React.FC = () => {
    const { url } = useParams<{ url: string }>();
    const projection = useMemo(() => new EquirectProjection({
        src: `/uploads/${url}.jpg`,

    }), [])
    return (
        <div>
            <h2>Dynamic Page</h2>
            <View360 className="is-16by9" projection={projection} plugins={[new ControlBar()]}/>
        </div>
    );
};

export default DynamicPage;