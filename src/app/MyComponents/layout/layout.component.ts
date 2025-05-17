import { Component, HostListener } from '@angular/core';
import { ProcessComponent } from '../process/process.component';
import { ComeOnBoardComponent } from '../come-on-board/come-on-board.component';
import { DiscoverComponent } from '../discover/discover.component';
import { ApproachComponent } from '../approach/approach.component';
import { WorldwideComponent } from '../worldwide/worldwide.component';
import { ForInvestorsComponent } from '../for-investors/for-investors.component';
import { FounderInvestorsComponent } from '../founder-investors/founder-investors.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule, Router } from '@angular/router';
import { ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule,ProcessComponent, ComeOnBoardComponent, DiscoverComponent, ApproachComponent, WorldwideComponent, ForInvestorsComponent,
    FounderInvestorsComponent, FooterComponent, RouterModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  navbarOpen = false;
  showDropdown = false;

  constructor(
    public authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.profile-icon')) {
      this.showDropdown = false;
    }
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  
  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.showDropdown = !this.showDropdown;
  }

  logout() {
    this.http.get('http://localhost:3000/auth/logout', { withCredentials: true })
      .subscribe({
        next: () => {
          this.authService.clearUser();
          this.router.navigate(['/']);
        },
        error: () => {
          this.authService.clearUser();
          this.router.navigate(['/']);
        }
      });
  }
  
  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
     
    }
  }
  
}
