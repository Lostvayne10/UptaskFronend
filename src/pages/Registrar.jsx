import { Link } from "react-router-dom"
import { useState } from "react"
import clienteAxions from "../config/clienteAxios";
import Alerta from "../components/Alerta";
function Registrar() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [alerta, setAlerta ] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();

    if([nombre, email, password, passwordConfirm].includes("")){
        setAlerta({
          msg: 'Todos los campos son obligatorios',
          error: true
        }) ;
        return;
    }

    if(password !== passwordConfirm){
      setAlerta({
        msg: 'Las contraseñas no coinciden',
        error: true
      }) ;
      return;
    }

    if(password.length>6){
      setAlerta({
        msg: 'La contraseña es muy corta, agrega minimo 6 caracteres!!',
        error: true
      }) ;
      return;
    }
    setAlerta({});

    try{
      const {data} = await clienteAxions.post(`/usuarios`, {
        nombre,
        password,
        correo: email
      });

      setAlerta({
        error:false,
        msg: data.msg
      })

      setNombre('');
      setPassword('');
      setEmail('');
      setPasswordConfirm('');

    }catch(error){
      const data = error.response.data;
      setAlerta({
        error:true,
        msg: data.msg
      })
    }

  }

  const {msg} = alerta;

  return (
    <>
      <h1 className='text-sky-600 font-black text-6xl capitalize'>
         Crea tu cuenta
      </h1>
      { msg && <Alerta alerta={alerta}/> }
      <form className='my-10 bg-white shadow rounded-lg p-10' onSubmit={handleSubmit}>
      <div className='my-5'>
          <label 
            htmlFor="nombre" 
            className='uppercase text-gray-600 block text-xl font-bold'>
              Nombre
          </label>
          <input 
            type="text" 
            id="nombre" 
            placeholder="Tu nombre" 
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
           />
        </div>
        <div className='my-5'>
          <label 
            htmlFor="email" 
            className='uppercase text-gray-600 block text-xl font-bold'>
              Email
          </label>
          <input 
            type="email" 
            id='email' 
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            placeholder='Email de Registro' 
            value={email}
            onChange={e => setEmail(e.target.value)}
            />
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
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            placeholder='Contraseña de Registro' 
            value={password}
            onChange={e => setPassword(e.target.value)}/>
        </div>
        <div className='my-5'>
          <label 
            htmlFor="passwordconfirm" 
            className='uppercase text-gray-600 block text-xl font-bold'>
              Confirmar Contraseña
          </label>
          <input 
            type="password" 
            id='passwordconfirm' 
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            placeholder='Confirmar Contraseña' 
            value={passwordConfirm}
            onChange={e => setPasswordConfirm(e.target.value)}/>
        </div>
        <input type="submit" 
                value="Regisrar Cuenta"
                className='bg-sky-700 w-full mb-5 py-3 
                              text-center text-white font-bold 
                              uppercase rounded hover:cursor-pointer 
                              hover:bg-sky-800 transition-colors' />
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="/">¿Ya tienes una cuenta? Inicia sesion</Link>
        <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="/olvide-password">Olvide mi contraseña</Link>
      </nav>
    </>
  )
}

export default Registrar