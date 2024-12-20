import { supabase } from './supabaseClient.js'
import { useEffect, useState } from 'react'
import ErrorMessage from './ErrorMessage.jsx'
import LoadingMessage from "./LoadingMessage.jsx"

const DeleteBucketButton = ({ selectedMarker, setSelectedMarker, editMode, setEditMode }) => {

    const [error, setError] = useState('')
    const [loading, setLoading] = useState('')

    async function deleteSelectedMarker() {
        setLoading(true)
        setError('')

        if (!selectedMarker) {
            setError("No marker selected")
            setLoading(false)
            return
        }

        const { data, error } = await supabase
            .from('bucket_locations')
            .delete()
            .eq("id", selectedMarker)

        setLoading(false)
        window.location.reload();
    }

    return (
        <div className="crud-container">
            <div className="crud-form-box">
                <h3>Delete Marker</h3>
                <form className="form-content">
                    <button type="button" onClick={() => setEditMode(!editMode)}>(Select Marker)</button>
                    <button type="button" onClick={() => deleteSelectedMarker()}>Delete Marker</button>
                    <ErrorMessage error={error} />
                    <LoadingMessage loading={loading} />
                </form>
            </div>
        </div>
    );
}

export default DeleteBucketButton