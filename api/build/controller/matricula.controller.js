"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.matriculaController = void 0;
const database_1 = __importDefault(require("../database"));
class MatriculaController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('SELECT * FROM matricula', (err, result) => {
                if (err)
                    throw err;
                if (result.length) {
                    return res.json(result);
                }
                res.status(404).json({ text: 'Datos No Encontrados' });
            });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Nombre, edad, fecha_nacimiento, fecha_incripcion, costo } = req.body;
            if (!(Nombre && edad && fecha_nacimiento && fecha_incripcion && costo)) {
                res.status(404).json({ message: 'Campos Requeridos' });
            }
            else {
                yield database_1.default.query('INSERT INTO matricula(Nombre,edad,fecha_nacimiento,fecha_incripcion,costo)VALUES(?,?,?,?,?)', [Nombre, edad, fecha_nacimiento, fecha_incripcion, costo], (err, result) => {
                    if (err)
                        throw err;
                    console.log(result);
                    res.json({ text: 'Matricula Creada' });
                });
            }
        });
    }
    retrive(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('SELECT * FROM matricula WHERE idmatricula = ?', [id], (err, result) => {
                if (err)
                    throw err;
                if (result[0]) {
                    return res.json(result[0]);
                }
                res.status(404).json({ text: 'Matricula No Existe' });
            });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Nombre, edad, fecha_nacimiento, fecha_incripcion, costo } = req.body;
            const { id } = req.params;
            if (!(Nombre && edad && fecha_nacimiento && fecha_incripcion && costo)) {
                res.status(404).json({ message: 'Campos Requeridos' });
            }
            else {
                yield database_1.default.query('UPDATE matricula SET Nombre = ?,edad = ?, fecha_nacimiento = ?,fecha_incripcion = ?,costo = ? WHERE idmatricula = ?;', [Nombre, edad, fecha_nacimiento, fecha_incripcion, costo, id], (err, result) => {
                    if (err)
                        throw err;
                    res.json({ text: 'Matricula Actualizada' });
                });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!(id)) {
                res.status(404).json({ message: 'Campos Requeridos' });
            }
            yield database_1.default.query('DELETE FROM matricula WHERE idmatricula = ?', [id], (err, result) => {
                if (err)
                    throw err;
                res.json({ text: 'Matricula  Eliminada' });
            });
        });
    }
}
exports.matriculaController = new MatriculaController;
