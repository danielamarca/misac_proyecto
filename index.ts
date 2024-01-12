import { Elysia } from "elysia";
import * as rutas from './src/rutas';
import { swagger } from '@elysiajs/swagger';
const app = new Elysia()
    .use(swagger({
        documentation: {
            info: {
                title: 'Proyecto',
                version: '1.0.0'
            }
        }
    }))
    .use(rutas.default);
app.listen({
    port: 5000,
    hostname: '0.0.0.0'
});
