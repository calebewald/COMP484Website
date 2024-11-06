import { useState, useEffect } from 'react'
import axios from 'axios'

const CompostCounter = () => {
    const [pounds, setPounds] = useState(0)
    const [buckets, setBuckets] = useState(0)

    // currently local, won't work if you aren't on Caleb's machine
    const databasePrefix = 'http://localhost:3000'

    async function fetchValues() {
        try {
            const response = await axios.get(databasePrefix + '/data/composting_values');
            console.log(JSON.stringify(response.data[0].id))
            setPounds(response.data[0].total_pounds)
            setBuckets(response.data[0].num_buckets)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchValues();
    }, []);

    return (
        <div class="login-box">
            <form action="/login" method="post">
                <p>Number of Pounds: {pounds}</p>
                <p>Number of Buckets: {buckets}</p>
            </form>
        </div>
    )
}


export default CompostCounter