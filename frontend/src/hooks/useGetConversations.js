import { useState , useEffect } from "react";
import toast from "react-hot-toast";


function useGetConversations() {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);

    useEffect(() => {

        const getConversastions = async () => {

            setLoading(true);
            try {
                const res = await fetch('/api/users');
                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error);
                }
                setConversations(data);
            } catch (error) {
                toast.error(error.message);

            } finally {
                setLoading(false);
            }

        };
        getConversastions();
    }, []);
   
    return { loading, conversations };
}
export default useGetConversations
