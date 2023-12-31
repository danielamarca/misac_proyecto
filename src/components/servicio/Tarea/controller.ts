import { Elysia } from 'elysia';
import { Service } from '.';
const controller = new Elysia();
controller.get('/', Service.create);
export default controller;