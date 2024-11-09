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
        <div className="login-box">
            <form action="/login" method="post">
                <p>Number of Pounds YTD: {pounds}</p>
                <p>Number of Buckets YTD: {buckets}</p>
            </form>
        </div>
    )
}

export default CompostCounter