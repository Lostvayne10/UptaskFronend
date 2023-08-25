import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"
function Sidebar() {

  const {auth} = useAuth();

  return (
    <aside className="md:w-80 lg:w-96 px-5 py-10">
        <p className="text-xl font-bold">Hola: {auth.nombre}</p>
        <Link to="crear-proyecto"
                className="text-white bg-sky-600 w-full p-3 block mt-5 uppercase text-center rounded-lg "
                >
            Nuevo Proyecto
        </Link>
    </aside>
  )
}

export default Sidebar