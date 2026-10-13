import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { personOutline, informationCircleOutline, logOutOutline } from 'ionicons/icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonIcon]
})
export class MenuPage implements OnInit {
  nombreUsuario: string = 'USUARIO';

  constructor(private router: Router) {
    addIcons({
      'person-outline': personOutline,
      'information-circle-outline': informationCircleOutline,
      'log-out-outline': logOutOutline
    });
  }

  ngOnInit() {
    // Lee el nombre guardado tras iniciar sesión
    const usuarioGuardado = localStorage.getItem('user_name');
    if (usuarioGuardado) {
      this.nombreUsuario = usuarioGuardado;
    }
  }

  irAAcercaDe() {
    // Ruta hacia tu vista de acerca de / conóceme
    this.router.navigate(['/pages/conoceme/Josue']);
  }

  cerrarSesion() {
    // 1. Limpiar las credenciales y datos de sesión
    localStorage.removeItem('github_code');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user_name');

    // 2. Redirigir a login reemplazando el historial
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}