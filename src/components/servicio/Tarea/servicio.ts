import { Tarea } from '../../../db';
export function create(ctx: any) {
    Tarea.create({})
    return { nombre: "daniel" }
}
const Servicio = {

};
export default Servicio;