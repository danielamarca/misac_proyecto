import { nanoid } from 'nanoid';
import { Empleado } from '../../db';
import Joi from 'joi';
const schemaEmpleado = Joi.object({
    rol: Joi.number(),
    nombre: Joi.string().min(2).max(80).required(),
    apellidoPaterno: Joi.string().min(2).max(80),
    apellidoMaterno: Joi.string().min(2).max(80),
    direccion: Joi.string().min(2).max(255),
    contacto: Joi.string()
});
export async function listar(ctx: any) {
    try {
        const response = await Empleado.findAll({
            attributes: ['id', 'nombre', 'apellidoPaterno', 'contacto', 'nombreCompleto', 'apellidoMaterno'], // Solo campos necesarios
            limit: 500,
            order: [['createdAt', 'DESC']],
        }); return response;
    } catch (e) {
        return e;
    }
}
export async function crear(ctx: any) {
    const { error, value } = schemaEmpleado.validate(ctx.body);
    if (error) return error;
    try {
        value.id = nanoid();
        value.nombreCompleto = `${value.nombre}${value.apellidoPaterno ? ` ${value.apellidoPaterno}` : ''}${value.apellidoMaterno ? ` ${value.apellidoMaterno}` : ''}`
        const response = await Empleado.create(value);
        return response;
    } catch (e) {
        return e;
    }
}
export async function modificar(ctx: any) {
    const { error, value } = schemaEmpleado.validate(ctx.body);
    if (error) return error;
    try {
        value.nombreCompleto = `${value.nombre}${value.apellidoPaterno ? ` ${value.apellidoPaterno}` : ''}${value.apellidoMaterno ? ` ${value.apellidoMaterno}` : ''}`
        const id = ctx.params.id;
        const response = await Empleado.update(value, {
            where: {
                id
            }
        })
        if (!response[0]) return new Error('No se ha modificado');
        value.id = id;
        return value;
    } catch (e) {
        return e;
    }
}
export async function eliminar(ctx: any) {
    try {
        const EmpleadoId = ctx.params.id;
        const resultado = await Empleado.destroy({
            where: { id: EmpleadoId }
        });
        if (resultado === 0) {
            return { mensaje: "Empleado no encontrado." };
        }
        return { mensaje: "Empleado eliminado con éxito.", id: EmpleadoId };
    } catch (e) {
        return e;
    }
}