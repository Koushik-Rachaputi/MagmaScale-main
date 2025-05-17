import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-worldwide',
  imports: [CommonModule],
  templateUrl: './worldwide.component.html',
  styleUrl: './worldwide.component.css'
})
export class WorldwideComponent {
  companies = [
    { logo: 'assets/Stripe.png' },
    { logo: 'assets/deel.png' },
    { logo: 'assets/zapier.png' },
    { logo: 'assets/zepto.png' },
    { logo: 'assets/razorpay.png' },
    { logo: 'assets/reddit.png' },
    { logo: 'assets/podium.png' },
    { logo: 'assets/fivetran.png' },
    { logo: 'assets/convoy.png' },
    { logo: 'assets/flexport.png' }
  ];
}
