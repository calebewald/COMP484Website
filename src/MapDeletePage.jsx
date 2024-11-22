import Map from "./map.jsx"
import { useState, useEffect } from "react"
import DeleteBucketButton from "./DeleteBucketButton.jsx"
import PageTopper from './PageTopper.jsx'

const MapEditPage = () => {

    const [listening, setListening] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [latlng, setLatLng] = useState({})
    const [selectedMarker, setSelectedMarker] = useState(null)
    const [GrayMap, setGrayMap] = useState(false)

    return (
        <div>
            <PageTopper />
            <div className="main-container">
                <Map listening={listening} setListening={setListening} latlng={latlng} setLatLng={setLatLng} editMode={editMode} setEditMode={setEditMode} selectedMarker={selectedMarker} setSelectedMarker={setSelectedMarker} GrayMap={GrayMap} />
                <DeleteBucketButton selectedMarker={selectedMarker} setSelectedMarker={setSelectedMarker} editMode={editMode} setEditMode={setEditMode} setGrayMap={setGrayMap} />
            </div>
        </div>
    )
}

export default MapEditPage