import { create } from "domain";
import { DATE, DataTypes, Sequelize } from "sequelize";
const dbUser = process.env.dbUser || 'root';
const dbUserPass = process.env.dbUserPass || 'root';
const dbName = process.env.dbName || 'proyecto1';
export const sequelize = new Sequelize(
    `mysql://${dbUser}:${dbUserPass}@localhost:3306/${dbName}`,
    // `mysql://root:1b-4C1Gd4feHaBCGaa1bAebf3bcE2gfB@roundhouse.proxy.rlwy.net:46556/railway`,
    {
        logging: false,
        pool: {
            max: 10,
            min: 0,
        },
    },
);
await sequelize.authenticate();
export const sync = sequelize.define('sync', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tabla: DataTypes.STRING,
    action: DataTypes.STRING,
    id_tabla: DataTypes.STRING
});
sync.addHook('afterCreate', async (syncInstance, options) => {
    // Lógica antes de crear un registro en la tabla sync
    console.log('Antes de crear un registro en la tabla sync:', syncInstance.dataValues);
});

export const Cliente = sequelize.define("cliente", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    cod_cliente: DataTypes.STRING,
    nombres: DataTypes.STRING,
    apellidoPaterno: DataTypes.STRING,
    apellidoMaterno: DataTypes.STRING,
    nombreCompleto: {
        type: DataTypes.STRING,
        unique: true,
    },
    ci: DataTypes.STRING,
    direccion: DataTypes.STRING,
    telefono: DataTypes.STRING,
    correo: DataTypes.STRING
});
Cliente.addHook('afterCreate', async (clienteInstance) => { await sync.create({ tabla: 'Cliente', action: 'create', id_tabla: clienteInstance.dataValues.id }); });
Cliente.addHook('afterUpdate', async (clienteInstance) => { await sync.create({ tabla: 'Cliente', action: 'update', id_tabla: clienteInstance.dataValues.id }); });
Cliente.addHook('afterDestroy', async (clienteInstance) => { await sync.create({ tabla: 'Cliente', action: 'delete', id_tabla: clienteInstance.dataValues.id }); });

export const Empleado = sequelize.define("empleado", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    rol: DataTypes.STRING,
    salario: DataTypes.FLOAT,
    nombres: DataTypes.STRING,
    apellidoPaterno: DataTypes.STRING,
    apellidoMaterno: DataTypes.STRING,
    nombreCompleto: {
        type: DataTypes.STRING,
        unique: true,
    },
    ci: DataTypes.STRING,
    direccion: DataTypes.STRING,
    telefono: DataTypes.STRING,
    correo: DataTypes.STRING
});
Empleado.addHook('afterCreate', async (clienteInstance) => { await sync.create({ tabla: 'Empleado', action: 'create', id_tabla: clienteInstance.dataValues.id }); });
Empleado.addHook('afterUpdate', async (clienteInstance) => { await sync.create({ tabla: 'Empleado', action: 'update', id_tabla: clienteInstance.dataValues.id }); });
Empleado.addHook('afterDestroy', async (clienteInstance) => { await sync.create({ tabla: 'Empleado', action: 'delete', id_tabla: clienteInstance.dataValues.id }); });

export const Tecnico = sequelize.define("empleadoTecnico", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    id_empleado: {
        type: DataTypes.STRING,
        references: {
            model: Empleado,
            key: 'id'
        }
    },
    especialidad: DataTypes.STRING
});
Tecnico.addHook('afterCreate', async (clienteInstance) => { await sync.create({ tabla: 'Tecnico', action: 'create', id_tabla: clienteInstance.dataValues.id }); });
Tecnico.addHook('afterUpdate', async (clienteInstance) => { await sync.create({ tabla: 'Tecnico', action: 'update', id_tabla: clienteInstance.dataValues.id }); });
Tecnico.addHook('afterDestroy', async (clienteInstance) => { await sync.create({ tabla: 'Tecnico', action: 'delete', id_tabla: clienteInstance.dataValues.id }); });

export const Usuario = sequelize.define("usuario", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    id_empleado: {
        type: DataTypes.STRING,
        references: {
            model: Empleado,
            key: 'id',
        }
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
    },
    privilegio: DataTypes.INTEGER,
    password: DataTypes.STRING,

});
Usuario.addHook('afterCreate', async (clienteInstance) => { await sync.create({ tabla: 'Usuario', action: 'create', id_tabla: clienteInstance.dataValues.id }); });
Usuario.addHook('afterUpdate', async (clienteInstance) => { await sync.create({ tabla: 'Usuario', action: 'update', id_tabla: clienteInstance.dataValues.id }); });
Usuario.addHook('afterDestroy', async (clienteInstance) => { await sync.create({ tabla: 'Usuario', action: 'delete', id_tabla: clienteInstance.dataValues.id }); });

export const Proveedor = sequelize.define("proveedor", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
        unique: true
    },
    descripcion: DataTypes.STRING,
    direccion: DataTypes.STRING,
    contacto: DataTypes.STRING,
});
Proveedor.addHook('afterCreate', async (clienteInstance) => { await sync.create({ tabla: 'Proveedor', action: 'create', id_tabla: clienteInstance.dataValues.id }); });
Proveedor.addHook('afterUpdate', async (clienteInstance) => { await sync.create({ tabla: 'Proveedor', action: 'update', id_tabla: clienteInstance.dataValues.id }); });
Proveedor.addHook('afterDestroy', async (clienteInstance) => { await sync.create({ tabla: 'Proveedor', action: 'delete', id_tabla: clienteInstance.dataValues.id }); });

export const EquipoCategoria = sequelize.define('equipoCategoria', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
        unique: true
    },
    descripcion: DataTypes.STRING,
});
EquipoCategoria.addHook('afterCreate', async (clienteInstance) => { await sync.create({ tabla: 'EquipoCategoria', action: 'create', id_tabla: clienteInstance.dataValues.id }); });
EquipoCategoria.addHook('afterUpdate', async (clienteInstance) => { await sync.create({ tabla: 'EquipoCategoria', action: 'update', id_tabla: clienteInstance.dataValues.id }); });
EquipoCategoria.addHook('afterDestroy', async (clienteInstance) => { await sync.create({ tabla: 'EquipoCategoria', action: 'delete', id_tabla: clienteInstance.dataValues.id }); });

export const Equipo = sequelize.define("equipo", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    id_proveedor: {
        type: DataTypes.STRING,
        references: {
            model: Proveedor,
            key: "id"
        }
    },
    id_equipo_categoria: {
        type: DataTypes.STRING,
        references: {
            model: EquipoCategoria,
            key: "id"
        }
    },
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    precio: DataTypes.FLOAT,
    stock: DataTypes.INTEGER,
});
Equipo.addHook('afterCreate', async (clienteInstance) => { await sync.create({ tabla: 'Equipo', action: 'create', id_tabla: clienteInstance.dataValues.id }); });
Equipo.addHook('afterUpdate', async (clienteInstance) => { await sync.create({ tabla: 'Equipo', action: 'update', id_tabla: clienteInstance.dataValues.id }); });
Equipo.addHook('afterDestroy', async (clienteInstance) => { await sync.create({ tabla: 'Equipo', action: 'delete', id_tabla: clienteInstance.dataValues.id }); });

export const EquipoCodigo = sequelize.define("equipoCodigo", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    id_equipo: {
        type: DataTypes.STRING,
        references: {
            model: Equipo,
            key: 'id'
        }
    },
    id_servicio: DataTypes.STRING,
    id_venta: DataTypes.STRING,
    codigo: DataTypes.STRING,
    estado: DataTypes.STRING,
});
EquipoCodigo.addHook('afterCreate', async (clienteInstance) => { await sync.create({ tabla: 'EquipoCodigo', action: 'create', id_tabla: clienteInstance.dataValues.id }); });
EquipoCodigo.addHook('afterUpdate', async (clienteInstance) => { await sync.create({ tabla: 'EquipoCodigo', action: 'update', id_tabla: clienteInstance.dataValues.id }); });
EquipoCodigo.addHook('afterDestroy', async (clienteInstance) => { await sync.create({ tabla: 'EquipoCodigo', action: 'delete', id_tabla: clienteInstance.dataValues.id }); });

export const EquipoFoto = sequelize.define("equipoFoto", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    id_equipo: {
        type: DataTypes.STRING,
        references: {
            model: Equipo,
            key: 'id'
        }
    },
    archivoUrl: DataTypes.STRING,
    formato: DataTypes.STRING,
    descripcion: DataTypes.STRING
});
EquipoFoto.addHook('afterCreate', async (clienteInstance) => { await sync.create({ tabla: 'EquipoFoto', action: 'create', id_tabla: clienteInstance.dataValues.id }); });
EquipoFoto.addHook('afterUpdate', async (clienteInstance) => { await sync.create({ tabla: 'EquipoFoto', action: 'update', id_tabla: clienteInstance.dataValues.id }); });
EquipoFoto.addHook('afterDestroy', async (clienteInstance) => { await sync.create({ tabla: 'EquipoFoto', action: 'delete', id_tabla: clienteInstance.dataValues.id }); });

export const Herramienta = sequelize.define("herramienta", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
        unique: true,
    },
    descripcion: DataTypes.STRING,
    stock: DataTypes.INTEGER,
});
Herramienta.addHook('afterCreate', async (clienteInstance) => { await sync.create({ tabla: 'Herramienta', action: 'create', id_tabla: clienteInstance.dataValues.id }); });
Herramienta.addHook('afterUpdate', async (clienteInstance) => { await sync.create({ tabla: 'Herramienta', action: 'update', id_tabla: clienteInstance.dataValues.id }); });
Herramienta.addHook('afterDestroy', async (clienteInstance) => { await sync.create({ tabla: 'Herramienta', action: 'delete', id_tabla: clienteInstance.dataValues.id }); });

export const HerramientaFoto = sequelize.define("herramientaFoto", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    id_herramienta: {
        type: DataTypes.STRING,
        references: {
            model: Herramienta,
            key: 'id'
        }
    },
    archivoUrl: DataTypes.STRING,
    formato: DataTypes.STRING,
    descripcion: DataTypes.STRING
});
HerramientaFoto.addHook('afterCreate', async (clienteInstance) => { await sync.create({ tabla: 'HerramientaFoto', action: 'create', id_tabla: clienteInstance.dataValues.id }); });
HerramientaFoto.addHook('afterUpdate', async (clienteInstance) => { await sync.create({ tabla: 'HerramientaFoto', action: 'update', id_tabla: clienteInstance.dataValues.id }); });
HerramientaFoto.addHook('afterDestroy', async (clienteInstance) => { await sync.create({ tabla: 'HerramientaFoto', action: 'delete', id_tabla: clienteInstance.dataValues.id }); });

export const Insumo = sequelize.define("insumo", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    id_proveedor: {
        type: DataTypes.STRING,
        references: {
            model: Proveedor,
            key: "id"
        }
    },
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    costo: DataTypes.FLOAT,
    stock: DataTypes.INTEGER,
});
Insumo.addHook('afterCreate', async (clienteInstance) => { await sync.create({ tabla: 'Insumo', action: 'create', id_tabla: clienteInstance.dataValues.id }); });
Insumo.addHook('afterUpdate', async (clienteInstance) => { await sync.create({ tabla: 'Insumo', action: 'update', id_tabla: clienteInstance.dataValues.id }); });
Insumo.addHook('afterDestroy', async (clienteInstance) => { await sync.create({ tabla: 'Insumo', action: 'delete', id_tabla: clienteInstance.dataValues.id }); });

export const InsumoFoto = sequelize.define("insumoFoto", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    id_insumo: {
        type: DataTypes.STRING,
        references: {
            model: Insumo,
            key: 'id'
        }
    },
    archivoUrl: DataTypes.STRING,
    formato: DataTypes.STRING,
    descripcion: DataTypes.STRING
});
InsumoFoto.addHook('afterCreate', async (clienteInstance) => { await sync.create({ tabla: 'InsumoFoto', action: 'create', id_tabla: clienteInstance.dataValues.id }); });
InsumoFoto.addHook('afterUpdate', async (clienteInstance) => { await sync.create({ tabla: 'InsumoFoto', action: 'update', id_tabla: clienteInstance.dataValues.id }); });
InsumoFoto.addHook('afterDestroy', async (clienteInstance) => { await sync.create({ tabla: 'InsumoFoto', action: 'delete', id_tabla: clienteInstance.dataValues.id }); });

export const ServicioTipo = sequelize.define("servicioTipo", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    tipo: {
        type: DataTypes.STRING,
        unique: true,
    },
    descripcion: DataTypes.STRING
});
ServicioTipo.addHook('afterCreate', async (clienteInstance) => { await sync.create({ tabla: 'ServicioTipo', action: 'create', id_tabla: clienteInstance.dataValues.id }); });
ServicioTipo.addHook('afterUpdate', async (clienteInstance) => { await sync.create({ tabla: 'ServicioTipo', action: 'update', id_tabla: clienteInstance.dataValues.id }); });
ServicioTipo.addHook('afterDestroy', async (clienteInstance) => { await sync.create({ tabla: 'ServicioTipo', action: 'delete', id_tabla: clienteInstance.dataValues.id }); });

export const Servicio = sequelize.define("servicio", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    id_servicio_tipo: {
        type: DataTypes.STRING,
        references: {
            model: ServicioTipo,
            key: 'id'
        }
    },
    id_cliente: {
        type: DataTypes.STRING,
        references: {
            model: Cliente,
            key: 'id'
        }
    },
    id_tecnico: {
        type: DataTypes.STRING,
        references: {
            model: Tecnico,
            key: 'id'
        }
    },
    descripcion: DataTypes.STRING,
    estado: DataTypes.STRING,
    fechaInicio: DataTypes.DATE,
    fechaFin: DataTypes.DATE,
    fechaProgramada: DataTypes.DATE,

});
Servicio.addHook('afterCreate', async (clienteInstance) => { await sync.create({ tabla: 'Servicio', action: 'create', id_tabla: clienteInstance.dataValues.id }); });
Servicio.addHook('afterUpdate', async (clienteInstance) => { await sync.create({ tabla: 'Servicio', action: 'update', id_tabla: clienteInstance.dataValues.id }); });
Servicio.addHook('afterDestroy', async (clienteInstance) => { await sync.create({ tabla: 'Servicio', action: 'delete', id_tabla: clienteInstance.dataValues.id }); });

export const ServicioInspeccion = sequelize.define('servicioInspeccion', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    id_servicio: {
        type: DataTypes.STRING,
        references: {
            model: Servicio,
            key: 'id',
        }
    },
    estado: {
        type: DataTypes.STRING,
        unique: true,
    },
    monto: DataTypes.FLOAT,
    observacion: DataTypes.STRING,
});
ServicioInspeccion.addHook('afterCreate', async (clienteInstance) => { await sync.create({ tabla: 'ServicioInspeccion', action: 'create', id_tabla: clienteInstance.dataValues.id }); });
ServicioInspeccion.addHook('afterUpdate', async (clienteInstance) => { await sync.create({ tabla: 'ServicioInspeccion', action: 'update', id_tabla: clienteInstance.dataValues.id }); });
ServicioInspeccion.addHook('afterDestroy', async (clienteInstance) => { await sync.create({ tabla: 'ServicioInspeccion', action: 'delete', id_tabla: clienteInstance.dataValues.id }); });

export const ServicioEquipo = sequelize.define("servicioEquipo", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    id_equipo: {
        type: DataTypes.STRING,
        references: {
            model: Equipo,
            key: 'id',
        }
    },
    id_servicio: {
        type: DataTypes.STRING,
        references: {
            model: Servicio,
            key: 'id',
        }
    },
    cantidad: DataTypes.INTEGER,
    unidad: DataTypes.STRING,
});
ServicioEquipo.addHook('afterCreate', async (clienteInstance) => { await sync.create({ tabla: 'ServicioEquipo', action: 'create', id_tabla: clienteInstance.dataValues.id }); });
ServicioEquipo.addHook('afterUpdate', async (clienteInstance) => { await sync.create({ tabla: 'ServicioEquipo', action: 'update', id_tabla: clienteInstance.dataValues.id }); });
ServicioEquipo.addHook('afterDestroy', async (clienteInstance) => { await sync.create({ tabla: 'ServicioEquipo', action: 'delete', id_tabla: clienteInstance.dataValues.id }); });

export const ServicioHerramienta = sequelize.define("servicioHerramienta", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    id_herramienta: {
        type: DataTypes.STRING,
        references: {
            model: Herramienta,
            key: 'id',
        }
    },
    id_servicio: {
        type: DataTypes.STRING,
        references: {
            model: Servicio,
            key: 'id',
        }
    },
    costo: DataTypes.FLOAT,
});
ServicioHerramienta.addHook('afterCreate', async (clienteInstance) => { await sync.create({ tabla: 'ServicioHerramienta', action: 'create', id_tabla: clienteInstance.dataValues.id }); });
ServicioHerramienta.addHook('afterUpdate', async (clienteInstance) => { await sync.create({ tabla: 'ServicioHerramienta', action: 'update', id_tabla: clienteInstance.dataValues.id }); });
ServicioHerramienta.addHook('afterDestroy', async (clienteInstance) => { await sync.create({ tabla: 'ServicioHerramienta', action: 'delete', id_tabla: clienteInstance.dataValues.id }); });

export const ServicioInsumo = sequelize.define("servicioInsumo", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    id_insumo: {
        type: DataTypes.STRING,
        references: {
            model: Insumo,
            key: 'id',
        }
    },
    id_servicio: {
        type: DataTypes.STRING,
        references: {
            model: Servicio,
            key: 'id',
        }
    },
    cantidad: DataTypes.INTEGER,
    unidad: DataTypes.STRING,
});
ServicioInsumo.addHook('afterCreate', async (clienteInstance) => { await sync.create({ tabla: 'ServicioInsumo', action: 'create', id_tabla: clienteInstance.dataValues.id }); });
ServicioInsumo.addHook('afterUpdate', async (clienteInstance) => { await sync.create({ tabla: 'ServicioInsumo', action: 'update', id_tabla: clienteInstance.dataValues.id }); });
ServicioInsumo.addHook('afterDestroy', async (clienteInstance) => { await sync.create({ tabla: 'ServicioInsumo', action: 'delete', id_tabla: clienteInstance.dataValues.id }); });

export const Tarea = sequelize.define("tarea", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    id_servicio: {
        type: DataTypes.STRING,
        references: {
            model: Servicio,
            key: 'id',
        }
    },
    descripcion: DataTypes.STRING,
    estado: DataTypes.TINYINT,
    comentarios: DataTypes.STRING,
    fechaInicio: DataTypes.DATE,
    fechaFin: DataTypes.DATE,
});
Tarea.addHook('afterCreate', async (clienteInstance) => { await sync.create({ tabla: 'Tarea', action: 'create', id_tabla: clienteInstance.dataValues.id }); });
Tarea.addHook('afterUpdate', async (clienteInstance) => { await sync.create({ tabla: 'Tarea', action: 'update', id_tabla: clienteInstance.dataValues.id }); });
Tarea.addHook('afterDestroy', async (clienteInstance) => { await sync.create({ tabla: 'Tarea', action: 'delete', id_tabla: clienteInstance.dataValues.id }); });

export const TareaFoto = sequelize.define("tareaFoto", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    id_tarea: {
        type: DataTypes.STRING,
        references: {
            model: Tarea,
            key: 'id'
        }
    },
    archivoUrl: DataTypes.STRING,
    formato: DataTypes.STRING,
    descripcion: DataTypes.STRING
});
TareaFoto.addHook('afterCreate', async (clienteInstance) => { await sync.create({ tabla: 'TareaFoto', action: 'create', id_tabla: clienteInstance.dataValues.id }); });
TareaFoto.addHook('afterUpdate', async (clienteInstance) => { await sync.create({ tabla: 'TareaFoto', action: 'update', id_tabla: clienteInstance.dataValues.id }); });
TareaFoto.addHook('afterDestroy', async (clienteInstance) => { await sync.create({ tabla: 'TareaFoto', action: 'delete', id_tabla: clienteInstance.dataValues.id }); });

export const Venta = sequelize.define("venta", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    id_cliente: {
        type: DataTypes.STRING,
        references: {
            model: Cliente,
            key: 'id',
        }
    },
    tipo: DataTypes.STRING,
    estado: DataTypes.STRING,
    fecha: DataTypes.DATE,
    total: DataTypes.FLOAT,
});
Venta.addHook('afterCreate', async (clienteInstance) => { await sync.create({ tabla: 'Venta', action: 'create', id_tabla: clienteInstance.dataValues.id }); });
Venta.addHook('afterUpdate', async (clienteInstance) => { await sync.create({ tabla: 'Venta', action: 'update', id_tabla: clienteInstance.dataValues.id }); });
Venta.addHook('afterDestroy', async (clienteInstance) => { await sync.create({ tabla: 'Venta', action: 'delete', id_tabla: clienteInstance.dataValues.id }); });

export const VentaPago = sequelize.define("ventaPago", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    id_venta: {
        type: DataTypes.STRING,
        references: {
            model: Venta,
            key: 'id',
        }
    },
    fecha: DataTypes.DATE,
    monto: DataTypes.FLOAT,
});
VentaPago.addHook('afterCreate', async (clienteInstance) => { await sync.create({ tabla: 'VentaPago', action: 'create', id_tabla: clienteInstance.dataValues.id }); });
VentaPago.addHook('afterUpdate', async (clienteInstance) => { await sync.create({ tabla: 'VentaPago', action: 'update', id_tabla: clienteInstance.dataValues.id }); });
VentaPago.addHook('afterDestroy', async (clienteInstance) => { await sync.create({ tabla: 'VentaPago', action: 'delete', id_tabla: clienteInstance.dataValues.id }); });

export const VentaEquipo = sequelize.define("ventaEquipo", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },

    id_equipo: {
        type: DataTypes.STRING,
        references: {
            model: Equipo,
            key: 'id',
        }
    },
    id_venta: {
        type: DataTypes.STRING,
        references: {
            model: Venta,
            key: 'id',
        }
    },
    cantidad: DataTypes.INTEGER,
    unidad: DataTypes.STRING,
});
VentaEquipo.addHook('afterCreate', async (clienteInstance) => { await sync.create({ tabla: 'VentaEquipo', action: 'create', id_tabla: clienteInstance.dataValues.id }); });
VentaEquipo.addHook('afterUpdate', async (clienteInstance) => { await sync.create({ tabla: 'VentaEquipo', action: 'update', id_tabla: clienteInstance.dataValues.id }); });
VentaEquipo.addHook('afterDestroy', async (clienteInstance) => { await sync.create({ tabla: 'VentaEquipo', action: 'delete', id_tabla: clienteInstance.dataValues.id }); });

export const VentaInsumo = sequelize.define("ventaInsumo", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    id_insumo: {
        type: DataTypes.STRING,
        references: {
            model: Insumo,
            key: 'id',
        }
    },
    id_venta: {
        type: DataTypes.STRING,
        references: {
            model: Venta,
            key: 'id',
        }
    },
    cantidad: DataTypes.INTEGER,
    unidad: DataTypes.STRING,
});
VentaInsumo.addHook('afterCreate', async (clienteInstance) => { await sync.create({ tabla: 'VentaInsumo', action: 'create', id_tabla: clienteInstance.dataValues.id }); });
VentaInsumo.addHook('afterUpdate', async (clienteInstance) => { await sync.create({ tabla: 'VentaInsumo', action: 'update', id_tabla: clienteInstance.dataValues.id }); });
VentaInsumo.addHook('afterDestroy', async (clienteInstance) => { await sync.create({ tabla: 'VentaInsumo', action: 'delete', id_tabla: clienteInstance.dataValues.id }); });

export const Cotizacion = sequelize.define("cotizacion", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    id_cliente: {
        type: DataTypes.STRING,
        references: {
            model: Cliente,
            key: 'id',
        }
    },
    fechaCreacion: DataTypes.DATE,
    fechaValidez: DataTypes.DATE,
    monto: DataTypes.FLOAT,
    estado: DataTypes.BIGINT,
});
Cotizacion.addHook('afterCreate', async (clienteInstance) => { await sync.create({ tabla: 'Cotizacion', action: 'create', id_tabla: clienteInstance.dataValues.id }); });
Cotizacion.addHook('afterUpdate', async (clienteInstance) => { await sync.create({ tabla: 'Cotizacion', action: 'update', id_tabla: clienteInstance.dataValues.id }); });
Cotizacion.addHook('afterDestroy', async (clienteInstance) => { await sync.create({ tabla: 'Cotizacion', action: 'delete', id_tabla: clienteInstance.dataValues.id }); });

export const CotizacionServicio = sequelize.define("cotizacion", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    id_cotizacion: {
        type: DataTypes.STRING,
        references: {
            model: Cotizacion,
            key: 'id'
        }
    },
    id_servicio: {
        type: DataTypes.STRING,
        references: {
            model: Servicio,
            key: 'id'
        }
    },
    fechaCreacion: DataTypes.DATE,
    fechaValidez: DataTypes.DATE,
    monto: DataTypes.FLOAT,
    observacion: DataTypes.STRING,
});
CotizacionServicio.addHook('afterCreate', async (clienteInstance) => { await sync.create({ tabla: 'CotizacionServicio', action: 'create', id_tabla: clienteInstance.dataValues.id }); });
CotizacionServicio.addHook('afterUpdate', async (clienteInstance) => { await sync.create({ tabla: 'CotizacionServicio', action: 'update', id_tabla: clienteInstance.dataValues.id }); });
CotizacionServicio.addHook('afterDestroy', async (clienteInstance) => { await sync.create({ tabla: 'CotizacionServicio', action: 'delete', id_tabla: clienteInstance.dataValues.id }); });

export const CotizacionVenta = sequelize.define("cotizacion", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    id_cotizacion: {
        type: DataTypes.STRING,
        references: {
            model: Cotizacion,
            key: 'id'
        }
    },
    id_venta: {
        type: DataTypes.STRING,
        references: {
            model: Venta,
            key: 'id'
        }
    },
    fechaCreacion: DataTypes.DATE,
    fechaValidez: DataTypes.DATE,
    monto: DataTypes.FLOAT,
    observacion: DataTypes.STRING,

});
CotizacionVenta.addHook('afterCreate', async (clienteInstance) => { await sync.create({ tabla: 'CotizacionVenta', action: 'create', id_tabla: clienteInstance.dataValues.id }); });
CotizacionVenta.addHook('afterUpdate', async (clienteInstance) => { await sync.create({ tabla: 'CotizacionVenta', action: 'update', id_tabla: clienteInstance.dataValues.id }); });
CotizacionVenta.addHook('afterDestroy', async (clienteInstance) => { await sync.create({ tabla: 'CotizacionVenta', action: 'delete', id_tabla: clienteInstance.dataValues.id }); });

Cliente.hasMany(Servicio, {
    foreignKey: 'id_cliente',
    onDelete: 'CASCADE'
});
Cliente.hasMany(Venta, {
    foreignKey: 'id_cliente',
    onDelete: 'CASCADE'
});
Cliente.hasMany(Cotizacion, {
    foreignKey: 'id_cliente',
    onDelete: 'CASCADE'
});

Empleado.hasOne(Tecnico, {
    foreignKey: 'id_empleado',
    onDelete: 'CASCADE'
});
Empleado.hasOne(Usuario, {
    foreignKey: 'id_empleado',
    onDelete: 'CASCADE'
});

Proveedor.hasMany(Equipo, {
    foreignKey: 'id_proveedor',
    onDelete: 'CASCADE'
});
Proveedor.hasMany(Insumo, {
    foreignKey: 'id_proveedor',
    onDelete: 'CASCADE'
});


EquipoCategoria.hasMany(Equipo, {
    foreignKey: 'id_equipo_categoria',
    onDelete: 'CASCADE'
});


Equipo.hasOne(EquipoFoto, {
    foreignKey: 'id_equipo',
    onDelete: 'CASCADE'
});
Equipo.hasMany(VentaEquipo, {
    foreignKey: 'id_equipo',
    onDelete: 'CASCADE'
});
Equipo.hasMany(EquipoCodigo, {
    foreignKey: 'id_equipo',
    onDelete: 'CASCADE'
});
Equipo.hasMany(ServicioEquipo, {
    foreignKey: 'id_equipo',
    onDelete: 'CASCADE'
});

Equipo.belongsTo(Proveedor, { foreignKey: 'id_proveedor', as: 'proveedors' });
Equipo.belongsTo(EquipoCategoria, { foreignKey: 'id_equipo_categoria', as: 'equipoCategorias' });


Herramienta.hasMany(ServicioHerramienta, {
    foreignKey: 'id_herramienta',
    onDelete: 'CASCADE'
});
Herramienta.hasOne(HerramientaFoto, {
    foreignKey: 'id_herramienta',
    onDelete: 'CASCADE'
});


Insumo.hasOne(InsumoFoto, {
    foreignKey: 'id_insumo',
    onDelete: 'CASCADE'
});
Insumo.hasMany(ServicioInsumo, {
    foreignKey: 'id_insumo',
    onDelete: 'CASCADE'
});
Insumo.hasMany(VentaInsumo, {
    foreignKey: 'id_insumo',
    onDelete: 'CASCADE'
});


Servicio.hasMany(ServicioInspeccion, {
    foreignKey: 'id_servicio',
    onDelete: 'CASCADE'
});
Servicio.hasMany(ServicioEquipo, {
    foreignKey: 'id_servicio',
    onDelete: 'CASCADE'
});
Servicio.hasMany(ServicioHerramienta, {
    foreignKey: 'id_servicio',
    onDelete: 'CASCADE'
});
Servicio.hasMany(ServicioInsumo, {
    foreignKey: 'id_servicio',
    onDelete: 'CASCADE'
});
Servicio.hasMany(Tarea, {
    foreignKey: 'id_servicio',
    onDelete: 'CASCADE'
});
Servicio.hasOne(CotizacionServicio, {
    foreignKey: 'id_servicio',
    onDelete: 'CASCADE'
});



Tecnico.hasMany(Servicio, {
    foreignKey: 'id_tecnico',
    onDelete: 'CASCADE'
})


Tarea.hasOne(TareaFoto, {
    foreignKey: 'id_tarea',
    onDelete: 'CASCADE'
});


Venta.hasOne(VentaPago, {
    foreignKey: 'id_venta',
    onDelete: 'CASCADE'
});
Venta.hasMany(VentaEquipo, {
    foreignKey: 'id_venta',
    onDelete: 'CASCADE'
});
Venta.hasMany(VentaInsumo, {
    foreignKey: 'id_venta',
    onDelete: 'CASCADE'
});
Venta.hasMany(CotizacionVenta, {
    foreignKey: 'id_venta',
    onDelete: 'CASCADE'
});
await sequelize.sync({ force: false });
