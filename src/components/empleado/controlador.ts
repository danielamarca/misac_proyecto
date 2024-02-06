import { Elysia } from 'elysia';
import Servicio, { schemaEmpleado, schemaTecnico } from './servicio';
const Controlador = new Elysia();

Controlador.get('/', Servicio.listarEmpleado);
Controlador.post('/', Servicio.crearEmpleado, { body: schemaEmpleado });
Controlador.put('/:id', Servicio.modificarEmpleado, { body: schemaEmpleado });
Controlador.delete('/:id', Servicio.eliminarEmpleado);

Controlador.get('/tecnicos/', Servicio.listarTecnico);
Controlador.post('/tecnicos/', Servicio.crearTecnico, { body: schemaTecnico });
Controlador.put('/tecnicos/:id', Servicio.modificarTecnico, { body: schemaTecnico });
Controlador.delete('/tecnicos/:id', Servicio.eliminarTecnico);
export default Controlador;