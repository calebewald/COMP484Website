import AddBucketButton from "./AddBucketButton"
import Map from "./map.jsx"
import { useState, useEffect } from "react"
import './Page.css'

const MapAddPage = () => {

    const [listening, setListening] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [latlng, setLatLng] = useState({})
    const [selectedMarker, setSelectedMarker] = useState(null)
    const [GrayMap, setGrayMap] = useState(false)

    return (
        <div className="main-container">
            <Map listening={listening} setListening={setListening} setLatLng={setLatLng} editMode={editMode} selectedMarker={selectedMarker} setSelectedMarker={setSelectedMarker} GrayMap={GrayMap} />
            <AddBucketButton setListening={setListening} latlng={latlng} setGrayMap={setGrayMap} />
            {/* <EditLocationButton editMode={editMode} setEditMode={setEditMode} selectedMarker={selectedMarker} setSelectedMarker={setSelectedMarker} setListening={setListening} latlng={latlng} /> */}
        </div>
    )
}

export default MapAddPage