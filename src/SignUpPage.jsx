import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient.js'

const SignUp = () => {
    const [formData, setFormData] = useState({
        form_email: "",
        form_password1: "",
        form_password2: "",
    })

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
        if (Object.values(formData).some(value => !value)) {
            return
            // add error empty fields
        }

        if (formData.form_password1 != formData.form_password2) {
            return
            // add error passwords don't match
        }

        const { data, error } = await supabase.auth.signUp({
            email: formData.form_email,
            password: formData.form_password1
        });
        if (error) {
            console.error('Sign-up error:', error.message);
        } else {
            console.log('Sign-up successful:', data);
        }
    }

    useEffect(() => {
        console.log(JSON.stringify(formData, null, 2))
    }, [formData])

    return (
        <div className="container">
            <div className="form-box">
                <h3>Sign Up</h3>
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
                </form>
            </div>
        </div>
    );
};

export default SignUp;