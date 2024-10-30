import { useState } from 'react'

const CompostCounter = () => {
    const [pounds, setPounds] = useState(0)
    const [buckets, setBuckets] = useState(0)


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