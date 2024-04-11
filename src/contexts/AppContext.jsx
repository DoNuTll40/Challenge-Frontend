
import { useNavigate } from 'react-router-dom';
import axios from '../configs/axios-path';
import { createContext, useEffect, useState } from "react"

const AuthContext = createContext();

function AuthContextProvider(props) {

    const [user, setUser] = useState(null)

    useEffect(() => {
        const start = async () => {
            try {
                let token = localStorage.getItem('token');
                if (!token) {
                    return
                }

                const response = await axios.get('/auth/me', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                setUser(response.data)
            } catch (err) {
                console.log(err)
            }
        }
        start();
    }, [])

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
    }

    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthContextProvider };
export default AuthContext;