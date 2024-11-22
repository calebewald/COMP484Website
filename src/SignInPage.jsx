import { useEffect, useState } from "react";
import { supabase } from './supabaseClient.js'
import ErrorMessage from './ErrorMessage.jsx'
import { useNavigate, Link } from "react-router-dom";
import PageTopper from './PageTopper.jsx'
import LoadingMessage from "./LoadingMessage.jsx";

const SignInPage = () => {
    const [formData, setFormData] = useState({
        form_email: "",
        form_password: "",
    })
    const [error, setError] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    function updateFormData(data, dataType) {
        switch (dataType) {
            case 'email':
                setFormData({ ...formData, form_email: data })
                break
            case 'password':
                setFormData({ ...formData, form_password: data })
                break
        }
    }

    async function signInWithEmail(email, password) {
        setLoading(true)
        if (Object.values(formData).some(value => !value)) {
            setError("1 or more fields are empty")
            setLoading(false)
            return
            // add error empty fields
        }

        const { data, error } = await supabase.auth.signInWithPassword({
            email: formData.form_email,
            password: formData.form_password,
        });

        if (error) {
            setError("Invalid login credentials")
            setLoading(false)
        } else {
            setLoading(false)
            navigate("/map")
        }
    }

    async function signOut() {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error('Error signing out:', error.message);
        } else {
            console.log('User signed out successfully');
            // Reload the page only if sign-out is successful
            window.location.reload();
        }
    }

    async function printCurrentSessionInfo() {
        const { data: session, error } = await supabase.auth.getSession();
        if (error) {
            console.error('Error fetching session info:', error);
            return null;
        }

        console.log(JSON.stringify(session, null, 2))
        return session;
    }

    useEffect(() => {
        // Optional: Listen for session changes
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            if (session) {
                setIsLoggedIn(session.user.role == 'authenticated')
            }
        });
    })

    async function logOut() {
        console.log('hello')
        if (isLoggedIn) {
            const { error } = await supabase.auth.signOut();
            setIsLoggedIn(false)
            window.location.reload()
        }
    }


    return (
        <div>
            <PageTopper />
            <div className={'page-container'}>
                <div className="container">
                    <div className="form-box">
                        <h3>Sign In</h3>
                        <p>For composting staff only. If you aren't a member you don't need an account!</p>
                        {/* <img src={HornetLogo}></img> */}
                        {isLoggedIn && <div>
                            <label>Currently Logged In</label><button type="button" className={'form-content'} onClick={() => logOut()}>Log Out?</button>
                        </div>}
                        {!isLoggedIn && <form className="form-content">
                            <input
                                type="text"
                                placeholder="Email"
                                disabled={isLoggedIn}
                                onBlur={(e) => updateFormData(e.target.value, 'email')}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                disabled={isLoggedIn}
                                onBlur={(e) => updateFormData(e.target.value, 'password')}
                            />
                            <div className="select-button">
                                <button type="button" disabled={isLoggedIn} onClick={() => signInWithEmail()}>
                                    Submit
                                </button>
                            </div>
                            <label>Don't have an account? <Link to="/sign_up">Sign Up</Link></label>
                            <ErrorMessage error={error} />
                            <LoadingMessage loading={loading} />
                        </form>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;