import { Component, OnInit } from '@angular/core';
import { User } from '../../../Auth/models/user.model';
import { AuthService } from '../../../Auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-sidebar',
  templateUrl: './main-sidebar.component.html',
  styleUrl: './main-sidebar.component.css'
})
export class MainSidebarComponent implements OnInit{

  user?:User;

  constructor(private authService:AuthService,private router:Router){}

  ngOnInit(): void {
    this.authService.user()
    .subscribe({
      next: (response) => {
        this.user = response;
      }
    });

    this.user = this.authService.getUser();
}

onLogout():void{
  this.authService.logout();
  this.router.navigateByUrl('/');
}

}
