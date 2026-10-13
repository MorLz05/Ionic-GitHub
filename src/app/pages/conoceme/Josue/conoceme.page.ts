import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
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

@Component({
  selector: 'app-conoceme',
  templateUrl: './conoceme.page.html',
  styleUrls: ['./conoceme.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonIcon]
})
export class ConocemePage {

  constructor() {
    addIcons({
      'arrow-back-outline': arrowBackOutline,
      'person-outline': personOutline,
      'school-outline': schoolOutline,
      'book-outline': bookOutline,
      'reader-outline': readerOutline,
      'information-circle-outline': informationCircleOutline
    });
  }

  regresar() {
    // Sin funcionalidad por ahora, solo placeholder
    console.log('Botón regresar presionado');
  }
}
