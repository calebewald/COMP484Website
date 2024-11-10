import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient.js'

const AddBucketButton = ({ setListening, latlng }) => {
    const [clicked, setClicked] = useState(false)
    const [formData, setFormData] = useState({
        form_building_name: undefined,
        form_room_number: undefined,
        form_in_location: true,
        form_lat: undefined,
        form_lng: undefined,
    })

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
        // implement set loading

        console.log(Object.values(formData).includes(undefined))

        // check validity of form
        if (Object.values(formData).includes(undefined)) {
            return
            // implement set error message "one or more fields are empty"
        }
        setBucketData()
        setClicked(!clicked)
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
        <div>
            <button onClick={() => setClicked(!clicked)}>Add Bucket</button>
            {clicked && <form>
                <input
                    type='text'
                    placeholder='Building Name'
                    onBlur={(e) => updateFormData(e.target.value, "building_name")}
                ></input><br></br>
                <input
                    type='text'
                    placeholder='Room Number/Location'
                    onBlur={(e) => updateFormData(e.target.value, "room_number")}>
                </input><br></br>
                <label>
                    In location?
                    <select onChange={(e) => updateFormData(e.target.value, "in_location")}
                        style={{ marginLeft: '8px' }}>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </label>
                <div>
                    Choose Position:
                    <button
                        type="button"
                        onClick={() => setListening(true)}
                        style={{ marginLeft: '10px' }}>
                        Select on Map
                    </button>
                </div>
                <div>
                    <button
                        type="button"
                        onClick={() => handleSubmit()}
                        style={{ marginLeft: '10px' }}>
                        Submit
                    </button>
                </div>
            </form>}
        </div >)
}

export default AddBucketButton