import { Elysia } from 'elysia';
import Servicio, { schemaServicio, schemaServicioTipo } from './servicio';
const Controlador = new Elysia()
    .onError(({ code, error, set }) => {
        if (code) {
            set.status = 400;
            return { error: { message: error.message } };
        }
    });

Controlador.get('/', Servicio.listarServicio);
Controlador.post('/', Servicio.crearServicio, { body: schemaServicio });
Controlador.delete('/:id', Servicio.eliminarServicio);


Controlador.post('/tipo', Servicio.crearServicioTipo, { body: schemaServicioTipo });

export default Controlador;