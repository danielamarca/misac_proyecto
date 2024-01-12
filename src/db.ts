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
    archivo: DataTypes.BLOB,
    formato: DataTypes.STRING,
    descripcion: DataTypes.STRING
});
export const Herramienta = sequelize.define("herramienta", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    stock: DataTypes.INTEGER,
});
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
    archivo: DataTypes.BLOB,
    formato: DataTypes.STRING,
    descripcion: DataTypes.STRING
});
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
    archivo: DataTypes.BLOB,
    formato: DataTypes.STRING,
    descripcion: DataTypes.STRING
});
export const ServicioTipo = sequelize.define("servicioTipo", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    tipo: DataTypes.STRING,
    descripcion: DataTypes.STRING
});
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
    estado: DataTypes.STRING,
    monto: DataTypes.FLOAT,
    observacion: DataTypes.STRING,
});
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
    archivo: DataTypes.BLOB,
    formato: DataTypes.STRING,
    descripcion: DataTypes.STRING
});
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
