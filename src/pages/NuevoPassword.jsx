import React from 'react'
import { useState, useEffect } from 'react'
import {useParams, Link} from "react-router-dom"
import clienteAxions from "../config/clienteAxios";
import Alerta from "../components/Alerta"

function NuevoPassword() {
  const params = useParams();
  const {token} = params; 
  const [alerta, setAlerta ] = useState({});
  const [nuevaPassword, setNuevaPassword] = useState("");
  const [passwordCambiada, setPasswordCambiada] = useState(false);
  const [tokenValido, setTokenValido] = useState(false);
  const {msg} = alerta;

  useEffect(()=>{
      const comprobarToken = async () => {
        try{

          await clienteAxions(`/usuarios/olvide-password/${token}`);
          setTokenValido(true)
    
        }catch(error){
          setAlerta({
            msg:error.response.data.msg,
            error:true
          });
        }
      }
      comprobarToken();
  },[]);

  const handleSubmit = async e => {
    e.preventDefault();
    console.log()
    if(nuevaPassword==""|| nuevaPassword.length<6){
      setAlerta({
        msg:"Ingresa una contraseña valida",
        error:true
      });
      return;
    }

    try{

      const {data} =  await clienteAxions.post(`/usuarios/olvide-password/${token}`, {
        password: nuevaPassword
      });

      setAlerta({
        msg:data.msg,
        error:false
      });

      setNuevaPassword("");
      setPasswordCambiada(true)

    }catch(error){
      setAlerta({
        msg:error.response.data.msg,
        error:true
      });
    }
  }

  return (
    <>
    <h1 className='text-sky-600 font-black text-6xl capitalize'>
       Restablece tu password
    </h1>
    { msg && <Alerta alerta={alerta}/> }
    {tokenValido && (
      <form className='my-10 bg-white shadow rounded-lg p-10' onSubmit={handleSubmit}>
   
        <div className='my-5'>
          <label 
            htmlFor="password" 
            className='uppercase text-gray-600 block text-xl font-bold'>
              Nueva Contraseña
          </label>
          <input 
            type="password" 
            id='password' 
            placeholder='Escribe tu nueva contraseña' 
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            value={nuevaPassword}
            onChange={e=> setNuevaPassword(e.target.value)}/>
        </div>
        <input type="submit" 
                value="Guardar nueva contraseña"
                className='bg-sky-700 w-full mb-5 py-3 
                              text-center text-white font-bold 
                              uppercase rounded hover:cursor-pointer 
                              hover:bg-sky-800 transition-colors' />
      </form>                               
    )}
    
    
    {passwordCambiada && (
       <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="/">Inicia sesion</Link>
    )}
  </>
  )
}

export default NuevoPassword