import { nanoid } from 'nanoid';
import { Cliente } from '../../db';
import { t } from 'elysia';
export const schemaCliente = t.Object({
    id: t.Optional(t.String({
        description: "Unicamente: ID tipo string"
    })),
    cod_cliente: t.String({
        default: "C-001",
        description: "Unicamente: Codigo cliente"
    }),
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

const Servicio = {
    listarCliente: async function () {
        try {
            const response = await Cliente.findAll({
                // attributes: ['id', 'nombre', 'apellidoPaterno', 'contacto', 'nombreCompleto', 'apellidoMaterno'], // Solo campos necesarios
                // limit: 500,
                order: [['createdAt', 'DESC']],
            }); return { data: response };
        } catch (e) {
            throw new Error(`Error al listar Cliente: ${e.message}`);
        }
    },
    crearCliente: async function ({ body }: any) {
        const { ...value } = body;
        try {
            value.id = nanoid();
            value.nombreCompleto = `${value.nombres}${value.apellidoPaterno ? ` ${value.apellidoPaterno}` : ''}${value.apellidoMaterno ? ` ${value.apellidoMaterno}` : ''}`
            const response = await Cliente.create(value);
            return { data: response.dataValues };
        } catch (e) {
            if (e.name === 'SequelizeUniqueConstraintError') {
                throw new Error('Nombre debe ser único');
            }
            throw new Error(e.message);
        }
    },
    modificarCliente: async function ({ params: { id }, body }: any) {
        const { ...value } = body;
        try {
            const cliente = await Cliente.findByPk(id);
            if (!cliente) return new Error('No se ha podido encontrar el Cliente');
            value.nombreCompleto = `${value.nombres}${value.apellidoPaterno ? ` ${value.apellidoPaterno}` : ''}${value.apellidoMaterno ? ` ${value.apellidoMaterno}` : ''}`
            const response = await cliente.update(value);
            return { data: response.dataValues };
        } catch (e) {
            throw new Error(`Error al modificar Cliente: ${e.message}`);
        }
    },
    eliminarCliente: async function ({ params: { id } }: any) {
        if (!id) throw new Error('No eiste ID');
        try {
            const cliente = await Cliente.findByPk(id);
            if (!cliente) throw new Error('No existe el cliente');
            await cliente.destroy();
            return { data: cliente };
        } catch (e) {
            throw new Error(`Error al eliminar Cliente: ${e.message}`);
        }
    }
}
export default Servicio;