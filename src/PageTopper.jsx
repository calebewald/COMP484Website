import HamburgerMenu from "./HamburgerMenu";
import { useState, useEffect } from "react";
import { supabase } from './supabaseClient.js'
import { useNavigate } from 'react-router-dom'

const PageTopper = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const navigate = useNavigate()

    async function logInOrOut() {
        if (isLoggedIn) {
            const { error } = await supabase.auth.signOut();
            navigate("/sign_in")
        }
        else {
            navigate("/sign_in")
        }
    }

    useEffect(() => {
        // Optional: Listen for session changes
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            if (session) {
                setIsLoggedIn(session.user.role == 'authenticated')
            }
        });
    })

    useEffect(() => {
        console.log(isLoggedIn)
    }, [isLoggedIn])

    return (
        <div className="page-topper-container">
            < HamburgerMenu isLoggedIn={isLoggedIn} />
            <h2>Kalamazoo College Composting Bucket Tracker</h2>
            <button type="button" onClick={() => logInOrOut()}> {isLoggedIn ? 'Log Out' : 'Log In'}</button>
        </div>
    );
};

export default PageTopper;