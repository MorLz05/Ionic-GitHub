import { Component, NgZone, OnInit } from '@angular/core';
import { App } from '@capacitor/app';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonIcon
} from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { addIcons } from 'ionicons';
import { personCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [
    IonContent,
    IonHeader,
    CommonModule,
    FormsModule,
    IonIcon,
  ]
})
export class LoginPage implements OnInit {
  clientId = 'Ov23liroFaQvzlBA7Zpk';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone
  ) {
    addIcons({
      'person-circle-outline': personCircleOutline
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['code']) {
        this.procesarCodigo(params['code']);
      }
    });

    if (Capacitor.isNativePlatform()) {
      App.addListener('appUrlOpen', ({ url }) => {
        const code = new URL(url).searchParams.get('code');
        if (code) {
          this.ngZone.run(() => this.procesarCodigo(code));
        }
      });
    }
  }

  private async procesarCodigo(code: string) {
    console.log('Código recibido de GitHub:', code);
    // En el emulador, localhost es el propio emulador; 10.0.2.2 apunta a la PC.
    const apiHost = Capacitor.isNativePlatform() ? '10.0.2.2' : 'localhost';
    try {
      const response = await fetch(`http://${apiHost}:8000/api-login-ionic/github-auth.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });

      const userData = await response.json();
      console.log('Perfil obtenido de GitHub:', userData);

      if (userData && (userData.login || userData.name)) {
        const nombreMostrar = userData.name || userData.login;

        localStorage.setItem('user_name', nombreMostrar);
        localStorage.setItem('github_code', code);
        localStorage.setItem('isLoggedIn', 'true');

        this.router.navigate(['/menu'], { replaceUrl: true });
      } else {
        console.error('Error al procesar usuario:', userData);
      }
    } catch (error) {
      console.error('Error al contactar el servidor local:', error);
    }
  }

  loginConGitHub() {
    const redirectUri = encodeURIComponent(
      Capacitor.isNativePlatform() ? 'io.ionic.starter://login' : 'http://localhost:8100/login'
    );
    const scope = encodeURIComponent('read:user user:email');
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${this.clientId}&redirect_uri=${redirectUri}&scope=${scope}&prompt=consent`;
  }
}