import { Elysia } from "elysia";
import * as rutas from './src/rutas';
const app = new Elysia();

app.use(rutas.default);
app.listen({
    port: 3000,
    hostname: '0.0.0.0'
});
