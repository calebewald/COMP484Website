import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import { useState, useEffect } from 'react'
import 'leaflet/dist/leaflet.css'
import { supabase } from './supabaseClient.js'


const Map = () => {
    const [bucketData, setBucketData] = useState([])

    // This component listens for clicks on the map
    const LocationMarkers = () => {
        // used to click to make point, turn off for now
        // useMapEvents({
        //     click(e) {
        //         setPopupPositions((prevPositions) => [
        //             ...prevPositions, // Add new position to the array
        //             e.latlng
        //         ]);
        //     },
        // });

        // Render markers for all stored popup positions
        // return popupPositions.map((position, index) => (
        //     <Marker key={index} position={position}>
        //         <Popup>
        //             You clicked here: <br /> {position.lat}, {position.lng}
        //         </Popup>
        //     </Marker>
        // ));

        return bucketData.map((bucket, index) => {
            return (<Marker key={index} position={[bucket.lat, bucket.lng]} >
                <Popup>
                    building_name: {bucket.building_name} <br />
                    room_number: {bucket.room_number} <br />
                    in_location: {bucket.in_location} <br />
                    lat, lng: {bucket.lat}, {bucket.lng} <br />
                </Popup>
            </Marker >)
        })
    };

    // on load get all bucket info from db and update map accordingly
    async function fetchBucketData() {
        const { data, error } = await supabase
            .from('bucket_locations')
            .select('*');
        setBucketData(data)
    }

    useEffect(() => {
        fetchBucketData()
    }, [])

    const centerPosition = [42.29043180177482, -85.59973287209094];

    return (
        <MapContainer center={centerPosition} zoom={17} scrollWheelZoom={false} style={{ height: '100vh', width: '100vh' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarkers /> {/* Listen for clicks and render markers for each click */}
        </MapContainer>
    );
};

export default Map;
