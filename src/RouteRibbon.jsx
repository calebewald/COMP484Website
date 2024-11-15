import { useNavigate } from 'react-router-dom'
import './RouteRibbon.css'

const RouteRibbon = () => {

    const navigate = useNavigate()

    return (
        <div className={'route-ribbon-container'}>
            <button onClick={() => navigate("/sign_up")}>Sign Up</button>
            <button onClick={() => navigate("/sign_in")}>Sign In</button>
            <button onClick={() => navigate("/")}>Map</button>
            <button onClick={() => navigate("/map_add")}>Add Markers</button>
            <button onClick={() => navigate("/map_edit")}>Edit Markers</button>
            <button onClick={() => navigate("/map_delete")}>Delete Markers</button>
        </div>
    );
};

export default RouteRibbon;