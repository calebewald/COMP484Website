import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import { useState } from 'react'
import 'leaflet/dist/leaflet.css'

const ClickableMap = () => {
    const [popupPositions, setPopupPositions] = useState([]); // Store multiple positions

    // This component listens for clicks on the map
    const LocationMarkers = () => {
        useMapEvents({
            click(e) {
                setPopupPositions((prevPositions) => [
                    ...prevPositions, // Add new position to the array
                    e.latlng
                ]);
            },
        });

        // Render markers for all stored popup positions
        return popupPositions.map((position, index) => (
            <Marker key={index} position={position}>
                <Popup>
                    You clicked here: <br /> {position.lat}, {position.lng}
                </Popup>
            </Marker>
        ));
    };

    const centerPosition = [42.29043180177482, -85.59973287209094];

    return (
        <MapContainer center={centerPosition} zoom={17} scrollWheelZoom={false} style={{ height: '100vh', width: '100%' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarkers /> {/* Listen for clicks and render markers for each click */}
        </MapContainer>
    );
};

export default ClickableMap;
