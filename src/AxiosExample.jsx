import axios from 'axios'
import { useEffect, useState } from 'react'

const AxiosExample = () => {

    const [message, setMessage] = useState('');

    const fetchMessage = async () => {
        try {
            const response = await axios.get('http://localhost:3000/data/composting_values');
            console.log(JSON.stringify(response.data))
            setMessage(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setMessage('Error fetching data');
        }
    };

    useEffect(() => {
        fetchMessage();
    }, []);


    return (
        <div>message: {JSON.stringify(message[0])} </div>
    )
}

export default AxiosExample