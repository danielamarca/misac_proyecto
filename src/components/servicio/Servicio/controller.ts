import { Elysia } from 'elysia';
import { Service } from '.';
const controller = new Elysia();
controller.post('/', Service.create);
export default controller;