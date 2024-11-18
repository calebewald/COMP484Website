import { useEffect, useState } from "react";
import { supabase } from './supabaseClient.js'
import ErrorMessage from './ErrorMessage.jsx'
import RouteRibbon from './RouteRibbon.jsx'

const SignInPage = () => {
    const [formData, setFormData] = useState({
        form_email: "",
        form_password: "",
    })
    const [error, setError] = useState('')

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
        if (Object.values(formData).some(value => !value)) {
            setError("1 or more fields are empty")
            return
            // add error empty fields
        }

        const { data, error } = await supabase.auth.signInWithPassword({
            email: formData.form_email,
            password: formData.form_password,
        });

        if (error === 'Invalid login credentials') {
            console.log(error)
            setError("Invalid login credentials")
        } else {
            console.log('Sign-In successful:', data);
        }
    }

    useEffect(() => {
        console.log(JSON.stringify(formData, null, 2))
    }, [formData])


    return (
        <div className="container">
            <RouteRibbon />
            <div className="form-box">
                <h3>Sign In</h3>
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
                        onBlur={(e) => updateFormData(e.target.value, 'password')}
                    />
                    <div className="select-button">
                        <button type="button" onClick={() => signInWithEmail()}>
                            Submit
                        </button>
                    </div>
                    <ErrorMessage error={error} />
                </form>
            </div>
        </div>
    );
};

export default SignInPage;