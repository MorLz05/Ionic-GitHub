import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonIcon
} from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
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
  clientId = 'Ov23liqfSnS5z0mnWSUc';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    addIcons({
      'person-circle-outline': personCircleOutline
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(async (params) => {
    const code = params['code'];
    if (code) {
      console.log('Código recibido de GitHub:', code);
      try {
        const response = await fetch('http://localhost/api-login-ionic/github-auth.php', {
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
    });
  }

  loginConGitHub() {
    const redirectUri = encodeURIComponent('http://localhost:8100/login');
    const scope = encodeURIComponent('read:user user:email');
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${this.clientId}&redirect_uri=${redirectUri}&scope=${scope}&prompt=consent`;
  }
}