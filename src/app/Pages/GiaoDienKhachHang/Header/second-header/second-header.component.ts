import { Component, ElementRef, Inject, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { User } from '../../../Auth/models/user.model';
import { Router } from '@angular/router';
import { AuthService } from '../../../Auth/services/auth.service';

@Component({
  selector: 'app-second-header',
  templateUrl: './second-header.component.html',
  styleUrl: './second-header.component.css'
})
export class SecondHeaderComponent implements OnInit{
  user?:User;

  constructor(
    private router: Router, 
    private renderer: Renderer2, 
    private el: ElementRef, 
    @Inject(PLATFORM_ID) private platformId: Object,
    private authService:AuthService) {
  }
  ngOnInit(): void {
    if (typeof localStorage === 'undefined') {
      console.error('localStorage is not available');
      return;
    }

    this.authService.user()
    .subscribe({
      next:(response)=>{
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
