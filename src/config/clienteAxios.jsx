import axios from 'axios';

const clienteAxions = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`
});
export default clienteAxions