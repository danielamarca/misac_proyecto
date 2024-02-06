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
Controlador.get('/detalle/', Servicio.listarEquipoDetalles);
Controlador.post('/', Servicio.crearEquipo, { body: schemaEquipo });
Controlador.put('/:id', Servicio.modificarEquipo, { body: schemaEquipo });
Controlador.delete('/:id', Servicio.eliminarEquipo);


Controlador.get('/categorias/', Servicio.listarEquipoCategoria);
// Controlador.get('/categorias/equipos/', Servicio.listarEquipoCategoriaEquipos);
Controlador.post('/categorias/', Servicio.crearEquipoCategoria, { body: schemaEquipoCategoria });
Controlador.put('/categorias/:id', Servicio.modificarEquipoCategoria, { body: schemaEquipoCategoria });
Controlador.delete('/categorias/:id', Servicio.eliminarEquipoCategoria);


Controlador.get('/proveedores/', Servicio.listarProveedor);
// Controlador.get('/proveedores/equipos/', Servicio.listarProveedorEquipos);
Controlador.post('/proveedores/', Servicio.crearProveedor, { body: schemaProveedor });
Controlador.put('/proveedores/:id', Servicio.modificarProveedor, { body: schemaProveedor });
Controlador.delete('/proveedores/:id', Servicio.eliminarProveedor);


Controlador.get('/codigos/', Servicio.listarEquipoCodigo);
Controlador.post('/codigos/', Servicio.crearEquipoCodigo, { body: schemaEquipoCodigo });
Controlador.put('/codigos/:id', Servicio.modificarEquipoCodigo, { body: schemaEquipoCodigo });
Controlador.delete('/codigos/:id', Servicio.eliminarEquipoCodigo);


Controlador.get('/fotos/', Servicio.listaEquipoFoto);
Controlador.post('/fotos/', Servicio.crearEquipoFoto, { body: schemaEquipoFoto });
Controlador.put('/fotos/', Servicio.modificarEquipoFoto, { body: schemaEquipoFoto });
Controlador.delete('/fotos/:id', Servicio.eliminarEquipoFoto);

export default Controlador;
