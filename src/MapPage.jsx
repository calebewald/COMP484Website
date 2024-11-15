import Map from "./map.jsx"
import { useState, useEffect } from "react"
import CompostCounter from './CompostCounter.jsx'
import './Page.css'
import RouteRibbon from './RouteRibbon.jsx'


const MapPage = () => {

    const [listening, setListening] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [latlng, setLatLng] = useState({})
    const [selectedMarker, setSelectedMarker] = useState(null)
    const [GrayMap, setGrayMap] = useState(false)

    return (
        <div>
            <RouteRibbon />
            <div className="main-container">
                <Map listening={listening} setListening={setListening} setLatLng={setLatLng} editMode={editMode} setEditMode={setEditMode} selectedMarker={selectedMarker} setSelectedMarker={setSelectedMarker} GrayMap={GrayMap} />
                <CompostCounter />
                {/* <AddBucketButton setListening={setListening} latlng={latlng} />
            <EditLocationButton editMode={editMode} setEditMode={setEditMode} selectedMarker={selectedMarker} setSelectedMarker={setSelectedMarker} setListening={setListening} latlng={latlng} /> */}
            </div>
        </div>
    )
}

export default MapPage