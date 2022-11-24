"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const matricula_controller_1 = require("../controller/matricula.controller");
class MatriculaRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', matricula_controller_1.matriculaController.list);
        this.router.get('/:id', matricula_controller_1.matriculaController.retrive);
        this.router.post('/', matricula_controller_1.matriculaController.create);
        this.router.put('/:id', matricula_controller_1.matriculaController.update);
        this.router.delete('/:id', matricula_controller_1.matriculaController.delete);
    }
}
const matriculaRouter = new MatriculaRouter();
exports.default = matriculaRouter.router;
