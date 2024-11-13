import "./DeleteBucketButton.css"
import { supabase } from './supabaseClient.js'
import { useEffect } from 'react'



const DeleteBucketButton = ({ selectedMarker, setSelectedMarker, editMode, setEditMode }) => {

    async function deleteSelectedMarker() {
        if (!selectedMarker) {
            return
        }

        const { data, error } = await supabase
            .from('bucket_locations')
            .delete()
            .eq("id", selectedMarker)
    }

    useEffect(() => {
        console.log(selectedMarker)
    }, [selectedMarker])

    return (
        <div className="container">
            <div className="form-box">
                <h3>Delete Marker</h3>
                <form className="form-content">
                    <button type="button" onClick={() => setEditMode(true)}>(Select Marker)</button>
                    <button type="button" onClick={() => deleteSelectedMarker()}>Delete Marker</button>
                </form>
            </div>
        </div>
    );
}

export default DeleteBucketButton