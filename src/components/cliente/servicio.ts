import { nanoid } from 'nanoid';
import { Cliente } from '../../db';
import Joi from 'joi';
const schemaCliente = Joi.object({
    rol: Joi.number(),
    nombre: Joi.string().min(2).max(80).required(),
    apellidoPaterno: Joi.string().min(2).max(80),
    apellidoMaterno: Joi.string().min(2).max(80),
    direccion: Joi.string().min(2).max(255),
    contacto: Joi.string()
});
export async function listar(ctx: any) {
    try {
        const response = await Cliente.findAll({
            attributes: ['id', 'nombre', 'apellidoPaterno', 'contacto', 'nombreCompleto', 'apellidoMaterno'], // Solo campos necesarios
            limit: 500,
            order: [['createdAt', 'DESC']],
        }); return response;
    } catch (e) {
        return e;
    }
}
export async function crear(ctx: any) {
    const { error, value } = schemaCliente.validate(ctx.body);
    if (error) return error;
    try {
        value.id = nanoid();
        value.nombreCompleto = `${value.nombre}${value.apellidoPaterno ? ` ${value.apellidoPaterno}` : ''}${value.apellidoMaterno ? ` ${value.apellidoMaterno}` : ''}`
        const response = await Cliente.create(value);
        return response;
    } catch (e) {
        return e;
    }
}
export async function modificar(ctx: any) {
    const { error, value } = schemaCliente.validate(ctx.body);
    if (error) return error;
    try {
        value.nombreCompleto = `${value.nombre}${value.apellidoPaterno ? ` ${value.apellidoPaterno}` : ''}${value.apellidoMaterno ? ` ${value.apellidoMaterno}` : ''}`
        const id = ctx.params.id;
        const response = await Cliente.update(value, {
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
        const clienteId = ctx.params.id;
        const resultado = await Cliente.destroy({
            where: { id: clienteId }
        });
        if (resultado === 0) {
            return { mensaje: "Cliente no encontrado." };
        }
        return { mensaje: "Cliente eliminado con éxito.", id: clienteId };
    } catch (e) {
        return e;
    }
}