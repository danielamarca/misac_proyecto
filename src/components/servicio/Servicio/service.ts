import { Servicio, Empleado, Cliente, sequelize } from '../../../db';
import { Context } from 'elysia';
import Joi from 'joi';
import { nanoid } from 'nanoid';
import { Transaction } from 'sequelize';

const schemaEmpleado = Joi.object({
    rol: Joi.number(),
    nombre: Joi.string().min(2).max(99).required(),
    apellidoPaterno: Joi.string().min(2).max(99),
    apellidoMaterno: Joi.string().min(2).max(99),
    direccion: Joi.string().min(2).max(255),
    contacto: Joi.string()
});
const schemaCliente = Joi.object({
    rol: Joi.number(),
    nombre: Joi.string().min(2).max(80).required(),
    apellidoPaterno: Joi.string().min(2).max(80),
    apellidoMaterno: Joi.string().min(2).max(80),
    direccion: Joi.string().min(2).max(255),
    contacto: Joi.string()
})
const schemaServicio = Joi.object({
    descripcion: Joi.string(),
    fechaProgramada: Joi.date(),
    id_cliente: Joi.string().min(20).max(25),
    id_tecnico: Joi.string().min(20).max(25),
    cliente: schemaCliente,
    tecnico: schemaEmpleado,
});

export async function create(ctx: Context) {
    const { error, value } = schemaServicio.validate(ctx.body);
    if (error) {
        return error;
    }
    if (
        (!value.id_cliente || !value.id_tecnico) &&
        (!value.cliente || !value.tecnico)
    ) return new Error('no existe datos de: cliente, tecnico');
    let servicio: any;
    await sequelize.transaction(async (t: Transaction) => {
        const opcionesTransaccion = { transaction: t };
        let cliente, tecnico;
        try {

            if (value.tecnico && value.cliente) {
                cliente = await Cliente.create({ id: nanoid(), ...value.cliente },
                    opcionesTransaccion);
                value.id_cliente = cliente && cliente.dataValues.id;
                tecnico = await Empleado.create({ id: nanoid(), ...value.tecnico },
                    opcionesTransaccion);
                value.id_tecnico = tecnico && tecnico.dataValues.id;
            } else {
                const tecnico = await Empleado.findOne({ where: { id: value.id_tecnico } });
                const cliente = await Cliente.findOne({ where: { id: value.id_cliente } });
                value.id_cliente = cliente && cliente.dataValues.id;
                value.id_tecnico = tecnico && tecnico.dataValues.id;
            }
            servicio = value.id_cliente && value.id_tecnico && await Servicio.create({ id: nanoid(), ...value },
                opcionesTransaccion);
        } catch (error) {
            throw new Error('Error la crear los datos');
        }
    });
    if (!servicio) return new Error('id_cliente o id_empleado Incorrecto');
    return servicio;
}
