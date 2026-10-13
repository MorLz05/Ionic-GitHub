import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personOutline, informationCircleOutline, logOutOutline } from 'ionicons/icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonIcon]
})
export class MenuPage {

  constructor() {
    addIcons({
      'person-outline': personOutline,
      'information-circle-outline': informationCircleOutline,
      'log-out-outline': logOutOutline
    });
  }

  irAAcercaDe() {
    console.log('Boton Acerca de presionado');
  }

  cerrarSesion() {
    console.log('Boton Logout presionado');
  }
}
