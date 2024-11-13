import Map from "./map.jsx"
import { useState, useEffect } from "react"
import DeleteBucketButton from "./DeleteBucketButton.jsx"
import './Page.css'

const MapEditPage = () => {

    const [listening, setListening] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [latlng, setLatLng] = useState({})
    const [selectedMarker, setSelectedMarker] = useState(null)

    return (
        <div className="main-container">
            <Map listening={listening} setListening={setListening} setLatLng={setLatLng} editMode={editMode} selectedMarker={selectedMarker} setSelectedMarker={setSelectedMarker} />
            <DeleteBucketButton selectedMarker={selectedMarker} setSelectedMarker={setSelectedMarker} editMode={editMode} setEditMode={setEditMode} />
        </div>
    )
}

export default MapEditPage