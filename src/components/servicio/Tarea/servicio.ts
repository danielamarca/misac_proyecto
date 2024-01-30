import { Tarea, TareaFoto, Servicio as ServicioDB, sequelize } from '../../../db';
import { nanoid } from 'nanoid';
import { t } from 'elysia';
import ServicioServicio, { schemaServicio } from '../Servicio/servicio';

export const schemaTarea = t.Object({
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
    descripcion: t.Optional(t.String({
        default: "Cableado externo",
        description: "Unicamente: Texto"
    })),
    comentarios: t.Optional(t.String({
        default: "Cableado externo",
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
});
export const schemaTareaFoto = t.Object({
    id: t.Optional(t.String({
        description: "Unicamente: ID tipo string"
    })),
    id_tarea: t.Optional(t.Union([
        schemaTarea,
        t.String()
    ], {
        default: "RSdst34as",
        description: "Unicamente: ID: String | Object"
    })),
    archivoUrl: t.String({
        default: "asdfasdfasdgfasdddsd",
        description: "Unicamente: Archivo BLOB"
    }),
    formato: t.Optional(t.String({
        default: "PNG",
        description: "Unicamente: Tipo de archivo"
    })),
    descripcion: t.Optional(t.String({
        default: "CAPTURA EXTERNA",
        description: "Unicamente: Descripcion de la foto"
    })),
});

const Servicio = {
    listarTarea: async function () {
        try {
            const response = await Tarea.findAll();
            return { data: response };
        } catch (e) {
            throw new Error('Error a listar Tarea');
        }
    },
    listarTareaFoto: async function () {
        try {
            const response = await TareaFoto.findAll();
            return { data: response };
        } catch (e) {
            throw new Error('Error a listar Tipo de Servico');
        }
    },
    crearTarea: async function ({ body }: any) {
        const { id_servicio, ...value } = body;
        let servicio;
        try {
            if (!id_servicio || id_servicio == '') throw new Error('No se puede crear por falta de id_servicio y estado');
            value.id = nanoid();
            servicio = (typeof id_servicio == 'string')
                ? await ServicioDB.findByPk(id_servicio)
                : await ServicioServicio.crearServicio(id_servicio);
            if (!servicio) throw new Error('Error al crear o no existe el Servicio');
            const response = await Tarea.create({
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
    crearTareaFoto: async function ({ body }: any) {
        const { id_tarea, ...value } = body;
        let tarea;
        return await sequelize.transaction(async t => {
            try {
                value.id = nanoid();
                if (!id_tarea) throw new Error('No existe id_tarea');
                tarea = (typeof id_tarea === 'string')
                    ? await Tarea.findByPk(id_tarea, { transaction: t })
                    : await Servicio.crearTarea({ body });
                if (!tarea) throw new Error('equipo no encontrado');
                const response = await TareaFoto.create({
                    ...value, id_tarea: tarea.data?.id ?? tarea.id,
                }, { transaction: t });
                return { data: response.dataValues };
            } catch (e) {
                if (e.name === 'SequelizeUniqueConstraintError') {
                    throw new Error('Nombre debe ser único tanto en Tarea o Foto');
                }
                throw new Error(e.message);
            }
        }).catch(e => {
            throw new Error(`${e.message}`);
        });
    },
    modificarTarea: async function ({ body }: any) {
        const { id_servicio, ...value } = body;
        let servicio;
        try {
            if (!id_servicio || id_servicio == '') throw new Error('No se puede crear por falta de id_servicio');
            value.id = nanoid();
            servicio = (typeof id_servicio == 'string')
                ? await ServicioDB.findByPk(id_servicio)
                : await ServicioServicio.crearServicio(id_servicio);
            if (!servicio) throw new Error('Error al crear o no existe el Servicio');
            const response = await Tarea.create({
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
    modificarTareaFoto: async function ({ params: { id }, body }: any) {
        if (!body || !id) throw new Error('No existe ID o body');
        const { id_tarea, ...value } = body;
        let tarea;
        try {
            const tareaFoto = await TareaFoto.findByPk(id);
            if (!tareaFoto) throw new Error('No existe el Servicio');
            if (!id_tarea) throw new Error("No se tiene las referencias id_tarea");
            tarea = (typeof id_tarea == 'string') && await Tarea.findByPk(id_tarea)
            if (!tarea) throw new Error('Error al modificar o no existe el Servicio Tipo');
            const response = await tareaFoto.update({
                ...value,
                id_tarea: tarea.id,
            });
            return { data: response };
        } catch (e) {
            if (e.name === 'SequelizeUniqueConstraintError') {
                throw new Error('Nombre debe ser único tanto en Cliente');
            }
            throw new Error(e.message);
        }
    },
    eliminarTarea: async function ({ params: { id } }: any) {
        if (!id) throw new Error('No existe ID');
        try {
            const servicio = await Tarea.findByPk(id);
            if (!servicio) throw new Error('No existe el Servicio que quiere eliminar');
            await servicio.destroy();
            return { data: servicio };
        } catch (e) {

        }
    },
    eliminarTareaFoto: async function ({ params: { id } }: any) {
        if (!id) throw new Error('No existe ID');
        try {
            const tipo = await TareaFoto.findByPk(id);
            if (!tipo) throw new Error('No existe el Servicio que quiere eliminar');
            await tipo.destroy();
            return { data: tipo };
        } catch (e) {

        }
    },
};
export default Servicio;