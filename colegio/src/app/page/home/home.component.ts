import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatriculaService } from '../service/matricula.service';
import { DatePipe } from '@angular/common';


enum Action {
  EDIT = 'edit',
  NEW = 'new',
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  message1 = '';
  today: Date = new Date();
  pipe = new DatePipe('en-US');

  @ViewChild('scheduledOrdersPaginator') set paginator(pager:MatPaginator) {
    if (pager) this.dataSource.paginator = pager;
  }

  edad = false;
  actionTODO = '';
  isedit:string | number = 0;
  message ='';
  message2 ='';
  date = false;
  matriculaform: any;
  displayedColumns: string[] = ['idmatricula', 'Nombre','edad','fecha_nacimiento','fecha_incripcion','costo','actions'];
  dataSource = new MatTableDataSource();
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [];
  matriculas: any = [];
  constructor(
    private matriculaSvc: MatriculaService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.list();
    this.MatriculaForm();
  }

  datest(d:any): string{let f = '';
    f = ''+this.pipe.transform(d, 'dd/MM/yyyy');
    return f;
  }

  list(): void{
    this.matriculaSvc.getMatricula().subscribe(
      (matricula:any)=>{
        this.dataSource.data = matricula;
        this.matriculas = matricula;
        console.log(this.dataSource.data);
        this.length = matricula.length;
        this.pageSizeOptions = [5, 10, 20, matricula.length];
      },
      (err:any) => console.error(err)
    );
  }

  MatriculaForm(): void {
    this.matriculaform = this.fb.group({
      idmatricula:['',[Validators.required, Validators.minLength(4)]],
      Nombre:['',[Validators.required, Validators.minLength(4)]],
      edad:['',[Validators.required, Validators.pattern("^[0-9]*$")]],
      fecha_nacimiento:['',[Validators.required, Validators.minLength(4)]],
      fecha_incripcion:['',[Validators.required, Validators.minLength(4)]],
      costo: ['',[Validators.required, Validators.pattern("^[0-9]*$")]]
    });
  }


  save(): void {
    const matricula = this.matriculaform.value;
    if(this.isedit ==0){
      if(this.actionTODO === Action.NEW ) {
        this.matriculaSvc.postMatricula(matricula).subscribe((res: any) => {
          console.log(res);
          this.list();
          this.matriculaform.reset();
          this.isedit = 0;
        });
      }
    }else{
      if(this.actionTODO === Action.EDIT ) {
        this.matriculaSvc.putMatricula(matricula, this.isedit ).subscribe((res: any) => {
          console.log(res);
          this.list();
          this.matriculaform.reset();
          this.isedit = 0;
          this.actionTODO = Action.NEW;
        });
      }
    }
  }

  new(): void {
    this.actionTODO = Action.NEW;
    this.matriculaform.reset();
    this.isedit = 0;
  }

  edit( idmatricula: string ): void {
    this.actionTODO = Action.EDIT;
    this.isedit = idmatricula;
    if(this.isedit){
      this.matriculaSvc.getIdMatricula(idmatricula).subscribe((res: any)=>{
        this.matriculaform.patchValue({
          idmatricula: res.idmatricula,
          Nombre:res.Nombre,
          edad:res.edad,
          fecha_nacimiento:this.pipe.transform(res.fecha_nacimiento, 'yyyy/MM/dd'),
          fecha_incripcion:this.pipe.transform(res.fecha_incripcion, 'yyyy/MM/dd'),
          costo: res.costo
        });
        this.matriculaform.updateValueAndValidity();
      });
    }
  }

  cancel(): void {
    this.matriculaform.reset();
    this.isedit = 0;
    this.actionTODO = Action.NEW;
  }

  delete(id: string| number ): void {
    if (window.confirm('Desea eliminar este Registro')) {
      this.matriculaSvc.deleteMatricula(id).subscribe((res: any) => {
        console.log(res);
      });
    }
  }

  isvalid(field: string): boolean {
    this.getErrorMessage(field);
    return (this.matriculaform.get(field).invalid && (this.matriculaform.get(field).dirty || this.matriculaform.get(field).touched));
  }

  isddate():void{
    const edad= parseInt(this.matriculaform.value.edad);
    if(edad>14 && edad<60){
      this.edad = false;
    }else{
      this.edad = true;
      this.message1 = 'La edad deve se mayor que 14 y menor que 60';
    }
  }

  iddate(): void{
    if(Date.parse(this.matriculaform.value.fecha_incripcion) > Date.parse(this.matriculaform.value.fecha_nacimiento)){
      this.date = false;
    }else{
      this.date = true;
      this.message2 = 'la fecha de nacimiento debe ser menor a la de incripción';
    }
  }

  private getErrorMessage(field: string): void {
    const  { errors }   = this.matriculaform.get(field);
    const edad= parseInt(this.matriculaform.get(field));
    let minlenght = errors?.minlength?.requiredLength;
      if (errors) {
        const messages:any = {
          required: 'el campo es requerido',
          pattern: 'Solo Numeros',
          minlength: `el valor ingresado es menor a ${ minlenght } carateres`,
        };
        const errorkey = Object.keys(errors).find(Boolean);
        this.message = messages[errorkey|| ''];
      }
  }

}

