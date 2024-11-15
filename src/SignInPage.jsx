import { useEffect, useState } from "react";
import { supabase } from './supabaseClient.js'


const SignInPage = () => {

    const [formData, setFormData] = useState({
        form_email: "",
        form_password: "",
    })

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
            return
            // add error empty fields
        }

        const { data, error } = await supabase.auth.signInWithPassword({
            email: formData.form_email,
            password: formData.form_password,
        });

        if (error) {
            console.error('Sign-In error:', error.message);
        } else {
            console.log('Sign-In successful:', data);
        }
    }

    useEffect(() => {
        console.log(JSON.stringify(formData, null, 2))
    }, [formData])


    return (
        <div className="container">
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
                </form>
            </div>
        </div>
    );
};

export default SignInPage;