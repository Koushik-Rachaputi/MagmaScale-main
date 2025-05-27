import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-come-on-board',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './come-on-board.component.html',
  styleUrl: './come-on-board.component.css'
})
export class ComeOnBoardComponent implements OnInit {
  formData = {
    role: '',
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
    country: '',
    city: '',
    startupName: '',
    websiteURL: '',
    currentState: '',
    lookingFor: '',
    companyLinkedIn: '',
    foundersLinkedIn: '',
    industry: '',
    problemSolved: '',
    startupDescription: '',
    targetMarket: '',
    numberOfCustomers: '',
    revenueCurrency: '',
    revenueAmount: '',
    raisedFunding: 'false',
    fundingCurrency: '',
    fundingAmount: '',
    heardFrom: '',
    additionalInfo: '',
    pitchDeck: ''
  };
  
  selectedFile: File | null = null;
  isSubmitting = false;
  submitError: string | null = null;
  submitSuccess = false;
  fileUploadSuccess = false;
  fileUploadError: string | null = null;
  isDragging = false;

  constructor(
    private apiService: ApiService,
    public authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  login() {
    window.location.href = 'http://localhost:3000/auth/google';
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const params = new URLSearchParams(window.location.search);
      const userStr = params.get('user');
      if (userStr) {
        try {
          const user = JSON.parse(decodeURIComponent(userStr));
          this.authService.setUser(user);
          // Optionally, remove user param from URL
          window.history.replaceState({}, document.title, window.location.pathname);
        } catch {}
      }

      // Check for stored form data when component initializes
      const storedFormData = localStorage.getItem('pendingFormData');
      if (storedFormData) {
        this.formData = JSON.parse(storedFormData);
      }
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      const file = files[0];
      this.validateAndSetFile(file);
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.validateAndSetFile(file);
    }
  }

  private validateAndSetFile(file: File) {
    const allowedTypes = ['application/pdf', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'];
    if (allowedTypes.includes(file.type) && file.size <= 30 * 1024 * 1024) {
      this.selectedFile = file;
      this.fileUploadSuccess = true;
      this.fileUploadError = null;
      // Hide success message after 3 seconds
      setTimeout(() => {
        this.fileUploadSuccess = false;
      }, 3000);
    } else {
      this.fileUploadError = 'Invalid file! Only PDF or PPT files under 30MB are allowed.';
      // Hide error message after 5 seconds
      setTimeout(() => {
        this.fileUploadError = null;
      }, 5000);
    }
  }

  removeFile() {
    this.selectedFile = null;
    this.fileUploadSuccess = false;
    this.fileUploadError = null;
  }

  onSubmit() {
    if (this.isSubmitting) return;

    // Check if user is logged in
    if (!this.authService.user) {
      // Store form data in localStorage before redirecting
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('pendingFormData', JSON.stringify(this.formData));
      }
      // Redirect to Google login
      window.location.href = 'http://localhost:3000/auth/google';
      return;
    }

    this.isSubmitting = true;
    this.submitError = null;
    this.submitSuccess = false;

    const formDataToSend = new FormData();

    // Append all form fields with proper type conversion
    Object.keys(this.formData).forEach(key => {
      let value = this.formData[key as keyof typeof this.formData];
      
      // Convert numeric fields
      if (key === 'fundingAmount' || key === 'revenueAmount' || key === 'numberOfCustomers') {
        // Only append if it's a valid number
        if (value && !isNaN(Number(value))) {
          formDataToSend.append(key, Number(value).toString());
        } else {
          formDataToSend.append(key, '0'); // Default to 0 if invalid
        }
      } else {
        formDataToSend.append(key, value);
      }
    });

    // Append file if selected
    if (this.selectedFile) {
      formDataToSend.append('pdfFile', this.selectedFile);
    }

    this.apiService.submitApplication(formDataToSend).subscribe({
      next: (response) => {
        console.log('Form submitted successfully', response);
        this.submitSuccess = true;
        this.isSubmitting = false;
        // Clear stored form data after successful submission
        if (isPlatformBrowser(this.platformId)) {
          localStorage.removeItem('pendingFormData');
        }
        // Redirect to a success page after 2 seconds
        setTimeout(() => {
          this.router.navigate(['/success']);
        }, 2000);
        // Reset form
        this.formData = {
          role: '',
          fullName: '',
          phoneNumber: '',
          emailAddress: '',
          country: '',
          city: '',
          startupName: '',
          websiteURL: '',
          currentState: '',
          lookingFor: '',
          companyLinkedIn: '',
          foundersLinkedIn: '',
          industry: '',
          problemSolved: '',
          startupDescription: '',
          targetMarket: '',
          numberOfCustomers: '',
          revenueCurrency: '',
          revenueAmount: '',
          raisedFunding: 'false',
          fundingCurrency: '',
          fundingAmount: '',
          heardFrom: '',
          additionalInfo: '',
          pitchDeck: ''
        };
        this.selectedFile = null;
      },
      error: (error) => {
        console.error('Error submitting form', error);
        this.submitError = error.error?.message || 'Failed to submit form. Please try again.';
        this.isSubmitting = false;
        
        // Log detailed error information
        if (error.status === 0) {
          console.error('Network error - Is the backend server running?');
        } else if (error.status === 404) {
          console.error('API endpoint not found - Check the URL');
        } else if (error.status === 500) {
          console.error('Server error - Check backend logs');
        }
      }
    });
  }
}
