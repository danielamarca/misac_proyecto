import { Elysia } from 'elysia';
import Servicio, { schemaEquipo, schemaEquipoCategoria, schemaEquipoCodigo, schemaEquipoFoto, schemaProveedor } from './servicio';
const Controlador = new Elysia()
    .onError(({ code, error, set }) => {
        if (code) {
            set.status = 400;
            return { error: { message: error.message } };
        }
    });
Controlador.get('/', Servicio.listarEquipo);
Controlador.get('/detalles/', Servicio.listarEquipoDetalles);
Controlador.post('/', Servicio.crearEquipo, { body: schemaEquipo });
Controlador.put('/:id', Servicio.modificarEquipo, { body: schemaEquipo });
Controlador.delete('/:id', Servicio.eliminarEquipo);


Controlador.get('/categoria/', Servicio.listarEquipoCategoria);
Controlador.get('/categoria/equipos/', Servicio.listarEquipoCategoriaEquipos);
Controlador.post('/categoria/', Servicio.crearEquipoCategoria, { body: schemaEquipoCategoria });
Controlador.put('/categoria/:id', Servicio.modificarEquipoCategoria, { body: schemaEquipoCategoria });
Controlador.delete('/categoria/:id', Servicio.eliminarEquipoCategoria);



Controlador.get('/proveedor/', Servicio.listarProveedor);
Controlador.get('/proveedor/equipos/', Servicio.listarProveedorEquipos);
Controlador.post('/proveedor/', Servicio.crearProveedor, { body: schemaProveedor });
Controlador.put('/proveedor/:id', Servicio.modificarProveedor, { body: schemaProveedor });
Controlador.delete('/proveedor/:id', Servicio.eliminarProveedor);


Controlador.get('/equipo_codigo/', Servicio.listarEquipoCodigo);
Controlador.post('/equipo_codigo/', Servicio.crearEquipoCodigo, { body: schemaEquipoCodigo });
Controlador.put('/equipo_codigo/:id', Servicio.modificarEquipoCodigo, { body: schemaEquipoCodigo });
Controlador.delete('/equipo_codigo/:id', Servicio.eliminarEquipoCodigo);


Controlador.get('/equipo_foto/', Servicio.listaEquipoFoto);
Controlador.post('/equipo_foto/', Servicio.crearEquipoFoto, { body: schemaEquipoFoto });
Controlador.put('/equipo_foto/', Servicio.modificarEquipoFoto, { body: schemaEquipoFoto });
Controlador.delete('/equipo_foto/:id', Servicio.eliminarEquipoFoto);

export default Controlador;
