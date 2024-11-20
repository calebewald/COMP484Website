import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient.js'

const CompostCounter = () => {
    const [pounds, setPounds] = useState()
    const [buckets, setBuckets] = useState()

    async function fetchValues() {

        const { data, error } = await supabase
            .from('composting_values')
            .select('*');
        setPounds(data[0].total_pounds)
        setBuckets(data[0].num_buckets)
    }

    useEffect(() => {
        fetchValues();
    }, []);

    return (
        <div className="container">
            <form action="/login" method="post" className="form-box">
                <div className="form-section">
                    <h3>Statistics</h3>
                    <p className="form-content">Number of Pounds Composted: {pounds}</p>
                    <p className="form-content">Number of Buckets Composted: {buckets}</p>
                </div>
            </form>
        </div >
    )
}

export default CompostCounter