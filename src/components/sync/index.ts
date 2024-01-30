import { Equipo, Proveedor, EquipoCategoria, Servicio, sync, EquipoFoto, EquipoCodigo, Usuario, Cliente, Empleado, Tecnico, ServicioEquipo, ServicioInspeccion, ServicioTipo, Tarea, TareaFoto } from '../../db';
import { Op } from 'sequelize';
import { Elysia } from 'elysia';

const Controlador = new Elysia({ prefix: '/sync' }).onError(({ code, error, set }) => {
    if (code) {
        set.status = 400;
        return { error: { message: error.message } };
    }
});

const getItemsByDate = async (model, dateParams) => {
    if (!dateParams) throw new Error('No existe Fecha');
    const dateFormatRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
    if (!dateFormatRegex.test(dateParams)) {
        throw new Error('Formato de fecha incorrecto. Debe ser YYYY-MM-DDTHH:mm:ss.SSSZ');
    }
    const date = new Date(dateParams);
    if (isNaN(date.getTime())) {
        throw new Error('Error de fecha incorrecto');
    }
    return model.findAll({
        where: {
            [Op.or]: [
                { createdAt: { [Op.gte]: date } },
                { updatedAt: { [Op.gte]: date } }
            ]
        },
        order: [['updatedAt', 'ASC']] // Ordenar por fecha de creación de más antigua a más nueva
    });
};
Controlador.get('/equipo', async ({ query }) => {
    const { date } = query;
    if (!date) return Equipo.findAll({
        order: [['updatedAt', 'ASC']]
    });
    const response = await getItemsByDate(Equipo, date);
    return { data: response };
});
Controlador.get('/usuario', async ({ query }) => {
    const { date } = query;
    if (!date) return Usuario.findAll({
        order: [['updatedAt', 'ASC']]
    });
    const response = await getItemsByDate(Usuario, date);
    return { data: response };
});
Controlador.get('/empleado', async ({ query }) => {
    const { date } = query;
    if (!date) return Empleado.findAll({
        order: [['updatedAt', 'ASC']]
    });
    const response = await getItemsByDate(Empleado, date);
    return { data: response };
});
Controlador.get('/cliente', async ({ query }) => {
    const { date } = query;
    if (!date) return Cliente.findAll({
        order: [['updatedAt', 'ASC']]
    });
    const response = await getItemsByDate(Cliente, date);
    return { data: response };
});
Controlador.get('/equipo_codigo', async ({ query }) => {
    const { date } = query;
    if (!date) return EquipoCodigo.findAll({
        order: [['updatedAt', 'ASC']]
    });
    const response = await getItemsByDate(EquipoCodigo, date);
    return { data: response };
});
Controlador.get('/empleado_tecnico', async ({ query }) => {
    const { date } = query;
    if (!date) return Tecnico.findAll({ order: [['updatedAt', 'ASC']] });
    const response = await getItemsByDate(Tecnico, date);
    return { data: response };
})
Controlador.get('/equipo_foto', async ({ query }) => {
    const { date } = query;
    if (!date) return EquipoFoto.findAll({
        order: [['updatedAt', 'ASC']]
    });
    const response = await getItemsByDate(EquipoFoto, date);
    return { data: response };
});
Controlador.get('/proveedor', async ({ query }) => {
    const { date } = query;
    if (!date) return Proveedor.findAll({
        order: [['updatedAt', 'ASC']]
    });
    const response = await getItemsByDate(Proveedor, date);
    return { data: response };
});
Controlador.get('/equipo_categoria', async ({ query }) => {
    const { date } = query;
    if (!date) return EquipoCategoria.findAll({
        order: [['updatedAt', 'ASC']]
    });
    const response = await getItemsByDate(EquipoCategoria, date);
    return { data: response };
});
Controlador.get('/servicio', async ({ query }) => {
    const { date } = query;
    if (!date) return Servicio.findAll({
        order: [['updatedAt', 'ASC']]
    });
    const response = await getItemsByDate(Servicio, date);
    return { data: response };
});
Controlador.get('/servicio_equipo', async ({ query }) => {
    const { date } = query;
    if (!date) return ServicioEquipo.findAll({
        order: [['updatedAt', 'ASC']]
    });
    const response = await getItemsByDate(ServicioEquipo, date);
    return { data: response };
});
Controlador.get('/servicio_inspeccion', async ({ query }) => {
    const { date } = query;
    if (!date) return ServicioInspeccion.findAll({
        order: [['updatedAt', 'ASC']]
    });
    const response = await getItemsByDate(ServicioInspeccion, date);
    return { data: response };
});
Controlador.get('/servicio_tipo', async ({ query }) => {
    const { date } = query;
    if (!date) return ServicioTipo.findAll({
        order: [['updatedAt', 'ASC']]
    });
    const response = await getItemsByDate(ServicioTipo, date);
    return { data: response };
});
Controlador.get('/tarea', async ({ query }) => {
    const { date } = query;
    if (!date) return Tarea.findAll({
        order: [['updatedAt', 'ASC']]
    });
    const response = await getItemsByDate(Tarea, date);
    return { data: response };
});
Controlador.get('/tarea_foto', async ({ query }) => {
    const { date } = query;
    if (!date) return TareaFoto.findAll({
        order: [['updatedAt', 'ASC']]
    });
    const response = await getItemsByDate(TareaFoto, date);
    return { data: response };
});
Controlador.get('/', async ({ query }) => {
    const { date } = query;
    if (!date) return sync.findAll({
        order: [['updatedAt', 'ASC']]
    });
    const response = await getItemsByDate(sync, date);
    return { data: response };
});

export default Controlador;
