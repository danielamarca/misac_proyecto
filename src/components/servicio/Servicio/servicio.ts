import { Servicio as ServicioDB, Empleado, Cliente, sequelize, ServicioTipo, Tecnico } from '../../../db';
import { t } from 'elysia';
import { nanoid } from 'nanoid';
import ServicioCliente, { schemaCliente } from '../../cliente/servicio';
import ServicioTecnico, { schemaTecnico } from '../../empleado/servicio';

export const schemaServicioTipo = t.Object({
    id: t.Optional(t.String({
        description: "Unicamente: ID tipo string"
    })),
    tipo: t.String({
        default: "MANTENIMIENTO PREVENTIVO",
        description: "Unicamente: Nombre"
    }),
    descripcion: t.Optional(t.String({
        default: "Se desarrolla mantenimiento preventivo",
        description: "Unicamente: Texto"
    })),
});
export const schemaServicio = t.Object({
    id: t.Optional(t.String({
        description: "Unicamente: ID tipo string"
    })),
    id_servicio_tipo: t.Optional(t.Union([
        schemaServicioTipo,
        t.String()
    ], {
        default: "aABradf_123",
        description: "Unicamente: ID: String | Object"
    })),
    id_cliente: t.Optional(t.Union([
        schemaCliente,
        t.String()
    ], {
        default: "aABradf_123",
        description: "Unicamente: ID: String | Object"
    })),
    id_tecnico: t.Optional(t.Union([
        schemaTecnico,
        t.String()
    ], {
        default: "aABradf_123",
        description: "Unicamente: ID: String | Object"
    })),
    descripcion: t.Optional(t.String({
        default: "VENTA DE EQUIPOS Y ACCESORIOS DE VIDEOVIGILANCIA",
        description: "Unicamente: Texto"
    })),
    estado: t.Optional(t.String({
        default: "VENTA DE EQUIPOS Y ACCESORIOS DE VIDEOVIGILANCIA",
        description: "Unicamente: Texto"
    })),
    fechaInicio: t.Optional(t.String({
        default: new Date().toISOString(),
        description: "Unicamente: Tipo Fecha"
    })),
    fechaFin: t.Optional(t.String({
        default: new Date().toISOString(),
        description: "Unicamente: Tipo Fecha"
    })),
    fechaProgramada: t.Optional(t.String({
        default: new Date().toISOString(),
        description: "Unicamente: Tipo Fecha"
    })),
});

const Servicio = {
    listarServicio: async function () {
        try {
            const response = await ServicioDB.findAll();
            return { data: response };
        } catch (e) {
            throw new Error('Error a listar Serivico');
        }
    },
    crearServicioTipo: async function ({ body }: any) {
        const { ...value } = body;
        try {
            value.id = nanoid();
            const response = await ServicioTipo.create(value);
            return { data: response.dataValues };
        } catch (e) {
            throw new Error(`Error al crear Servicio Tipo ${e.message}`);
        }
    },
    crearServicio: async function ({ body }: any) {
        const { id_servicio_tipo, id_cliente, id_tecnico, ...value } = body;
        let servicioTipo, cliente, tecnico;
        try {
            value.id = nanoid();
            if (!id_servicio_tipo || !id_cliente || !id_tecnico) throw new Error("No se tiene las referencias id_servicio_tipo | id_cliente | id_tecnico");
            servicioTipo = (typeof id_servicio_tipo == 'string')
                ? await ServicioTipo.findByPk(id_servicio_tipo)
                : await Servicio.crearServicioTipo(id_servicio_tipo);
            if (!servicioTipo) throw new Error('Error al crear o no existe el Servicio Tipo');
            cliente = (typeof id_cliente === 'string')
                ? await Cliente.findByPk(id_cliente)
                : await ServicioCliente.crearCliente(id_cliente);
            if (!cliente) throw new Error('Error al crear o no existe el Cliente');
            tecnico = (typeof id_tecnico === 'string')
                ? await Tecnico.findByPk(id_tecnico)
                : await ServicioTecnico.crearTecnico(id_tecnico);
            if (!tecnico) throw new Error('Error al crear o no existe el Tecnico');
            const response = await ServicioDB.create({
                ...value,
                id_servicio_tipo: servicioTipo.data?.id ?? servicioTipo.id,
                id_cliente: cliente.data?.id ?? cliente.id,
                id_tecnico: tecnico.data?.id ?? tecnico.id,
            });
            return { data: response.dataValues };
        } catch (e) {
            if (e.name === 'SequelizeUniqueConstraintError') {
                throw new Error('Nombre debe ser único tanto en Cliente');
            }
            throw new Error(e.message);
        }
    },
    eliminarServicio: async function ({ params: { id } }: any) {
        if (!id) throw new Error('No existe ID');
        try {
            const servicio = await ServicioDB.findByPk(id);
            if (!servicio) throw new Error('No existe el Servicio que quiere eliminar');
            await servicio.destroy();
            return { data: servicio };
        } catch (e) {

        }
    }
};
export default Servicio;