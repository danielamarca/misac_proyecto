import Joi from 'joi';
import { Equipo } from '../../../db';
import { nanoid } from 'nanoid';
const schemaEquipo = Joi.object({
    id: Joi.string().min(20).max(25),
    nombre: Joi.string().max(255).required(),
    descripcion: Joi.string().max(255),
    precio: Joi.number().required(),
    stock: Joi.number().required(),
});
export async function listar(ctx: any) {
    try {
        const response = await Equipo.findAll({
            order: [['createdAt', 'DESC']]
        });
        return response;
    } catch (e) {
        return e;
    }
}
export async function crear(cxt: any) {
    console.log('crea');
    const { error, value } = schemaEquipo.validate(cxt.body);
    console.log('error', error);
    console.log('value', value);
    if (error) return error;
    try {
        value.id = nanoid();
        const response = await Equipo.create(value);
        console.log('crear equipo', response.dataValues);
        return response.dataValues;
    } catch (e) {
        return e;
    }
}
export async function modificar(ctx: any) {
    const { error, value } = schemaEquipo.validate(ctx.body);
    if (error) return error;
    const id = ctx.params.id;
    try {
        const response = await Equipo.update(value, { where: { id } });
        if (!response[0]) return new Error('No se pudo modificar');
        value.id = id;
        return value;
    } catch (e) {
        return e;
    }
}
export async function eliminar(ctx: any) {
    const id = ctx.params.id;
    console.log('eliminar');
    try {
        const response = await Equipo.destroy({ where: { id } });
        if (!response) return new Error("no se pudo eliminar");
        return response;
    } catch (e) {
        return e;
    }
}