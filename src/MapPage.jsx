import Map from "./map.jsx"
import { useState, useEffect } from "react"
import CompostCounter from './CompostCounter.jsx'
import './Page.css'

const MapPage = () => {

    const [listening, setListening] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [latlng, setLatLng] = useState({})
    const [selectedMarker, setSelectedMarker] = useState(null)

    return (
        <div className="main-container">
            <Map listening={listening} setListening={setListening} setLatLng={setLatLng} editMode={editMode} selectedMarker={selectedMarker} setSelectedMarker={setSelectedMarker} />
            <CompostCounter />
            {/* <AddBucketButton setListening={setListening} latlng={latlng} />
            <EditLocationButton editMode={editMode} setEditMode={setEditMode} selectedMarker={selectedMarker} setSelectedMarker={setSelectedMarker} setListening={setListening} latlng={latlng} /> */}
        </div>
    )
}

export default MapPage