import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient.js'
import ErrorMessage from './ErrorMessage.jsx'
import { useNavigate, Link } from 'react-router-dom'
import PageTopper from './PageTopper.jsx'

const SignUp = () => {
    const [formData, setFormData] = useState({
        form_email: "",
        form_password1: "",
        form_password2: "",
    })
    const [error, setError] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const navigate = useNavigate()


    function updateFormData(data, dataType) {
        switch (dataType) {
            case 'email':
                setFormData({ ...formData, form_email: data })
                break
            case 'password1':
                setFormData({ ...formData, form_password1: data })
                break
            case 'password2':
                setFormData({ ...formData, form_password2: data })
                break
        }
    }

    async function signUpWithEmail(email, password) {
        if (!isLoggedIn) {
            setError("You must be logged in to create an account")
            return
        }

        if (Object.values(formData).some(value => !value)) {
            setError("1 or more fields are empty")
            return
        }

        if (formData.form_password1 != formData.form_password2) {
            setError("Passwords don't match")
            return
        }

        if (formData.form_password1.length <= 5) {
            setError("Password must be at least 6 characters")
        }

        const { data, error } = await supabase.auth.signUp({
            email: formData.form_email,
            password: formData.form_password1
        });
        if (error) {
            console.error('Sign-up error:', error.message);
        } else {
            console.log('Sign-up successful:', data);
            navigate('/map')
        }
    }

    useEffect(() => {
        console.log(JSON.stringify(formData, null, 2))
    }, [formData])

    return (
        <div>
            <PageTopper />
            <div className="page-container">
                <div className="container">
                    <div className="form-box">
                        <h3>Create Account</h3>
                        <p>Account creation is disabled unless you are already signed in</p>
                        <div className="select-button">
                        </div>
                        <form className="form-content">
                            <input
                                type="text"
                                placeholder="Email"
                                onBlur={(e) => updateFormData(e.target.value, 'email')}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                onBlur={(e) => updateFormData(e.target.value, 'password1')}
                            />
                            <input
                                type="password"
                                placeholder="Re-Enter Password"
                                onBlur={(e) => updateFormData(e.target.value, 'password2')}
                            />
                            <div className="select-button">
                                <button type="button" onClick={() => signUpWithEmail()}>
                                    Submit
                                </button>
                            </div>
                            <ErrorMessage error={error} />
                        </form>
                    </div >
                </div >
            </div>
        </div>
    );
};

export default SignUp;