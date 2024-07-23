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
                icon: 'pi pi-plus',
                items: [
                    {
                        label: 'Matriculas',
                        icon: 'pi pi-fw pi-align-justify',
                        routerLink: 'matriculas',

                    },
                    {
                        label: 'Docentes',
                        icon: 'pi pi-fw pi-align-justify',
                        routerLink: 'docentes',

                    },
                    {
                        label: 'Direcciones de Grado',
                        icon: 'pi pi-fw pi-align-justify',
                        routerLink: 'direccion-grados',

                    },
                    {
                        label: 'Carga Académica',
                        icon: 'pi pi-fw pi-align-justify',
                        routerLink: 'cargas',
                    },
                    {
                        label: 'Apertura Periodos',
                        icon: 'pi pi-fw pi-align-justify',
                        routerLink: 'apertura-periodos',
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
                        label: 'Calificación Individual',
                        icon: 'pi pi-fw pi-align-justify',
                        routerLink: 'calificaciones/registro-individual',

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

                    {
                        label: 'Convivencia Escolar Individual',
                        icon: 'pi pi-fw pi-align-justify',
                        routerLink: 'convivencia/registro-individual',

                    },
                    {
                        label: 'Nivelaciones',
                        icon: 'pi pi-fw pi-align-justify',
                        routerLink: 'nivelaciones',
                    },
                    {
                        label: 'Usuarios',
                        icon: 'pi pi-fw pi-align-justify',
                        routerLink: 'usuarios',

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
                        label: 'Nivelaciones de Periodo',
                        icon: 'pi pi-fw pi-align-justify',
                        routerLink: 'nivelaciones/registro/guardar',

                    }
                ]
            };
            let registroAdmin=
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

                    },
                    {
                        label: 'Nivelaciones de Periodo',
                        icon: 'pi pi-fw pi-align-justify',
                        routerLink: 'nivelaciones/registro/guardar',

                    }
                ]
            };
            let actualizar=
            {
                label: 'Actualizar',
                icon: 'pi pi-file-edit',
                items: [
                    {
                        label: 'Logros Académicos',
                        icon: 'pi pi-fw pi-align-justify',
                        routerLink: 'logros-academicos/registro',

                    },
                    {
                        label: 'Notas Académicas',
                        icon: 'pi pi-fw pi-align-justify',
                        routerLink: 'calificaciones/registro/editar',

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

                    },
                    {
                        label: 'Nivelaciones de Periodo',
                        icon: 'pi pi-fw pi-align-justify',
                        routerLink: 'nivelaciones',

                    },
                ]
            };
        let migrupo=
            {
                label: 'Mi Grupo',
                icon: 'pi pi-user',
                items: [
                    {
                        label: 'Logros Disciplinarios',
                        icon: 'pi pi-fw pi-align-justify',
                        routerLink: 'logros-disciplinarios/registro',

                    },
                    {
                        label: 'Convivencia Escolar',
                        icon: 'pi pi-fw pi-align-justify',
                        routerLink: 'convivencia/registro/guardar',

                    },
                    {
                        label: 'Boletines de Periodo',
                        icon: 'pi pi-fw pi-align-justify',
                        routerLink: 'reportes/boletin-periodo',

                    },
                    {
                        label: 'Reportes Generales',
                        icon: 'pi pi-fw pi-align-justify',
                        routerLink: 'reportes',

                    },

                ]
            };
            let preescolar=
            {
                label: 'Mi Grupo Preescolar',
                icon: 'pi pi-user',
                items: [
                    {
                        label: 'Valoraciones',
                        icon: 'pi pi-fw pi-align-justify',
                        routerLink: 'valoraciones/registro',

                    },
                    {
                        label: 'Registro Desarrollos',
                        icon: 'pi pi-fw pi-align-justify',
                        routerLink: 'preescolar/registro',

                    },
                    {
                        label: 'Boletines de Periodo',
                        icon: 'pi pi-fw pi-align-justify',
                        routerLink: 'reportes/boletin-periodo',

                    },

                ]
            };

            let reportes=
            {
                label: 'Reportes',
                icon: 'pi pi-chart-bar',
                items: [
                    {
                        label: 'Agrupados',
                        icon: 'pi pi-fw pi-align-justify',
                        routerLink: 'reportes',

                    },
                    {
                        label: 'Boletines de Periodo',
                        icon: 'pi pi-fw pi-align-justify',
                        routerLink: 'reportes/boletin-periodo',

                    },

                ]
            };

            let perfil =
            {
                label: 'Perfil',
                icon: 'pi pi-users',
                routerLink: 'cambiar-clave',
            };

            let cerrar =
                {
                    label: 'Cerrar Sesión',
                    icon: 'pi pi-sign-out',
                    routerLink: 'auth',
                };



        if(rol=="1"){
            //Docentes Primaria y Secundaria
            this.items.push(registro);
            this.items.push(actualizar);
            this.items.push(consultas);
            let direcciones=JSON.parse(localStorage.getItem("direcciones")!);
            if(direcciones.length>0){
                this.items.push(migrupo);
            }
        }else if(rol=="2")
        {
            //Docentes de Preescolar
            this.items.push(preescolar);
            this.items.push(reportes);

        }
        else if(rol=="3")
        {
            //Administrador
            this.items.push(operaciones);
            this.items.push(registroAdmin);
            this.items.push(actualizar);
            this.items.push(consultas);
            this.items.push(migrupo);
            this.items.push(preescolar);
            this.items.push(reportes);
        }
        else if(rol=="4"){
            //Docente con todos los grupos
            this.items.push(registro);
            this.items.push(actualizar);
            this.items.push(consultas);
            let direcciones=JSON.parse(localStorage.getItem("direcciones")!);
            if(direcciones.length>0){
                this.items.push(migrupo);
            }
            this.items.push(preescolar);
        }

        this.items.push(perfil);
        this.items.push(cerrar);





    }
}
