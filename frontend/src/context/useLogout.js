import React, { useState } from 'react'
import { useAuthContext } from './AuthContext';
import toast from "react-hot-toast"

const useLogout = () => {

    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const logout = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/auth/logout', {
                method: "POST",
                body: { "Content-Type": "application/json" }
            })
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);

            }
            localStorage.removeItem("chat-user");
            setAuthUser(null);

        } catch (error) {
            toast.error(error.message);

        } finally {
            setLoading(false)
        }
    }
return {loading , logout};
}



export default useLogout
