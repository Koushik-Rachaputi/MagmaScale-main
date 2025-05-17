import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-process',
  imports: [CommonModule],
  templateUrl: './process.component.html',
  styleUrl: './process.component.css'
})
export class ProcessComponent {
  options = [
    { name: 'For Funding & Investment Readiness', image: 'funding.png' },
    { name: 'For MVP & Product Development', image: 'mvp.png' },
    { name: 'For Growth & Traction', image: 'growth.png' },
    { name: 'For Legal Readiness', image: 'legal.png' },
    { name: 'Bespoke Solutions', image: 'bespoke.png' }
  ];
  
  selectedOption: string = 'funding.png';

  changeImage(image: string) {
    this.selectedOption = image;
  }
}
