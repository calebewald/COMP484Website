import { useState, useEffect } from 'react'
import axios from 'axios'

const CompostCounter = () => {
    const [pounds, setPounds] = useState(0)
    const [buckets, setBuckets] = useState(0)

    const [message, setMessage] = useState('')

    // currently local, won't work if you aren't on Caleb's machine
    const databasePrefix = 'http://localhost:3000'

    async function fetchValues() {
        try {
            const response = await axios.get(databasePrefix + '/data/composting_values');
            setPounds(response.data[0].total_pounds)
            setBuckets(response.data[0].num_buckets)

            setMessage(JSON.stringify(response.data))
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
                <p>Number of Pounds YTD: {pounds}</p>
                <p>Number of Buckets YTD: {buckets}</p>
                <p>return: {message}</p>
            </form>
        </div>
    )
}


export default CompostCounter