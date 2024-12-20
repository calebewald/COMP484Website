import { useEffect, useState, useRef } from "react"
import { supabase } from './supabaseClient.js'
import ErrorMessage from './ErrorMessage.jsx'
import LoadingMessage from "./LoadingMessage.jsx"

const EditMarkerButton = ({ selectedMarker, setSelectedMarker, editMode, setEditMode, setListening, latlng }) => {
    const [clicked, setClicked] = useState(false)
    const [formData, setFormData] = useState({
        form_building_name: undefined,
        form_room_number: undefined,
        form_in_location: true,
        form_lat: undefined,
        form_lng: undefined,
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const building_name = useRef(null);
    const room_number = useRef(null);
    const in_location = useRef(null);

    // const [marker, setMarker] = useState()

    function updateFormData(data, dataType) {
        switch (dataType) {
            case 'building_name':
                setFormData({ ...formData, form_building_name: data })
                break
            case 'room_number':
                setFormData({ ...formData, form_room_number: data })
                break
            case 'in_location':
                setFormData({ ...formData, form_in_location: data == 'yes' ? true : false })
                break
        }
    }

    function handleSubmit() {
        setLoading(true)
        setError('')

        // check validity of form
        console.log(JSON.stringify(formData))
        if (Object.values(formData).some(val => (val === undefined || val === ""))) {
            setError("1 or more fields are empty")
            setLoading(false)
            return
        }
        editBucketData()
        setClicked(!clicked)
    }

    async function editBucketData() {

        const deletePromise = supabase
            .from('bucket_locations')
            .delete()
            .eq('id', selectedMarker)

        const insertPromise = supabase
            .from('bucket_locations')
            .insert([{
                building_name: formData.form_building_name,
                room_number: formData.form_room_number,
                in_location: formData.form_in_location,
                lat: formData.form_lat,
                lng: formData.form_lng,
            }])
            .single()

        const [insertResult, deleteResult] = await Promise.all([insertPromise, deletePromise]);

        window.location.reload();
    }

    async function fetchBucket() {
        const { data, error } = await supabase
            .from('bucket_locations')
            .select('*')
            .eq('id', selectedMarker)
            .single();
        console.log(JSON.stringify(data, null, 2))
        console.log(!data)
        if (error || !data) {
            console.log('entered')
            return
        }

        setFormData({
            form_building_name: data.building_name,
            form_room_number: data.room_number,
            form_in_location: data.in_location,
            form_lat: data.lat,
            form_lng: data.lng,
        })

        if (building_name.current && room_number.current && in_location.current) {
            building_name.current.value = data.building_name
            room_number.current.value = data.room_number
            in_location.current.value = data.in_location ? 'yes' : 'no'
        }
    }

    useEffect(() => {
        fetchBucket()
    }, [selectedMarker])

    useEffect(() => {
        console.log(formData)
    }, [formData])

    return (
        <div className="crud-container">
            <form className="crud-form-box">
                <div className="form-section">
                    <h3>Edit Marker Details</h3>
                    <form className="form-content">
                        <button
                            type="button"
                            onClick={() => setEditMode(!editMode)}
                            className="select-button"
                        >
                            (Select Marker to Edit)
                        </button>

                        <input
                            type="text"
                            placeholder="Building Name"
                            onBlur={(e) => updateFormData(e.target.value, "building_name")}
                            disabled={selectedMarker == null}
                            ref={building_name}
                        />
                        <input
                            type="text"
                            placeholder="Room Number/Location"
                            onBlur={(e) => updateFormData(e.target.value, "room_number")}
                            disabled={selectedMarker == null}
                            ref={room_number}
                        />
                        <label className="form-section-inline">
                            In location?
                            <select
                                onChange={(e) => updateFormData(e.target.value, "in_location")}
                                disabled={selectedMarker == null}
                                ref={in_location}
                            >
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </label>
                        <button type="button" onClick={() => handleSubmit()}>
                            Submit Changes
                        </button>
                        <ErrorMessage error={error} />
                        <LoadingMessage loading={loading} />
                    </form>
                </div>
            </form>
        </div>
    );
}

export default EditMarkerButton