import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient.js'
import './RouteRibbon.css'


const RouteRibbon = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        // Optional: Listen for session changes
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            if (session) {
                setIsLoggedIn(session.user.role == 'authenticated')
            }
        });

        // Clean up listener on component unmount
        // return () => {
        //   authListener?.unsubscribe();
        // };
    })

    return (
        <div className={'route-ribbon-container'}>
            <button onClick={() => navigate("/sign_up")}>Sign Up</button>
            <button onClick={() => navigate("/sign_in")}>Sign In</button>
            <button onClick={() => navigate("/")}>Map</button>
            {isLoggedIn && <><button onClick={() => navigate("/map_add")}>Add Markers</button>
                <button onClick={() => navigate("/map_edit")}>Edit Markers</button>
                <button onClick={() => navigate("/map_delete")}>Delete Markers</button></>}
        </div>
    );
};

export default RouteRibbon;