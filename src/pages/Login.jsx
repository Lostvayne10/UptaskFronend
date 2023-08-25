import { Link, useNavigate } from "react-router-dom"
import clienteAxions from "../config/clienteAxios"
import { useState } from "react"
import Alerta from "../components/Alerta"
import useAuth from "../hooks/useAuth"
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const {setAuth} = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    if(email==""|| email.length<6){
      setAlerta({
        msg: "Debe ingresar un email valido",
        error:true
      })
      return;
    }
    if(password==""|| password.length<6){
      setAlerta({
        msg: "Debe ingresar una contraseña valida",
        error:true
      })
      return;
    }
    try{
      const {data} =  await clienteAxions.post(`/usuarios/login`, {
        password: password,
        correo: email
      });
      localStorage.setItem("token", data.token);
      setAlerta({
        msg:"Iniciando sesion",
        error:false
      });
      setAuth(data);
      navigate('/proyectos');
      setPassword("");
      setEmail("");
    }catch(error){
      setAlerta({
        msg:error.response.data.msg,
        error:true
      });
    }
  }
  const {msg} = alerta;
  return (
    <>
      <h1 className='text-sky-600 font-black text-6xl capitalize'>
          Inicia sesion
      </h1>
      { msg && <Alerta alerta={alerta}/> }
      <form className='my-10 bg-white shadow rounded-lg p-10' onSubmit={handleSubmit}>
        <div className='my-5'>
          <label 
            htmlFor="email" 
            className='uppercase text-gray-600 block text-xl font-bold'>
              Email
          </label>
          <input 
            type="email" 
            id='email' 
            placeholder='Email de Registro' 
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            value={email}
            onChange={e => setEmail(e.target.value)}/>
        </div>
        <div className='my-5'>
          <label 
            htmlFor="password" 
            className='uppercase text-gray-600 block text-xl font-bold'>
              Contraseña
          </label>
          <input 
            type="password" 
            id='password' 
            placeholder='Contraseña de Registro' 
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            value={password}
            onChange={e => setPassword(e.target.value)}/>
        </div>
        <input type="submit" 
                value="Iniciar Sesion"
                className='bg-sky-700 w-full mb-5 py-3 
                              text-center text-white font-bold 
                              uppercase rounded hover:cursor-pointer 
                              hover:bg-sky-800 transition-colors' />
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="/registrar">¿No tienes una cuenta? Registrate</Link>
        <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="/olvide-password">Olvide mi contraseña</Link>
      </nav>
    </>
  )
}

export default Login