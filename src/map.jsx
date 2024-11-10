import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import { useState, useEffect } from 'react'
import 'leaflet/dist/leaflet.css'
import { supabase } from './supabaseClient.js'


const Map = ({ editMode, listening, setListening, setLatLng, selectedMarker, setSelectedMarker }) => {
    const [bucketData, setBucketData] = useState([])

    // This component listens for clicks on the map
    const LocationMarkers = () => {
        useMapEvents({
            click(e) {
                // setPopupPositions((prevPositions) => [
                //     ...prevPositions, // Add new position to the array
                //     e.latlng
                // ]);
                if (listening) {
                    setLatLng(e.latlng)
                    setListening(false)
                }


            },
        });

        // Render markers for all stored popup positions
        // return popupPositions.map((position, index) => (
        //     <Marker key={index} position={position}>
        //         <Popup>
        //             You clicked here: <br /> {position.lat}, {position.lng}
        //         </Popup>
        //     </Marker>
        // ));

        return bucketData.map((bucket, index) => {
            return (<Marker
                key={index}
                position={[bucket.lat, bucket.lng]}
                eventHandlers={{
                    click: () => {
                        if (editMode) {
                            console.log(bucket.id)
                            handleEditMarker(bucket.id);
                        }
                    }
                }}>
                <Popup>
                    building_name: {bucket.building_name} <br />
                    room_number: {bucket.room_number} <br />
                    in_location: {bucket.in_location ? "Yes" : "No"} <br />
                    lat, lng: {bucket.lat}, {bucket.lng} <br />
                </Popup>
            </Marker >)
        })
    };

    function handleEditMarker(id) {
        setSelectedMarker(id)
    }

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
            <LocationMarkers />
            {listening && (
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        zIndex: 1000,
                    }}
                />
            )}
        </MapContainer>
    );
};

export default Map;
