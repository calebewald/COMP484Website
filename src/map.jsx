import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Tooltip } from 'react-leaflet'
import { useState, useEffect } from 'react'
import 'leaflet/dist/leaflet.css'
import { supabase } from './supabaseClient.js'
import 'leaflet-extra-markers/dist/css/leaflet.extra-markers.min.css';
import L from 'leaflet';
import 'leaflet-extra-markers';

const Map = ({ editMode, setEditMode, listening, setListening, latlng, setLatLng, selectedMarker, setSelectedMarker }) => {
    const [bucketData, setBucketData] = useState([])

    const greenIcon = L.ExtraMarkers.icon({
        icon: 'fa-recycle',
        number: '1',
        markerColor: 'green',
        shape: 'circle',
        prefix: 'fa'
    });

    const yellowIcon = L.ExtraMarkers.icon({
        icon: 'fa-question',
        number: '1',
        markerColor: 'yellow',
        shape: 'circle',
        prefix: 'fa'
    });





    // This component listens for clicks on the map
    const LocationMarkers = () => {
        useMapEvents({
            click(e) {
                if (listening) {
                    setLatLng(e.latlng)
                    console.log(e.latlng)
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
                icon={greenIcon}
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
                    Building Name: {bucket.building_name} <br />
                    Room Number: {bucket.room_number} <br />
                    In Location?: {bucket.in_location ? "Yes" : "No"} <br />
                </Popup>
                {editMode && <Tooltip>Click To Select</Tooltip>}

            </Marker >)
        })
    };

    function handleEditMarker(id) {
        setSelectedMarker(id)
        setEditMode(false)
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
        <MapContainer center={centerPosition} zoom={17} scrollWheelZoom={false} style={{ height: '90vh', width: '100vw', flex: '1.5', paddingRight: '10px' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarkers />
            {latlng.lat && <Marker position={[latlng.lat, latlng.lng]} icon={yellowIcon} />}
            {
                (listening || editMode) && (
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.2)',
                            zIndex: 1000,
                            pointerEvents: 'none',  // Allow clicks to pass through
                        }}
                    />
                )
            }
        </MapContainer >
    );
};

export default Map;
