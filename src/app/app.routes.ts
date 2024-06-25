import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CharacterDetailComponent } from './components/character-detail/character-detail.component';
import { AuthGuard } from './service/auth.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard]},
  { path: 'characters/:id', component: CharacterDetailComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];
