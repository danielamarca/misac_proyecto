import { Elysia } from 'elysia';
import Servicio, { schemaServicio, schemaServicioInspeccion, schemaServicioTipo, schemaServicioEquipo } from './servicio';
const Controlador = new Elysia()
    .onError(({ code, error, set }) => {
        if (code) {
            set.status = 400;
            return { error: { message: error.message } };
        }
    });

Controlador.get('/', Servicio.listarServicio);
Controlador.post('/', Servicio.crearServicio, { body: schemaServicio });
Controlador.put('/:id', Servicio.modificarServicio, { body: schemaServicio });
Controlador.delete('/:id', Servicio.eliminarServicio);


Controlador.get('/tipos', Servicio.listarServicioTipo);
Controlador.post('/tipos', Servicio.crearServicioTipo, { body: schemaServicioTipo });
Controlador.delete('/tipos/:id', Servicio.eliminarServicioTipo);


Controlador.get('/inspecciones', Servicio.listarServicioInspeccion);
Controlador.post('/inspecciones', Servicio.crearServicioInspeccion, { body: schemaServicioInspeccion });
Controlador.put('/inspecciones/:id', Servicio.modificarServicioInspeccion, { body: schemaServicioInspeccion });
Controlador.delete('/inspecciones/:id', Servicio.eliminarServicioInspeccion);


Controlador.get('/equipos', Servicio.listarServicioEquipo);
Controlador.post('/equipos', Servicio.crearServicioEquipo, { body: schemaServicioEquipo });
Controlador.put('/equipos/:id', Servicio.modificarServicioEquipo, { body: schemaServicioEquipo });
Controlador.delete('/equipos/:id', Servicio.eliminarServicioEquipo);

export default Controlador;