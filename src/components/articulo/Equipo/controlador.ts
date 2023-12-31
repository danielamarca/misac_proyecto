import { Elysia } from 'elysia';
import { Servicio } from '.';
const controlador = new Elysia();
controlador.get('/', Servicio.listar);
controlador.post('/', Servicio.crear);
controlador.put('/:id', Servicio.modificar);
controlador.delete('/:id', Servicio.eliminar);
export default controlador;
