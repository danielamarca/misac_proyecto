import { nanoid } from 'nanoid';
import { Elysia, t } from 'elysia';
import { Empleado, Usuario, sequelize } from '../db';
import ServicioEmpleado, { schemaEmpleado } from '../components/empleado/servicio';
import * as bcrypt from 'bcryptjs';
export const schemaUsuario = t.Object({
    id: t.Optional(t.String({
        description: "Unicamente: ID de usuario"
    })),
    username: t.String({
        default: 'daniel',
        description: "Unicamente: Usuario y debe ser unico"
    }),
    password: t.String({
        default: "daniel",
        description: "Debe contener (mayusculas, minusculas, numeros, caracteres especiales)"
    }),
    privilegio: t.Optional(t.Number(
        {
            default: 1,
            description: "Unicamente; Numero que refleja el nivel de accesibilidad al sistema y a las caracteristicas"
        }
    )),
    id_empleado: t.Union([
        t.String(),
        schemaEmpleado
    ], {
        default: {
            rol: "GERENTE",
            nombres: "PABLO",
            apellidoPaterno: "BUENO",
            ci: "723004333",
            direccion: "ZONA CENTRAL, MERCADO CAMPERO",
            telefono: "76144825",
            correo: "Dan123@gmail.com",
        },
        description: "Unicamente: String | Object"
    })
});
const Servicio = {
    listarUsuario: async function () {
        try {
            const response = await Usuario.findAll();
            return { data: response };
        } catch (e) {
            throw new Error('Error al listar Usuario');
        }
    },
    crearUsuario: async function ({ body }: any) {
        const { id_empleado, ...value } = body || {};
        let empleado;
        try {
            if (!id_empleado) throw new Error("No se asigno ningun empleado");
            empleado = (typeof id_empleado === 'string')
                ? await Empleado.findByPk(id_empleado)
                : await ServicioEmpleado.crearEmpleado({ body: id_empleado });
            if (!empleado) throw new Error('No se puede crear o encontrar Empleado');
            value.id = nanoid();
            value.password = await bcrypt.hash(value.password, 5);
            const usuario = await Usuario.create({ ...value, id_empleado: empleado?.id ?? empleado.data?.id });
            return { data: usuario.dataValues };
        } catch (e) {
            if (e.name === "SequelizeUniqueConstraintError") {
                throw new Error('En Usuario debe ser unico');
            }
            console.error(e);
            throw new Error(e);
        }
    },
    // modificarUsuario: async function ({ params: { id }, body }) {
    //     if (!id || !body) throw new Error('No existe el ID o el Body');
    //     try {
    //         const
    //     } catch (e) {
    //         if (e.name === "SequelizeUniqueConstraintError") {
    //             throw new Error('En Usuario debe ser unico');
    //         }
    //         throw new Error('Ocurrio un Error al crear el usuario');
    //     }
    // }
}
const Controlador = new Elysia()
    .onError(({ code, error, set }) => {
        if (code) {
            set.status = 400;
            return {
                error: {
                    message: error.message
                }
            }
        }
    });
Controlador.get('/', Servicio.listarUsuario);
Controlador.post('/', Servicio.crearUsuario, { body: schemaUsuario });
export default Controlador;

