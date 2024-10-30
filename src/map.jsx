import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'


const Map = () => {
    const position = [42.29043180177482, -85.59973287209094]

    return (
        <MapContainer center={position} zoom={17} scrollWheelZoom={false} style={{ height: '100vh', width: '100vh' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
            </Marker>
        </MapContainer>
    )
}

export default Map 