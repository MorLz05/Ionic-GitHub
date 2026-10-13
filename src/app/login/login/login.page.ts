import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonIcon, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
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
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const code = params['code'];

      if (code) {
        console.log('¡Usuario autorizado en GitHub! Código temporal recibido:', code);

        // 1. Guardas el estado de sesión (temporalmente en localStorage para probar)
        localStorage.setItem('github_code', code);
        localStorage.setItem('isLoggedIn', 'true');

        // 2. Rediriges al usuario a la pantalla principal
        this.router.navigate(['/home'], { replaceUrl: true });
      }
    });
  }
  loginConGitHub(){
    const redirectUri = encodeURIComponent('http://localhost:8100/login');
    const scope = encodeURIComponent('read:user user:email');
    // Redirige al usuario al formulario oficial de login de GitHub
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${this.clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
  }
}