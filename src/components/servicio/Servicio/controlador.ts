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


Controlador.get('/tipo', Servicio.listarServicioTipo);
Controlador.post('/tipo', Servicio.crearServicioTipo, { body: schemaServicioTipo });
Controlador.delete('/tipo/:id', Servicio.eliminarServicioTipo);


Controlador.get('/inspeccion', Servicio.listarServicioInspeccion);
Controlador.post('/inspeccion', Servicio.crearServicioInspeccion, { body: schemaServicioInspeccion });
Controlador.put('/inspeccion/:id', Servicio.modificarServicioInspeccion, { body: schemaServicioInspeccion });
Controlador.delete('/inspeccion/:id', Servicio.eliminarServicioInspeccion);


Controlador.get('/equipo', Servicio.listarServicioEquipo);
Controlador.post('/equipo', Servicio.crearServicioEquipo, { body: schemaServicioEquipo });
Controlador.put('/equipo/:id', Servicio.modificarServicioEquipo, { body: schemaServicioEquipo });
Controlador.delete('/equipo/:id', Servicio.eliminarServicioEquipo);

export default Controlador;