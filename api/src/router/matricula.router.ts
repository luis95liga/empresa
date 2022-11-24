import { Router } from 'express';
import { matriculaController } from '../controller/matricula.controller';

class  MatriculaRouter{
    public router: Router=Router();
    constructor(){
        this.config();
    } 
    config(): void{ 
        this.router.get('/', matriculaController.list );
        this.router.get('/:id', matriculaController.retrive); 
        this.router.post('/', matriculaController.create); 
        this.router.put('/:id', matriculaController.update); 
        this.router.delete('/:id', matriculaController.delete); 
    } 
}

const matriculaRouter = new MatriculaRouter();
export default matriculaRouter.router;