import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  personOutline,
  schoolOutline,
  bookOutline,
  readerOutline,
  informationCircleOutline
} from 'ionicons/icons';

// Tipo para tipar cada persona
interface Persona {
  slug: string;
  nombre: string;
  rol: string;
  grado: string;
  carrera: string;
  materia: string;
  descripcion: string;
}

@Component({
  selector: 'app-conoceme',
  templateUrl: './conoceme.page.html',
  styleUrls: ['./conoceme.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonIcon]
})
export class ConocemePage implements OnInit {

  personas: Persona[] = [
    {
      slug: 'Josue',
      nombre: 'Josué Isaac ML',
      rol: 'TSU. DSM',
      grado: '10° "B"',
      carrera: 'Ing. DyGS',
      materia: 'Desarrollo Móvil Integral',
      descripcion: 'Alumno de la UTSelva, cursador del 10 cuatrimestre de la carrera de Ingeniería en Desarrollo y Gestión de Software. Apasionado por la tecnología y el desarrollo de aplicaciones móviles, con habilidades en programación y diseño de interfaces. Siempre en busca de aprender nuevas tecnologías y mejorar mis habilidades en el desarrollo de software.'
    },
    {
      slug: 'Aldo',
      nombre: 'Aldo César PP',
      rol: 'TSU. DSM',
      grado: '10° "B"',
      carrera: 'Ing. DyGS',
      materia: 'Desarrollo Móvil Integral',
      descripcion: 'Compañero de equipo en el proyecto. Interesado en el desarrollo backend y las bases de datos. Le gusta resolver problemas complejos con soluciones simples.'
    },
    {
      slug: 'Adrian',
      nombre: 'Luis Adrián HP',
      rol: 'TSU. DSM',
      grado: '10° "B"',
      carrera: 'Ing. DyGS',
      materia: 'Desarrollo Móvil Integral',
      descripcion: 'Integrante del equipo enfocado en el diseño de interfaces y experiencia de usuario. Le apasiona crear aplicaciones con estéticas limpias y funcionales.'
    },
    {
      slug: 'Diego',
      nombre: 'Luis Diego RH',
      rol: 'TSU. DSM',
      grado: '10° "B"',
      carrera: 'Ing. DyGS',
      materia: 'Desarrollo Móvil Integral',
      descripcion: 'Compañero del equipo, interesado en DevOps y despliegue de aplicaciones. Siempre dispuesto a aprender nuevas herramientas y metodologías.'
    }
  ];

  personaActual!: Persona;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    addIcons({
      'arrow-back-outline': arrowBackOutline,
      'person-outline': personOutline,
      'school-outline': schoolOutline,
      'book-outline': bookOutline,
      'reader-outline': readerOutline,
      'information-circle-outline': informationCircleOutline
    });
  }

  ngOnInit() {
    // Escuchar el parámetro :persona de la URL
    this.route.paramMap.subscribe(params => {
      const slug = params.get('persona') ?? 'Josue';
      const encontrada = this.personas.find(p => p.slug === slug);
      this.personaActual = encontrada ?? this.personas[0];
    });
  }

  // Cambiar de tab y navegar
  cambiarPersona(slug: string) {
    this.router.navigate(['/pages/conoceme', slug]);
  }

  regresar() {
    this.router.navigate(['/menu']);
  }
}
