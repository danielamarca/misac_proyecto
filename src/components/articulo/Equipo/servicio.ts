import { t } from 'elysia';
import { sequelize, Equipo, Proveedor, EquipoCategoria, EquipoCodigo, EquipoFoto } from '../../../db';
import { nanoid } from 'nanoid';

export const schemaEquipoCategoria = t.Object({
    id: t.Optional(t.String({
        description: "Unicamente: ID tipo string"
    })),
    nombre: t.String({
        default: "CAMARAS ANALOGICAS",
        description: "Unicamente: Nombre"
    }),
    descripcion: t.Optional(t.String({
        default: "CAMARAS ANALOGICAS",
        description: "Unicamente: Texto"
    })),
});
export const schemaProveedor = t.Object({
    id: t.Optional(t.String({
        description: "Unicamente: ID tipo string"
    })),
    nombre: t.String({
        default: "DIGICORP",
        description: "Unicamente: Nombre"
    }),
    descripcion: t.Optional(t.String({
        default: "VENTA DE EQUIPOS Y ACCESORIOS DE VIDEOVIGILANCIA",
        description: "Unicamente: Texto"
    })),
    direccion: t.Optional(t.String({
        default: "ORURO, CALLE 7 ENTRE H Y Q",
        description: "Unicamente: Texto"
    })),
    contacto: t.Optional(t.String({
        default: "76144824",
        description: "Unicamente: Telefono"
    })),
});
export const schemaEquipo = t.Object({
    id: t.Optional(t.String({
        description: "Unicamente: ID tipo string"
    })),
    id_proveedor: t.Optional(t.Union([
        schemaProveedor,
        t.String()
    ], {
        default: { nombre: "DIGICORP", descripcion: "VENTA DE EQUIPOS Y ACCESORIOS DE VIDEOVIGILANCIA" },
        description: "Unicamente: ID: String | Object"
    })),
    id_equipo_categoria: t.Optional(t.Union([
        schemaEquipoCategoria,
        t.String()
    ], {
        default: { nombre: "CAMARAS", descripcion: "CAMARAS ANALOGICAS" },
        description: "Unicamente: ID: String | Object"
    })),
    nombre: t.Optional(t.String({
        default: "DAHUA_DOMO_360",
        description: "Unicamente: Nombre"
    })),
    descripcion: t.Optional(t.String({
        default: "COLOR: AZUL, RESOLUCION: 2MP",
        description: "Unicamente: Texto"
    })),
    precio: t.Number({
        default: 20.5,
        description: "Unicamente: En [Bs] Bolivianos"
    }),
    stock: t.Number({
        default: 5,
        description: "Unicamente: En Enteros"
    }),
});

export const schemaEquipoCodigo = t.Object({
    id: t.Optional(t.String({
        description: "Unicamente: ID tipo string"
    })),
    id_equipo: t.Optional(t.Union([
        schemaEquipo,
        t.String()
    ], {
        default: "RSdst34as",
        description: "Unicamente: ID: String | Object"
    })),
    codigo: t.Optional(t.String({
        default: "XR-0034444",
        description: "Unicamente: Texto"
    })),
    estado: t.Optional(t.String({
        default: "NUEVO",
        description: "Unicamente: Texto"
    })),
    id_venta: t.Optional(t.String({
        default: "asdVdsd43",
        description: "Unicamente: id_venta"
    })),
    id_servicio: t.Optional(t.String({
        default: "asdVdsd43",
        description: "Unicamente: id_servicio"
    })),
});

export const schemaEquipoFoto = t.Object({
    id: t.Optional(t.String({
        description: "Unicamente: ID tipo string"
    })),
    id_equipo: t.Optional(t.Union([
        schemaEquipo,
        t.String()
    ], {
        default: "RSdst34as",
        description: "Unicamente: ID: String | Object"
    })),
    archivo: t.String({
        default: "asdfasdfasdgfasdddsd",
        description: "Unicamente: Archivo BLOB"
    }),
    formato: t.Optional(t.String({
        default: "PNG",
        description: "Unicamente: Tipo de archivo"
    })),
    descripcion: t.Optional(t.String({
        default: "Foto de fabrica",
        description: "Unicamente: Descripcion de la foto"
    })),
});

const Servicio = {
    listarEquipo: async function () {
        try {
            const response = await Equipo.findAll({
                order: [['nombre', 'ASC']]
            });
            return { data: response };
        } catch (e) {
            throw new Error('Error al listar Equipos')
        }
    },
    listarEquipoCategoria: async function () {
        try {
            const response = await EquipoCategoria.findAll({
                order: [['nombre', 'ASC']]
            });
            return { data: response };
        } catch (e) {
            throw new Error('Error al listar Equipos')
        }
    },
    listarEquipoCodigo: async function () {
        try {
            const response = await EquipoCodigo.findAll();
            return { data: response };
        } catch (e) {
            throw new Error('Error al listar Equipo codigo');
        }
    },
    listarProveedor: async function () {
        try {
            const response = await Proveedor.findAll({
                order: [['nombre', 'ASC']]
            });
            return { data: response };
        } catch (e) {
            throw new Error('Error al listar Equipos')
        }
    },
    listarEquipoDetalles: async function () {
        try {
            const response = await Equipo.findAll({
                include: [
                    {
                        model: Proveedor,
                        as: 'proveedors' // Este 'as' debe coincidir con cómo definiste la asociación
                    },
                    {
                        model: EquipoCategoria,
                        as: 'equipoCategorias' // Este 'as' debe coincidir con cómo definiste la asociación
                    }
                ],
                order: [['nombre', 'ASC']]
            });
            return { data: response };
        } catch (e) {
            console.log(e)
            throw new Error('Error al listar Equipos');
        }
    },
    listarProveedorEquipos: async function () {
        try {
            const response = await Proveedor.findAll({
                include: [
                    {
                        model: Equipo,
                        as: 'equipos'
                    },
                ],
                order: [['createdAt', 'DESC']]
            });
            return { data: response };
        } catch (e) {
            console.log(e)
            throw new Error('Error al listar Equipos');
        }
    },
    listarEquipoCategoriaEquipos: async function () {
        try {
            const response = await EquipoCategoria.findAll({
                include: [
                    {
                        model: Equipo,
                        as: 'equipos'
                    },
                ],
                order: [['createdAt', 'DESC']]
            });
            return { data: response };
        } catch (e) {
            console.log(e)
            throw new Error('Error al listar Equipos');
        }
    },
    listaEquipoFoto: async function () {
        try {
            const response = await EquipoFoto.findAll();
            return { data: response };
        } catch (e) {
            throw new Error('Error al listar Equipo Foto');
        }
    },
    crearEquipo: async function ({ body }: any) {
        const { id_proveedor, id_equipo_categoria, ...value } = body;
        let proveedor, categoria;
        return await sequelize.transaction(async t => {
            try {
                value.id = nanoid();
                if (!id_proveedor) throw new Error('No existe id_proveedor');
                proveedor = (typeof id_proveedor === 'string')
                    ? await Proveedor.findByPk(id_proveedor, { transaction: t })
                    : await Proveedor.create({ id: nanoid(), ...id_proveedor }, { transaction: t })
                if (!proveedor) throw new Error('proveedor no encontrado');
                if (!id_equipo_categoria) throw new Error('No existe id_equipo_categoria');
                categoria = (typeof id_equipo_categoria === 'string')
                    ? await EquipoCategoria.findByPk(id_equipo_categoria, { transaction: t })
                    : await EquipoCategoria.create({ id: nanoid(), ...id_equipo_categoria }, { transaction: t })
                if (!categoria) throw new Error('categoria no encontrado');
                const response = await Equipo.create({ ...value, id_proveedor: proveedor.dataValues.id, id_equipo_categoria: categoria.dataValues.id }, { transaction: t });
                return { data: response.dataValues };
            } catch (e) {
                if (e.name === 'SequelizeUniqueConstraintError') {
                    throw new Error('Nombre debe ser único tanto en Proveedor y Categoria');
                }
                throw new Error(e.message);
            }
        }).catch(e => {
            throw new Error(`${e.message}`);
        });
    },
    crearEquipoCodigo: async function ({ body }: any) {
        const { id_equipo, ...value } = body;
        let equipo;
        return await sequelize.transaction(async t => {
            try {
                value.id = nanoid();
                if (!id_equipo) throw new Error('No existe id_equipo');
                equipo = (typeof id_equipo === 'string')
                    ? await Equipo.findByPk(id_equipo, { transaction: t })
                    : await this.crearEquipo({ body });
                if (!equipo) throw new Error('equipo no encontrado');
                const response = await EquipoCodigo.create({ ...value, id_equipo: equipo.dataValues.id }, { transaction: t });
                return { data: response.dataValues };
            } catch (e) {
                if (e.name === 'SequelizeUniqueConstraintError') {
                    throw new Error('Nombre debe ser único tanto en Equipo o codigo');
                }
                throw new Error(e.message);
            }
        }).catch(e => {
            throw new Error(`${e.message}`);
        });
    },
    crearProveedor: async function ({ body }: any) {
        const value = { ...body, id: nanoid() };
        try {
            const response = await Proveedor.create(value);
            return { data: response.dataValues };
        } catch (e) {
            if (e.name === 'SequelizeUniqueConstraintError') {
                throw new Error('Nombre debe ser único');
            }
            throw new Error(e.message);
        }
    },
    crearEquipoCategoria: async function ({ body }: any) {
        const value = { ...body, id: nanoid() };
        try {
            const response = await EquipoCategoria.create(value);
            return { data: response.dataValues };
        } catch (e) {
            if (e.name === 'SequelizeUniqueConstraintError') {
                throw new Error('Nombre debe ser único');
            }
            throw new Error(e.message);
        }
    },
    crearEquipoFoto: async function ({ body }: any) {
        const { id_equipo, ...value } = body;
        let equipo;
        return await sequelize.transaction(async t => {
            try {
                value.id = nanoid();
                if (!id_equipo) throw new Error('No existe id_equipo');
                equipo = (typeof id_equipo === 'string')
                    ? await Equipo.findByPk(id_equipo, { transaction: t })
                    : await this.crearEquipo({ body });
                if (!equipo) throw new Error('equipo no encontrado');
                const response = await EquipoFoto.create({ ...value, id_equipo: equipo.dataValues.id }, { transaction: t });
                return { data: response.dataValues };
            } catch (e) {
                if (e.name === 'SequelizeUniqueConstraintError') {
                    throw new Error('Nombre debe ser único tanto en Equipo o Foto');
                }
                throw new Error(e.message);
            }
        }).catch(e => {
            throw new Error(`${e.message}`);
        });
    },
    modificarEquipo: async function ({ params: { id }, body }) {
        if (!body || !id) throw new Error('No existe ID o body');
        return await sequelize.transaction(async (t) => {
            try {
                const equipo = await Equipo.findByPk(id, { transaction: t });
                if (!equipo) throw new Error('Equipo no encontrado.');
                if (body.id_proveedor) {
                    const proveedor = await Proveedor.findByPk(body.id_proveedor, { transaction: t });
                    if (!proveedor) throw new Error('Proveedor no encontrado.');
                }
                if (body.id_equipo_categoria) {
                    const rude = await EquipoCategoria.findByPk(body.id_equipo_categoria, { transaction: t });
                    if (!rude) throw new Error('Categoria no encontrado.');
                }
                await equipo.update(body, { transaction: t });
                return { data: equipo };
            } catch (e) {
                throw new Error(`Error al modificar Equipo: ${e.message}`);
            }
        });
    },
    modificarProveedor: async function ({ params: { id }, body }) {
        if (!body || !id) throw new Error('No existe ID o body');
        try {
            const proveedor = await Proveedor.findByPk(id);
            if (!proveedor) throw new Error('No existe el proveedor');
            const response = await proveedor.update(body);
            return { data: response };
        } catch (e) {
            throw new Error(`Error al modificar Proveedor: ${e.message}`);
        }
    },
    modificarEquipoCategoria: async function ({ params: { id }, body }) {
        if (!body || !id) throw new Error('No existe ID o body');
        try {
            const categoria = await EquipoCategoria.findByPk(id);
            if (!categoria) throw new Error('No existe la categoria');
            if (body.id_equipo) {
                const equipo = await Proveedor.findByPk(body.id_equipo);
                if (!equipo) throw new Error('Proveedor no encontrado.');
            }
            const response = await categoria.update(body);
            return { data: response };
        } catch (e) {
            throw new Error(`Error al modificar Categoria: ${e.message}`);
        }
    },
    modificarEquipoCodigo: async function ({ params: { id }, body }) {
        if (!body || !id) throw new Error('No existe ID o body');
        try {
            const equipoCodigo = await EquipoCodigo.findByPk(id);
            if (!equipoCodigo) throw new Error('No existe el equipo codigo');
            const response = await equipoCodigo.update(body);
            return { data: response };
        } catch (e) {
            throw new Error(`Error al modificar el Equipo Codigo: ${e.message}`);
        }
    },
    modificarEquipoFoto: async function ({ params: { id }, body }) {
        if (!body || !id) throw new Error('No existe ID o body');
        try {
            const equipoFoto = await EquipoFoto.findByPk(id);
            if (!equipoFoto) throw new Error('No existe el equipo foto');
            const response = await equipoFoto.update(body);
            return { data: response };
        } catch (e) {
            throw new Error(`Error al modificar el Equipo Foto: ${e.message}`);
        }
    },
    eliminarEquipo: async function ({ params: { id } }) {
        if (!id) throw new Error('Id no encontrado');
        return await sequelize.transaction(async (t) => {
            try {
                const equipo = await Equipo.findByPk(id);
                if (!equipo) throw new Error('Equipo no encontrado');
                await equipo.destroy();
                return { data: equipo };
            } catch (e) {
                throw new Error(`Error al eliminar equipo: ${e.message}`);
            }
        });
    },
    eliminarProveedor: async function ({ params: { id } }) {
        if (!id) throw new Error('Id no encontrado');
        return await sequelize.transaction(async (t) => {
            try {
                const proveedor = await Proveedor.findByPk(id);
                if (!proveedor) throw new Error('Proveedor no encontrado');
                await proveedor.destroy();
                return { data: proveedor };
            } catch (e) {
                throw new Error(`Error al eliminar proveedor: ${e.message}`);
            }
        });
    },
    eliminarEquipoCategoria: async function ({ params: { id } }) {
        if (!id) throw new Error('Id no encontrado');
        return await sequelize.transaction(async (t) => {
            try {
                const categoria = await EquipoCategoria.findByPk(id);
                if (!categoria) throw new Error('Categoria no encontrado');
                await categoria.destroy();
                return { data: categoria };
            } catch (e) {
                throw new Error(`Error al eliminar categoria: ${e.message}`);
            }
        });
    },
    eliminarEquipoCodigo: async function ({ params: { id } }) {
        if (!id) throw new Error('Id no encontrado');
        return await sequelize.transaction(async (t) => {
            try {
                const equipoCodigo = await EquipoCodigo.findByPk(id);
                if (!equipoCodigo) throw new Error('Equipo Codigo no encontrado');
                await equipoCodigo.destroy();
                return { data: equipoCodigo };
            } catch (e) {
                throw new Error(`Error al eliminar codigo de equipo: ${e.message}`);
            }
        });
    },
    eliminarEquipoFoto: async function ({ params: { id } }) {
        if (!id) throw new Error('Id no encontrado');
        return await sequelize.transaction(async (t) => {
            try {
                const equipoFoto = await EquipoFoto.findByPk(id);
                if (!equipoFoto) throw new Error('Equipo Foto no encontrado');
                await equipoFoto.destroy();
                return { data: equipoFoto };
            } catch (e) {
                throw new Error(`Error al eliminar foto de equipo: ${e.message}`);
            }
        });
    },
};

export default Servicio;