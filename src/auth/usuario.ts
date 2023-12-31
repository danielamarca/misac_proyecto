import { nanoid } from 'nanoid';
import { Elysia } from 'elysia';
import { Empleado, Usuario, sequelize } from '../db';
import * as bcrypt from 'bcryptjs';
import Joi from 'joi';
const schemaEmpleado = Joi.object({
    rol: Joi.number(),
    nombre: Joi.string().min(2).max(80).required(),
    apellidoPaterno: Joi.string().min(2).max(80),
    apellidoMaterno: Joi.string().min(2).max(80),
    direccion: Joi.string().min(2).max(255),
    contacto: Joi.string(),
});
const schemaUsuario = Joi.object({
    id: Joi.string().min(20).max(25),
    username: Joi.string().min(3).max(50).required(),
    password: Joi.string().min(3).max(50).required(),
    privilegio: Joi.number().required(),
    id_empleado: Joi.string().min(20).max(25),
    empleado: schemaEmpleado,
});
export async function listar(ctx: any) {
    try {
        const response = await Usuario.findAll({
            attributes: ['id', 'username', 'password', 'id_empleado', 'privilegio'], // Solo campos necesarios
            limit: 500,
            order: [['createdAt', 'DESC']],
        }); return response;
    } catch (e) {
        return e;
    }
}
export async function crear(ctx: any) {
    const { error, value } = schemaUsuario.validate(ctx.body);
    if (error) return error;
    if (!value.id_empleado && !value.empleado) return new Error('No existe empleado');
    try {
        value.id = nanoid();
        let empleado;
        if (value.empleado) {
            empleado = value.empleado;
            empleado.nombreCompleto = `${empleado.nombre}${empleado.apellidoPaterno ? ` ${empleado.apellidoPaterno}` : ''}${empleado.apellidoMaterno ? ` ${empleado.apellidoMaterno}` : ''}`;
            empleado.id = nanoid();
            const emp = await Empleado.create(empleado);
            value.id_empleado = emp.dataValues.id
        }
        value.password = await bcrypt.hash(value.password, 5);
        const user = await Usuario.create(value);
        console.log(user);
        return user.dataValues;
    } catch (e) {
        return e;
    }
}
const usuario = new Elysia();
usuario.get('/', listar);
usuario.post('/', crear);
export default usuario;

