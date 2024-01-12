import { Elysia } from 'elysia';
import Servicio, { schemaCliente } from './servicio';
const controlador = new Elysia()
    .onError(({ code, error, set }) => {
        if (code) {
            set.status = 400;
            return { error: { message: error.message } };
        }
    });
controlador.get('/', Servicio.listarCliente);
controlador.post('/', Servicio.crearCliente, { body: schemaCliente });
controlador.put('/:id', Servicio.modificarCliente, { body: schemaCliente });
controlador.delete('/:id', Servicio.eliminarCliente);

export default controlador;