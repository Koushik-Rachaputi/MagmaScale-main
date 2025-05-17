import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { LayoutComponent } from './MyComponents/layout/layout.component';
import { ProcessComponent } from './MyComponents/process/process.component';
import { ForInvestorsComponent } from './MyComponents/for-investors/for-investors.component';
import { SuccessComponent } from './MyComponents/success/success.component';

// Define routes
export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,

    },
    { path: 'success', component: SuccessComponent },
    { path: '', redirectTo: '/', pathMatch: 'full' }
];


