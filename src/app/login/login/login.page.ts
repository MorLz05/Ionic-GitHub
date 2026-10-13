import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonIcon, 
  IonTitle, 
  IonToolbar, 
  IonItem, 
  IonLabel, 
  IonInput, 
  IonButton 
} from '@ionic/angular';
import { IonContent, IonHeader, IonIcon, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonIcon,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
  ]
})
export class LoginPage implements OnInit {
  clientId = 'Ov23li5VkBcm2RNqATHl';

  constructor(
    private route: ActivatedRoute, 
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(async (params) => {
      const code = params['code'];

      if (code) {
        console.log('Código recibido de GitHub:', code);

        try {
          // Llamada directa a tu servidor PHP local
          const response = await fetch('http://localhost/api-login-ionic/github-auth.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code })
          });

          const userData = await response.json();
          console.log('Perfil obtenido de GitHub:', userData);

          if (userData && (userData.login || userData.name)) {
            // Se toma el nombre visible o el alias/username de GitHub
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
    const scope = encodeURIComponent('read:user user:email');
    // Redirige al usuario al formulario oficial de login de GitHub
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${this.clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
  }
}