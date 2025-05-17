import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldwideComponent } from './worldwide.component';

describe('WorldwideComponent', () => {
  let component: WorldwideComponent;
  let fixture: ComponentFixture<WorldwideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorldwideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorldwideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
