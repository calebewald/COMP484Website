import Map from "./map.jsx"
import { useState, useEffect } from "react"
import EditMarkerButton from './EditMarkerButton.jsx'
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
                <Map listening={listening} setListening={setListening} setLatLng={setLatLng} editMode={editMode} setEditMode={setEditMode} selectedMarker={selectedMarker} setSelectedMarker={setSelectedMarker} GrayMap={GrayMap} />
                {/* <AddBucketButton setListening={setListening} latlng={latlng} /> */}
                <EditMarkerButton editMode={editMode} setEditMode={setEditMode} selectedMarker={selectedMarker} setSelectedMarker={setSelectedMarker} setListening={setListening} latlng={latlng} setGrayMap={setGrayMap} />
            </div>
        </div>
    )
}

export default MapEditPage