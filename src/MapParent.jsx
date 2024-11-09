import AddBucketButton from "./AddBucketButton"
import Map from "./map.jsx"
import { useState, useEffect } from "react"

const MapParent = () => {

    const [listening, setListening] = useState(false)
    const [latlng, setLatLng] = useState({})

    return (
        <div>
            <Map listening={listening} setListening={setListening} setLatLng={setLatLng} />
            <AddBucketButton setListening={setListening} latlng={latlng} />
        </div>
    )
}

export default MapParent