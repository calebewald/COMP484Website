import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient.js'
import ErrorMessage from './ErrorMessage.jsx'
import LoadingMessage from './LoadingMessage.jsx'

const AddBucketButton = ({ setListening, latlng, setGrayMap }) => {
    const [formData, setFormData] = useState({
        form_building_name: undefined,
        form_room_number: undefined,
        form_in_location: true,
        form_lat: undefined,
        form_lng: undefined,
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

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
        setError('')
        setLoading(true)

        console.log(Object.values(formData).includes(undefined))

        // check validity of form
        if (Object.values(formData).includes(undefined)) {
            setError("1 or more fields are empty")
            return
            // implement set error message "one or more fields are empty"
        }
        setBucketData()
    }

    async function setBucketData() {
        const { data, error } = await supabase
            .from('bucket_locations')
            .insert([{
                building_name: formData.form_building_name,
                room_number: formData.form_room_number,
                in_location: formData.form_in_location,
                lat: formData.form_lat,
                lng: formData.form_lng,
            }])
            .single();
        setLoading(false)
        window.location.reload();
    }

    // debug
    // useEffect(() => {
    //     console.log(JSON.stringify(formData))
    // }, [formData])

    useEffect(() => {
        if (latlng) {
            setFormData({ ...formData, form_lat: latlng.lat, form_lng: latlng.lng })
        }
    }, [latlng])

    return (
        <div className="container">
            <div className="form-box">
                <h3>Add Location Details</h3>
                <form className="form-content">
                    <button type="button" onClick={() => {
                        setListening(true)
                        setGrayMap(true)
                    }}>
                        (Select Location on Map)
                    </button>
                    <input
                        type="text"
                        placeholder="Building Name"
                        onBlur={(e) => updateFormData(e.target.value, 'building_name')}
                    />
                    <input
                        type="text"
                        placeholder="Room Number/Location"
                        onBlur={(e) => updateFormData(e.target.value, 'room_number')}
                    />
                    <label>
                        In location?
                        <select onChange={(e) => updateFormData(e.target.value, 'in_location')}>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </label>
                    <button type="button" onClick={() => handleSubmit()}>
                        Submit
                    </button>

                    <ErrorMessage error={error} />
                    <LoadingMessage loading={loading} />
                </form>
            </div>
        </div>
    );
}

export default AddBucketButton