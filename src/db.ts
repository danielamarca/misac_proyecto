import { DATE, DataTypes, Sequelize } from "sequelize";
const dbUser = process.env.dbUser || 'root';
const dbUserPass = process.env.dbUserPass || 'root';
const dbName = process.env.dbName || 'proyecto1';
export const sequelize = new Sequelize(
    //`mysql://${dbUser}:${dbUserPass}@localhost:3306/${dbName}`,
    `mysql://root:1b-4C1Gd4feHaBCGaa1bAebf3bcE2gfB@roundhouse.proxy.rlwy.net:46556/railway`,
    {
        logging: false,
        pool: {
            max: 10,
            min: 0,
        },
    },
);
await sequelize.authenticate();
const ShortenedUrl = sequelize.define("shortenedurl", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    srcurl: DataTypes.STRING,
    created: DataTypes.DATE,
    lastaccessed: DataTypes.DATE,
}, {
    timestamps: false,
});
export const Cliente = sequelize.define("cliente", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    nombre: DataTypes.STRING,
    apellidoPaterno: DataTypes.STRING,
    apellidoMaterno: DataTypes.STRING,
    nombreCompleto: DataTypes.STRING,
    direccion: DataTypes.STRING,
    contacto: DataTypes.STRING,
});
export const Empleado = sequelize.define("empleado", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    rol: DataTypes.TINYINT,
    nombre: DataTypes.STRING,
    apellidoPaterno: DataTypes.STRING,
    apellidoMaterno: DataTypes.STRING,
    nombreCompleto: DataTypes.STRING,
    direccion: DataTypes.STRING,
    contacto: DataTypes.STRING,
});
export const Usuario = sequelize.define("usuario", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
    },
    privilegio: DataTypes.INTEGER,
    password: DataTypes.STRING,
    id_empleado: {
        type: DataTypes.STRING,
        references: {
            model: Empleado,
            key: 'id',
        }
    }
});
export const Servicio = sequelize.define("servicio", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    descripcion: DataTypes.STRING,
    fechaProgramada: DataTypes.DATE,
    id_cliente: {
        type: DataTypes.STRING,
    },
    id_tecnico: {
        type: DataTypes.STRING,
    },
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
    comentario: DataTypes.STRING,
    foto: DataTypes.BLOB,
    fechaInicio: DataTypes.DATE,
    fechaFin: DataTypes.DATE,
});
const Venta = sequelize.define("venta", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    fecha: DataTypes.DATE,
    total: DataTypes.FLOAT,
    id_cliente: {
        type: DataTypes.STRING,
        references: {
            model: Cliente,
            key: 'id',
        }
    }
});
export const Equipo = sequelize.define("equipo", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    precio: DataTypes.FLOAT,
    stock: DataTypes.INTEGER,
});
export const Herramienta = sequelize.define("herramienta", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    cantidadDisponible: DataTypes.INTEGER,
});
export const Insumo = sequelize.define("insumo", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    cantidadDisponible: DataTypes.INTEGER,
});
const Proveedor = sequelize.define("proveedor", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    nombre: DataTypes.STRING,
    contacto: DataTypes.STRING,
});
const Cotizacion = sequelize.define("cotizacion", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    fechaCreacion: DataTypes.DATE,
    fechaValidez: DataTypes.DATE,
    id_cliente: {
        type: DataTypes.STRING,
        references: {
            model: Cliente,
            key: 'id',
        }
    },
    estado: DataTypes.BIGINT,
    total: DataTypes.FLOAT,
});
const Pago = sequelize.define("pago", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    fecha: DataTypes.DATE,
    monto: DataTypes.FLOAT,
    id_venta: {
        type: DataTypes.STRING,
        references: {
            model: Venta,
            key: 'id',
        }
    }
});
await sequelize.sync({ force: false });
export async function save(id: string, srcUrl: string) {
    await ShortenedUrl.create({
        id,
        srcurl: srcUrl,
        created: new Date(),
        lastaccessed: new Date(),
    });
    return true;
}
