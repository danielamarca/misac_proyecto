import { nanoid } from 'nanoid';
import { Empleado, Tecnico } from '../../db';
import { t } from 'elysia';
export const schemaEmpleado = t.Object({
    id: t.Optional(t.String({
        description: "Unicamente: ID tipo string"
    })),
    rol: t.String({
        default: "GERENTE",
        description: "Unicamente: Rol"
    }),
    salario: t.Optional(t.Number({
        default: 2100,
        description: "Unicamente: Salario en [Bs]"
    })),
    nombres: t.String({
        default: "PABLO",
        description: "Unicamente: Nombres"
    }),
    apellidoPaterno: t.Optional(t.String({
        default: "BUENO",
        description: "Unicamente: Apellido Paterno"
    })),
    apellidoMaterno: t.Optional(t.String({
        default: "MAMANI",
        description: "Unicamente: Apellido Materno"
    })),
    ci: t.Optional(t.String({
        default: "7278801 OR",
        description: "Unicamente: C.I."
    })),
    direccion: t.Optional(t.String({
        default: "ORURO, CALLE 7 ENTRE H Y Q",
        description: "Unicamente: Texto"
    })),
    telefono: t.Optional(t.String({
        default: "76144824",
        description: "Unicamente: Telefono"
    })),
    correo: t.Optional(t.String({
        default: "pablo123bueno@gmail.com",
        description: "Unicamente: Telefono"
    })),
});
export const schemaTecnico = t.Object({
    id: t.Optional(t.String({
        description: "Unicamente: ID tipo string"
    })),
    id_empleado: t.Union([
        t.String(),
        schemaEmpleado,
    ], {
        default: {
            rol: "GERENTE",
            salario: 2500,
            nombres: "JULIO",
        },
        description: "Unicamente: id_empleado: String | Object"
    }),
    especialidad: t.String({
        default: "INSTALADOR",
        description: "INSTALACION DE CAMARAS"
    })
});
const Servicio = {
    listarEmpleado: async function () {
        try {
            const response = await Empleado.findAll({
                order: [['createdAt', 'DESC']],
            });
            return { data: response };
        } catch (e) {
            throw new Error('Error al listar Cliente');
        }
    },
    listarTecnico: async function () {
        try {
            const response = await Tecnico.findAll({
                order: [['createdAt', 'DESC']],
            });
            return { data: response };
        } catch (e) {
            throw new Error('Error al listar Tecnico');
        }
    },
    crearEmpleado: async function ({ body }) {
        const { ...value } = body;
        try {
            value.id = nanoid();
            value.nombreCompleto = `${value.nombres}${value.apellidoPaterno ? ` ${value.apellidoPaterno}` : ''}${value.apellidoMaterno ? ` ${value.apellidoMaterno}` : ''}`;
            const response = await Empleado.create(value);
            return { data: response.dataValues };
        } catch (e) {
            if (e.name === 'SequelizeUniqueConstraintError') {
                throw new Error('Nombre debe ser único');
            }
            throw new Error(e.message);
        }
    },
    crearTecnico: async function ({ body }) {
        const { id_empleado, ...value } = body;
        let empleado;
        try {
            value.id = nanoid();
            if (!id_empleado) throw new Error('No existe Empleado');
            empleado = (typeof id_empleado === 'string')
                ? await Empleado.findByPk(id_empleado)
                : await Servicio.crearEmpleado({ body: id_empleado });
            if (!empleado) throw new Error('Error al crear Empleado');
            const response = await Tecnico.create({ ...value, id_empleado: empleado.id ?? empleado.data?.id });
            return { data: response.dataValues };
        } catch (e) {
            throw new Error(`Error al crear Tecnico ${e.message}`);
        }
    },
    modificarEmpleado: async function ({ params: { id }, body }) {
        if (!body || !id) throw new Error('No existe ID o body');
        const { ...value } = body;
        try {
            const empleado = await Empleado.findByPk(id);
            if (!empleado) throw new Error('No existe el empleado');
            value.nombreCompleto = `${value.nombres}${value.apellidoPaterno ? ` ${value.apellidoPaterno}` : ''}${value.apellidoMaterno ? ` ${value.apellidoMaterno}` : ''}`;
            const response = await empleado.update(value);
            return { data: response };
        } catch (e) {
            if (e.name === 'SequelizeUniqueConstraintError') {
                throw new Error('Nombre debe ser único');
            }
            throw new Error(e.message);
        }
    },
    modificarTecnico: async function ({ params: { id }, body }) {
        if (!body || !id) throw new Error('No existe ID o body');
        const { ...value } = body;
        try {
            const tecnico = await Tecnico.findByPk(id);
            if (!tecnico) throw new Error('No existe el tecnico');
            if (value.id_empeado) {
                const empleado = await Empleado.findByPk(value.id_empleado);
                if (!empleado) throw new Error('No existe el empleado');
            }
            const response = await tecnico.update(value);
            return { data: response.dataValues };
        } catch (e) {
            if (e.name === 'SequelizeUniqueConstraintError') {
                throw new Error('Nombre debe ser único');
            }
            throw new Error(e.message);
        }
    },
    eliminarEmpleado: async function ({ params: { id } }) {
        if (!id) throw new Error('Id no encontrado');
        try {
            const empleado = await Empleado.findByPk(id);
            if (!empleado) throw new Error('Empleado no encontrado');
            await empleado.destroy();
            return { data: empleado };
        } catch (e) {
            throw new Error(`Error al eliminar empleado: ${e.message}`);
        }
    },
    eliminarTecnico: async function ({ params: { id } }) {
        if (!id) throw new Error('Id no encontrado');
        try {
            const tecnico = await Tecnico.findByPk(id);
            if (!tecnico) throw new Error('Tecnico no encontrado');
            await tecnico.destroy();
            return { data: tecnico };
        } catch (e) {
            throw new Error(`Error al eliminar tecnico: ${e.message}`);
        }
    },
};
export default Servicio;