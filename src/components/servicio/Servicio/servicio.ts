import { Servicio as ServicioDB, Empleado, Cliente, sequelize, ServicioTipo, Tecnico, ServicioInspeccion, ServicioEquipo, Equipo } from '../../../db';
import { t } from 'elysia';
import { nanoid } from 'nanoid';
import ClienteServicio, { schemaCliente } from '../../cliente/servicio';
import TecnicoServicio, { schemaTecnico } from '../../empleado/servicio';
import EquipoServicio, { schemaEquipo } from '../../articulo/Equipo/servicio';

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
export const schemaServicioInspeccion = t.Object({
    id: t.Optional(t.String({
        description: "Unicamente: ID tipo string"
    })),
    id_servicio: t.Optional(t.Union([
        schemaServicio,
        t.String()
    ], {
        default: "aABradf_123",
        description: "Unicamente: ID: String | Object"
    })),
    estado: t.String({
        default: "REALIZADO CON RECHAZO",
        description: "Unicamente: Estado(REALIZADO | NO REALIZADO | PENDIENTE)"
    }),
    costo: t.Number({ default: 150, description: "Unicamente: Numero - Costo de la inspeccion" }),
    fechaInspeccion: t.Optional(t.String({
        default: new Date().toISOString(),
        description: "Unicamente: Tipo Fecha"
    })),
    observacion: t.Optional(t.String({
        default: "Las distancias entre los puntos de camaras superan los 200 metros",
        description: "Unicamente: Texto"
    })),
});
export const schemaServicioEquipo = t.Object({
    id: t.Optional(t.String({
        description: "Unicamente: ID tipo string"
    })),
    id_servicio: t.Optional(t.Union([
        schemaServicio,
        t.String()
    ], {
        default: "aABradf_123",
        description: "Unicamente: ID: String | Object"
    })),
    id_equipo: t.Optional(t.Union([
        schemaEquipo,
        t.String()
    ], {
        default: "aABradf_123",
        description: "Unicamente: ID: String | Object"
    })),
    codigo: t.String({
        default: "RA-2344, TL4333",
        description: "Unicamente: codigo separados por comas los codigo de los equipos"
    }),
    cantidad: t.Number({ default: 2, description: "Unicamente: Numero - Cantidad de equipos" }),

});
const Servicio = {
    listarServicio: async function () {
        try {
            const response = await ServicioDB.findAll();
            return { data: response };
        } catch (e) {
            throw new Error('Error a listar Servico');
        }
    },
    listarServicioTipo: async function () {
        try {
            const response = await ServicioTipo.findAll();
            return { data: response };
        } catch (e) {
            throw new Error('Error a listar Tipo de Servico');
        }
    },
    listarServicioEquipo: async function () {
        try {
            const response = await ServicioEquipo.findAll();
            return { data: response };
        } catch (e) {
            throw new Error('Error a listar Tipo de Servico');
        }
    },
    listarServicioInspeccion: async function () {
        try {
            const response = await ServicioInspeccion.findAll();
            return { data: response };
        } catch (e) {
            throw new Error('Error a listar Inspección de Servico');
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
    crearServicioEquipo: async function ({ body }: any) {
        const { id_servicio, id_equipo, ...value } = body;
        let servicio, equipo;
        try {
            if (!id_servicio || id_servicio == '' || !id_equipo || id_equipo == '') throw new Error('No se puede crear por falta de id_servicio y estado');
            value.id = nanoid();
            servicio = (typeof id_servicio == 'string')
                ? await ServicioDB.findByPk(id_servicio)
                : await Servicio.crearServicio(id_servicio);
            if (!servicio) throw new Error('Error al crear o no existe el Servicio');
            equipo = (typeof id_equipo == 'string')
                ? await Equipo.findByPk(id_equipo)
                : await EquipoServicio.crearEquipo(id_equipo);
            if (!equipo) throw new Error('Error al crear o no existe el Equipo');
            const response = await ServicioEquipo.create({
                ...value,
                id_servicio: servicio.data?.id ?? servicio.id,
                id_equipo: equipo.data?.id ?? equipo.id,
            });
            return { data: response.dataValues };
        } catch (e) {
            if (e.name === 'SequelizeUniqueConstraintError') {
                throw new Error('Estado debe ser unico');
            }
            throw new Error(e.message);
        }
    },
    crearServicioInspeccion: async function ({ body }: any) {
        const { id_servicio, ...value } = body;
        let servicio;
        try {
            if (!id_servicio || id_servicio == '' || !value.estado || value.estado == '') throw new Error('No se puede crear por falta de id_servicio y estado');
            value.id = nanoid();
            servicio = (typeof id_servicio == 'string')
                ? await ServicioDB.findByPk(id_servicio)
                : await Servicio.crearServicio(id_servicio);
            if (!servicio) throw new Error('Error al crear o no existe el Servicio');

            const response = await ServicioDB.create({
                ...value,
                id_servicio: servicio.data?.id ?? servicio.id,
            });
            return { data: response.dataValues };
        } catch (e) {
            if (e.name === 'SequelizeUniqueConstraintError') {
                throw new Error('Estado debe ser unico');
            }
            throw new Error(e.message);
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
                : await ClienteServicio.crearCliente(id_cliente);
            if (!cliente) throw new Error('Error al crear o no existe el Cliente');
            tecnico = (typeof id_tecnico === 'string')
                ? await Tecnico.findByPk(id_tecnico)
                : await TecnicoServicio.crearTecnico(id_tecnico);
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
    modificarServicio: async function ({ params: { id }, body }: any) {
        if (!body || !id) throw new Error('No existe ID o body');
        const { id_servicio_tipo, id_cliente, id_tecnico, ...value } = body;
        let servicioTipo, cliente, tecnico;
        try {
            const servicio = await ServicioDB.findByPk(id);
            if (!servicio) throw new Error('No existe el Servicio');
            if (!id_servicio_tipo || !id_cliente || !id_tecnico) throw new Error("No se tiene las referencias id_servicio_tipo | id_cliente | id_tecnico");
            servicioTipo = (typeof id_servicio_tipo == 'string') && await ServicioTipo.findByPk(id_servicio_tipo)
            if (!servicioTipo) throw new Error('Error al modificar o no existe el Servicio Tipo');
            cliente = (typeof id_cliente === 'string') && await Cliente.findByPk(id_cliente);
            if (!cliente) throw new Error('Error al modificar o no existe el Tipo de servicio');
            tecnico = (typeof id_tecnico === 'string') && await Tecnico.findByPk(id_tecnico);
            if (!tecnico) throw new Error('Error al crear o no existe el Tecnico');
            const response = await servicio.update({
                ...value,
                id_servicio_tipo: servicioTipo.id,
                id_cliente: cliente.id,
                id_tecnico: tecnico.id,
            });
            return { data: response };
        } catch (e) {
            if (e.name === 'SequelizeUniqueConstraintError') {
                throw new Error('Nombre debe ser único tanto en Cliente');
            }
            throw new Error(e.message);
        }
    },
    modificarServicioEquipo: async function ({ params: { id }, body }: any) {
        if (!body || !id) throw new Error('No existe ID o body');
        const { id_servicio, id_equipo, ...value } = body;
        let servicio, equipo;
        try {
            if (id_servicio == '' || id_equipo == '') throw new Error('No se puede crear por falta de id_servicio y estado');
            const servicioEquipo = await ServicioEquipo.findByPk(id);
            if (!servicioEquipo) throw new Error('No existe el equipo');
            servicio = (typeof id_servicio == 'string') && await ServicioDB.findByPk(id_servicio)
            if (!servicio) throw new Error('Error al crear o no existe el Servicio');
            equipo = (typeof id_equipo == 'string') && await Equipo.findByPk(id_equipo);
            if (!equipo) throw new Error('Error al crear o no existe el Equipo');
            const response = await servicioEquipo.update({
                ...value,
                id_servicio: servicio.data?.id ?? servicio.id,
                id_equipo: equipo.data?.id ?? equipo.id,
            });
            return { data: response };
        } catch (e) {
            if (e.name === 'SequelizeUniqueConstraintError') {
                throw new Error('Error al modificar');
            }
            throw new Error(e.message);
        }
    },
    modificarServicioInspeccion: async function ({ params: { id }, body }: any) {
        if (!body || !id) throw new Error('No existe ID o body');
        const { id_servicio, ...value } = body;
        let servicio;
        try {
            if (id_servicio == '' || value.estado == '') throw new Error('No se puede modificar por falta de id_servicio');
            const servicioInspeccion = await ServicioInspeccion.findByPk(id);
            if (!servicioInspeccion) throw new Error('No existe la inspeccion');
            servicio = (typeof id_servicio == 'string')
                ? await ServicioDB.findByPk(id_servicio)
                : await Servicio.crearServicio(id_servicio);
            if (!servicio) throw new Error('Error al crear o no existe el Servicio');
            const response = await servicioInspeccion.update({
                ...value, id_servicio: servicio.data?.id ?? servicio.id,
            })
            return { data: response };
        } catch (e) {
            if (e.name === 'SequelizeUniqueConstraintError') {
                throw new Error('Estado debe ser unico');
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
    },
    eliminarServicioTipo: async function ({ params: { id } }: any) {
        if (!id) throw new Error('No existe ID');
        try {
            const tipo = await ServicioTipo.findByPk(id);
            if (!tipo) throw new Error('No existe el Servicio que quiere eliminar');
            await tipo.destroy();
            return { data: tipo };
        } catch (e) {

        }
    },
    eliminarServicioInspeccion: async function ({ params: { id } }: any) {
        if (!id) throw new Error('No existe ID');
        try {
            const tipo = await ServicioInspeccion.findByPk(id);
            if (!tipo) throw new Error('No existe el Servicio que quiere eliminar');
            await tipo.destroy();
            return { data: tipo };
        } catch (e) {

        }
    },
    eliminarServicioEquipo: async function ({ params: { id } }: any) {
        if (!id) throw new Error('No existe ID');
        try {
            const tipo = await ServicioEquipo.findByPk(id);
            if (!tipo) throw new Error('No existe el Servicio que quiere eliminar');
            await tipo.destroy();
            return { data: tipo };
        } catch (e) {

        }
    },
};
export default Servicio;