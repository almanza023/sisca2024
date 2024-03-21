import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    items: MenuItem[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        let rol=localStorage.getItem('rol');
        this.items = [
            {
                label: 'Inicio',
                icon: 'pi pi-fw pi-file',
                routerLink: 'dashboard',
            },
        ];

        let configuraciones= {
            label: 'Configuraciones',
            icon: 'pi pi-fw pi-pencil',
            items: [
                {
                    label: 'Sedes',
                    icon: 'pi pi-fw pi-align-justify',
                    routerLink: 'sedes',

                },
                {
                    label: 'Grados',
                    icon: 'pi pi-fw pi-align-justify',
                    routerLink: 'grados',
                },
                {
                    label: 'Docentes',
                    icon: 'pi pi-fw pi-align-justify',
                    routerLink: 'docentes',
                },
                {
                    label: 'Dirección de Grados',
                    icon: 'pi pi-fw pi-align-justify',
                    routerLink: 'direccion-grados',
                },
                {
                    label: 'Tipo Asignaturas',
                    icon: 'pi pi-fw pi-align-justify',
                    routerLink: 'tipoasignaturas',
                },
                {
                    label: 'Tipo Logros',
                    icon: 'pi pi-fw pi-align-justify',
                    routerLink: 'tipologros',
                },
                {
                    label: 'Aréa/Asignaturas',
                    icon: 'pi pi-fw pi-align-justify',
                    routerLink: 'asignaturas',
                },
                {
                    label: 'Periodo',
                    icon: 'pi pi-fw pi-align-justify',
                    routerLink: 'periodos',
                },
                {
                    label: 'Apertura Periodos',
                    icon: 'pi pi-fw pi-align-justify',
                    routerLink: 'apertura-periodos',
                },
                {
                    label: 'Carga Académica',
                    icon: 'pi pi-fw pi-align-justify',
                    routerLink: 'cargas',
                },
            ]
        };
        let operaciones=
            {
                label: 'Operaciones',
                icon: 'pi pi-fw pi-pencil',
                items: [
                    {
                        label: 'Matriculas',
                        icon: 'pi pi-fw pi-align-justify',
                        routerLink: 'matriculas',

                    },
                    {
                        label: 'Carga Académica',
                        icon: 'pi pi-fw pi-align-justify',
                        routerLink: 'cargas',
                    },
                    {
                        label: 'Logros Académicos',
                        icon: 'pi pi-fw pi-align-justify',
                        routerLink: 'logros-academicos',
                    },
                    {
                        label: 'Notas Académicas',
                        icon: 'pi pi-fw pi-align-justify',
                        routerLink: 'calificaciones',
                    },
                    {
                        label: 'Logros Disciplinarios',
                        icon: 'pi pi-fw pi-align-justify',
                        routerLink: 'logros-disciplinarios',
                    },
                    {
                        label: 'Convivencia Escolar',
                        icon: 'pi pi-fw pi-align-justify',
                        routerLink: 'convivencia',
                    },
                ]
            };
        let registro=
            {
                label: 'Registro',
                icon: 'pi pi-fw pi-pencil',
                items: [
                    {
                        label: 'Logros Académicos',
                        icon: 'pi pi-fw pi-align-justify',
                        routerLink: 'logros-academicos/registro',

                    },
                    {
                        label: 'Notas Académicas',
                        icon: 'pi pi-fw pi-align-justify',
                        routerLink: 'calificaciones/registro/guardar',

                    },
                    {
                        label: 'Calificación Individual',
                        icon: 'pi pi-fw pi-align-justify',
                        routerLink: 'calificaciones/registro-individual',

                    },
                    {
                        label: 'Convivencia Escolar Individual',
                        icon: 'pi pi-fw pi-align-justify',
                        routerLink: 'convivencia/registro-individual',

                    }
                ]
            };
            let consultas=
            {
                label: 'Consultas',
                icon: 'pi pi-fw pi-search',
                items: [
                    {
                        label: 'Notas Académicas',
                        icon: 'pi pi-fw pi-align-justify',
                        routerLink: 'calificaciones',

                    },
                    {
                        label: 'Logros Académicos',
                        icon: 'pi pi-fw pi-align-justify',
                        routerLink: 'logros-academicos',

                    }
                ]
            };


        if(rol=="1"){
            this.items.push(registro);
            this.items.push(consultas);
        }else{
            this.items.push(registro);
            this.items.push(operaciones);
            this.items.push(configuraciones);
        }





    }
}
