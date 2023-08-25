import { useState, useEffect, createContext } from "react";
import clienteAxions from "../config/clienteAxios";
const AuthContext = createContext();
import { useNavigate } from "react-router-dom";
const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({});
    const [cargando, setCargando] = useState(true)
    const navigate = useNavigate();
    useEffect(()=>{
        const autenticarUsuario = async () => {
            const token = localStorage.getItem("token");
            if(!token){
                setCargando(false)
                return;
            }
            const config = {
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            };
            try{
                const {data} = await clienteAxions("/usuarios/profile",config);
                setAuth(data);
                navigate('/proyectos');
            }catch(error){
                setAuth({});
            }
            setCargando(false)
        };
        autenticarUsuario();
    },[]);
    return  (
        <AuthContext.Provider 
            value={{
                setAuth,
                auth,
                cargando
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
export {
    AuthProvider
};
export default AuthContext;