import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  userName: string | null = null;

  constructor(private authService: AuthService, private location: Location) { }

  ngOnInit(): void {
    this.userName = this.authService.getLoggedInUserName();
  }

  goBack(): void {
    this.location.back();
  }

}
