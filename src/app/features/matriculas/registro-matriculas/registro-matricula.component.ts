import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { MatriculasService } from 'src/app/core/services/matriculas.service';
import { SelectorGenericoComponent } from 'src/app/shared/components/selector-generico/selector-generico.component';
import { SelectorGradosComponent } from 'src/app/shared/components/selector-grados/selector-grados.component';
import { SelectorSedeComponent } from 'src/app/shared/components/selector-sede/selector-sede.component';

@Component({
    selector: 'app-registro-matricula',
    templateUrl: './registro-matricula.component.html',
    providers: [MessageService],
})
export class RegistroMatriculaComponent {
    matricula: any= {};
    submitted: boolean = false;
    item: any = {};
    form: FormGroup;
    itemsSiNo: any = [];
    itemsTipoDoc: any = [];
    itemsZona: any = [];
    itemsTipoSangre: any = [];
    id:any;

    nombreModulo: string = 'Módulo Registro Matricúlas';
    @ViewChild(SelectorSedeComponent) sedeComponent: SelectorSedeComponent;
    @ViewChild(SelectorGradosComponent) gradosComponent: SelectorGradosComponent;
    @ViewChild(SelectorGenericoComponent) genericoComponent: SelectorGenericoComponent;
    @ViewChild("tipodoc") tipodocComponent: SelectorGenericoComponent;
    @ViewChild("zona") zonaComponent: SelectorGenericoComponent;
    @ViewChild("tiposangre") tipoSangreComponent: SelectorGenericoComponent;
    @ViewChild("desplazado") desplazadoComponent: SelectorGenericoComponent;
    @ViewChild("repitente") repitenteComponent: SelectorGenericoComponent;

    constructor(
        private route: ActivatedRoute,
        private matriculaService: MatriculasService,
        private messageService: MessageService,
        private fb: FormBuilder,
        private router:Router
    ) {}

    ngOnInit() {


        this.form = this.fb.group({
            sede_id: ['', Validators.required],
            grado_id: ['', Validators.required],
            nombres: ['', Validators.required],
            apellidos: ['', Validators.required],
            tipo_doc: ['', Validators.required],
            num_doc: ['', Validators.required],
            fecha_nac: ['', Validators.required],
            lugar_nac: ['', Validators.required],
            estrato: ['', Validators.required],
            direccion: ['', Validators.required],
            eps: ['', Validators.required],
            zona: ['', Validators.required],
            tipo_sangre: ['', Validators.required],
            desplazado: ['', Validators.required],
            nombre_madre: [''],
            nombre_padre: [''],
            nombre_acudiente: ['', Validators.required],
            telefono_acudiente: ['', Validators.required],
            folio: ['', Validators.required],
            repitente: ['', Validators.required],
        });

        this.itemsSiNo = [
            { id: 1, descripcion: 'SI' },
            { id: 2, descripcion: 'NO' },
        ];

        this.itemsTipoDoc = [
            { id: 1, descripcion: 'RC' },
            { id: 2, descripcion: 'TI' },
            { id: 3, descripcion: 'CC' },
            { id: 4, descripcion: 'PEP' },
            { id: 4, descripcion: 'OTRO' },
        ];

        this.itemsZona = [
            { id: 1, descripcion: 'URBANA' },
            { id: 2, descripcion: 'RURAL' },
        ];

        this.itemsTipoSangre = [
            { id: 1, descripcion: 'O+' },
            { id: 2, descripcion: 'A+' },
            { id: 3, descripcion: 'A-' },
            { id: 4, descripcion: 'B-' },
            { id: 5, descripcion: 'B+' },
            { id: 6, descripcion: 'AB+' },
            { id: 7, descripcion: 'AB-' },
        ];
        this.gradosComponent.getData();
        this.route.paramMap.subscribe(params => {
            this.id = params.get('id');
            //console.log(this.id)
            if(this.id!=0){
                this.getDataById(this.id);

            }

        });

    }

    getValores(event, operacion) {
        switch (operacion) {
            case 'sede':
                this.form.get('sede_id').setValue(event.id);
                break;
            case 'grado':
                this.form.get('grado_id').setValue(event.id);
                break;
            case 'repitente':
                this.form.get('repitente').setValue(event.descripcion);
                break;
            case 'tipo_doc':
                this.form.get('tipo_doc').setValue(event.descripcion);
                break;
            case 'zona':
                this.form.get('zona').setValue(event.descripcion);
                break;
            case 'desplazado':
                this.form.get('desplazado').setValue(event.descripcion);
                break;
                case 'tipo_sangre':
                    this.form.get('tipo_sangre').setValue(event.descripcion);
                    break;
        }
    }

    getDataById(id:any) {
        this.matriculaService.getById(id)
        .pipe(finalize(() =>this.setValoresForm(this.matricula)))
        .subscribe(
            (response) => {
                //console.log(response.data);
                this.matricula = response.data;
            },
            (error) => {
                this.messageService.add({
                    severity: 'warn',
                    summary: 'Advertencia',
                    detail: error.error.message,
                    life: 3000,
                });
            }
        );
    }

    setValoresForm(matricula:any){


       setTimeout(() => {
        this.sedeComponent.filtrar(matricula.sede_id)
        this.gradosComponent.filtrar(matricula.grado_id)
        this.form.get('nombres').setValue(matricula.estudiante.nombres);
        this.form.get('apellidos').setValue(matricula.estudiante.apellidos);
        this.form.get('num_doc').setValue(matricula.estudiante.num_doc);
        this.form.get('fecha_nac').setValue(matricula.estudiante.fecha_nac);
        this.form.get('lugar_nac').setValue(matricula.estudiante.lugar_nac);
        this.form.get('estrato').setValue(matricula.estudiante.estrato);
        this.form.get('direccion').setValue(matricula.estudiante.direccion);
        this.form.get('eps').setValue(matricula.estudiante.eps);
        this.form.get('nombre_madre').setValue(matricula.estudiante.nombre_madre);
        this.form.get('nombre_padre').setValue(matricula.estudiante.nombre_padre);
        this.form.get('nombre_acudiente').setValue(matricula.estudiante.nombre_acudiente);
        this.form.get('telefono_acudiente').setValue(matricula.estudiante.telefono_acudiente);
        this.form.get('folio').setValue(matricula.folio);
        this.form.get('sede_id').setValue(matricula.sede_id);
        this.form.get('grado_id').setValue(matricula.grado_id);
        this.form.get('tipo_doc').setValue(matricula.estudiante.tipo_doc);
        this.form.get('zona').setValue(matricula.estudiante.zona);
        this.form.get('tipo_sangre').setValue(matricula.estudiante.tipo_sangre);
        this.form.get('desplazado').setValue(matricula.estudiante.desplazado);
        this.form.get('repitente').setValue(matricula.repitente);

        this.tipodocComponent.filtrar(matricula.estudiante.tipo_doc);
        this.zonaComponent.filtrar(matricula.estudiante.zona);
        this.tipoSangreComponent.filtrar(matricula.estudiante.tipo_sangre);
        this.desplazadoComponent.filtrar(matricula.estudiante.desplazado);
        this.repitenteComponent.filtrar(matricula.repitente);
       }, 1500);
    }

    crear(item: any) {
        this.matriculaService.postData(item).subscribe(
            (response) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Exitoso',
                    detail: response.message,
                    life: 3000,
                });
            },
            (error) => {
                this.messageService.add({
                    severity: 'warn',
                    summary: 'Advertencia',
                    detail: error.error.message,
                    life: 3000,
                });
            }
        );
    }

    onSubmit() {
        //console.log(this.form.value);
        if (this.form.valid) {
            let data = this.form.value;
            if(this.id!=0){
                data.matricula_id=this.id;
            }
            this.crear(data);
            this.reinicarFormulario();
        } else {
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Formulario inválido. Verifique los campos.',
                life: 3000,
            });
        }

        setTimeout(() => {
            if(this.id!=0){
               //this.router.navigate(['matriculas'])
            }
        }, 1500);

    }



    reiniciaComponensHijos(): void {
        this.sedeComponent.reiniciarComponente();
        this.gradosComponent.reiniciarComponente();
        this.tipodocComponent.reiniciarComponente();
        this.zonaComponent.reiniciarComponente();
        this.tipoSangreComponent.reiniciarComponente();
        this.desplazadoComponent.reiniciarComponente();
        this.repitenteComponent.reiniciarComponente();
    }

    reinicarFormulario() {
       this.form.reset();
       this.reiniciaComponensHijos();
    }
}
