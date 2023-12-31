import { Elysia } from 'elysia';
import Joi from 'joi';
import * as bcrypt from 'bcryptjs';
import { Usuario } from '../db';
import { SignJWT } from 'jose';
const SECRET_KEY = new TextEncoder().encode(process.env.SECRET_KEY || 'julio');
const schemaUsuario = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    password: Joi.string().min(3).max(50).required(),
});
const auth = new Elysia();
auth.post('/', async (ctx: any) => {
    console.log('peticionnnnnnnnnnnnnnnnn');
    const { error, value } = schemaUsuario.validate(ctx.body);
    if (error) return error;
    try {
        const user = await Usuario.findOne({ attributes: ['id', 'username', 'password', 'privilegio', 'id_empleado'], where: { username: value.username } });
        if (!user) return new Error('No existe el usuario');
        const password = await bcrypt.compare(value.password, user.dataValues.password);
        if (!password) return new Error('Contraseña Incorrecta');
        const token = await new SignJWT(user.dataValues)
            .setProtectedHeader({ alg: "HS256" })
            .setExpirationTime("15m")
            .sign(SECRET_KEY);
        console.log({ user: user.dataValues, token });
        return { user: user.dataValues, token };
    } catch (e) {
        return new Error('Ocurrio un error inesperado');
    }
});

export default auth;