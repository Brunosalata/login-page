import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [],
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.scss'
})
export class UnauthorizedComponent implements OnInit {

   countdown: number = 5;

   constructor(private router: Router) {}

   ngOnInit(): void {
     const interval = setInterval(() => {
       this.countdown--;
       if (this.countdown === 0) {
         clearInterval(interval);
         this.router.navigate(['/login']);
       }
     }, 1000);
   }
}
