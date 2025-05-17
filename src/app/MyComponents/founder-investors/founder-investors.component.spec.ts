import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FounderInvestorsComponent } from './founder-investors.component';

describe('FounderInvestorsComponent', () => {
  let component: FounderInvestorsComponent;
  let fixture: ComponentFixture<FounderInvestorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FounderInvestorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FounderInvestorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
