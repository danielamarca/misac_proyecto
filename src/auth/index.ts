import { Elysia } from 'elysia';
import * as bcrypt from 'bcryptjs';
import { Usuario } from '../db';
import { SignJWT } from 'jose';
import { schemaUsuario } from './usuario';
const SECRET_KEY = new TextEncoder().encode(process.env.SECRET_KEY || 'julio');
const auth = new Elysia()
    .onError(({ code, error, set }) => {
        if (code) {
            set.status = 400;
            return { error: { message: error.message } };
        }
    });
auth.post('/', async ({ body }: any) => {
    console.log('peticion');
    try {
        const user = await Usuario.findOne({ attributes: ['id', 'username', 'password', 'privilegio', 'id_empleado'], where: { username: body.username } });
        if (!user) return new Error('No existe el usuario');
        const password = await bcrypt.compare(body.password, user.dataValues.password);
        if (!password) return new Error('Contraseña Incorrecta');
        const token = await new SignJWT(user.dataValues)
            .setProtectedHeader({ alg: "HS256" })
            .setExpirationTime("15m")
            .sign(SECRET_KEY);
        return { user: user.dataValues, token };
    } catch (e) {
        throw new Error('Ocurrio un error inesperado');
    }
}, { body: schemaUsuario });

export default auth;