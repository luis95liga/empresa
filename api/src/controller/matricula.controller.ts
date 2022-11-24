import { Request, Response } from 'express';
import pool from '../database';

class MatriculaController {

    public async list(req: Request, res: Response): Promise<void>{
        await pool.query('SELECT * FROM matricula',(err, result)=>{
            if(err) throw err;
            if(result.length){
                return res.json(result)
            }
            res.status(404).json({text: 'Datos No Encontrados'});
        });
    }

    public async create(req: Request, res: Response): Promise<void>{
        const { Nombre, edad, fecha_nacimiento, fecha_incripcion, costo } = req.body;
        if (!(Nombre && edad && fecha_nacimiento && fecha_incripcion && costo)){
            res.status(404).json({message: 'Campos Requeridos'});
        }else{
            await pool.query('INSERT INTO matricula(Nombre,edad,fecha_nacimiento,fecha_incripcion,costo)VALUES(?,?,?,?,?)', [ Nombre, edad, fecha_nacimiento, fecha_incripcion, costo ], (err, result) => {
                if(err) throw err;
                console.log(result);
                res.json({text: 'Matricula Creada'});
            });
        }
        
    }

    public async retrive(req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        await pool.query('SELECT * FROM matricula WHERE idmatricula = ?', [ id ], (err, result) => {
          if(err) throw err;
          if(result[0]){
            return res.json(result[0])
          }
          res.status(404).json({text: 'Matricula No Existe'});
        });
    }

    

    public async update(req: Request, res: Response): Promise<void>{
        const { Nombre, edad, fecha_nacimiento, fecha_incripcion, costo } = req.body;
        const { id } = req.params;
        if (!(Nombre && edad && fecha_nacimiento && fecha_incripcion && costo)){
            res.status(404).json({message: 'Campos Requeridos'});
        }else{
            await pool.query('UPDATE matricula SET Nombre = ?,edad = ?, fecha_nacimiento = ?,fecha_incripcion = ?,costo = ? WHERE idmatricula = ?;', [ Nombre, edad, fecha_nacimiento, fecha_incripcion, costo, id ], (err, result) => {
                if(err) throw err;
                res.json({text: 'Matricula Actualizada'});
            });
        }
        
    }

    public async delete(req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        if (!(id)){
            res.status(404).json({message: 'Campos Requeridos'});
        }
        await pool.query('DELETE FROM matricula WHERE idmatricula = ?', [ id ], (err, result) => {
            if(err) throw err;
            res.json({text: 'Matricula  Eliminada'});
        });
    }

}

export const matriculaController = new MatriculaController;