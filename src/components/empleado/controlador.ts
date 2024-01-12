import { Elysia } from 'elysia';
import Servicio, { schemaEmpleado, schemaTecnico } from './servicio';
const Controlador = new Elysia();

Controlador.get('/', Servicio.listarEmpleado);
Controlador.post('/', Servicio.crearEmpleado, { body: schemaEmpleado });
Controlador.put('/:id', Servicio.modificarEmpleado, { body: schemaEmpleado });
Controlador.delete('/:id', Servicio.eliminarEmpleado);

Controlador.get('/tecnico/', Servicio.listarTecnico);
Controlador.post('/tecnico/', Servicio.crearTecnico, { body: schemaTecnico });
Controlador.put('/tecnico/:id', Servicio.modificarTecnico, { body: schemaTecnico });
Controlador.delete('/tecnico/:id', Servicio.eliminarTecnico);
export default Controlador;