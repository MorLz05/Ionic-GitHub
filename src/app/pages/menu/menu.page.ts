import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
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
    const usuarioGuardado = localStorage.getItem('user_name');
    if (usuarioGuardado) {
      this.nombreUsuario = usuarioGuardado;
    }
  }

  irAAcercaDe() {
    this.router.navigate(['/pages/conoceme/Josue']);
  }

  cerrarSesion() {
    localStorage.removeItem('github_code');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user_name');
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
