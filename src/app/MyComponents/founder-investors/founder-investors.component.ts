import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-founder-investors',
  imports: [CommonModule],
  templateUrl: './founder-investors.component.html',
  styleUrl: './founder-investors.component.css'
})
export class FounderInvestorsComponent {
  testimonials = [
    {
      image: 'assets/review1.png',
      text: '“Scaling Startups was a game-changer for us. They not only helped us secure our seed round but also worked hand-in-hand to refine our business model and scale operations.”',
      name: 'Priya Sinha',
      role: 'Founder of TechNova'
    },
    {
      image: 'assets/review2.png',
      text: '“As an investor, I trust startups coming through Scaling Startups. They’re well-prepared, growth-ready, and backed by real execution support.”',
      name: 'Neha Mathur',
      role: 'Angel Investor'
    },
    {
      image: 'assets/review1.png',
      text: '“From idea validation to traction, the team’s expertise helped us hit key milestones that made fundraising smooth and successful.”',
      name: 'Priya Sinha',
      role: 'Founder of TechNova'
    },
    {
      image: 'assets/review3.png',
      text: '“From idea validation to traction, the team’s expertise helped us hit key milestones that made fundraising smooth and successful.”',
      name: 'Rahul Kumar',
      role: 'CEO of GreenCart'
    }
  ];  

}
