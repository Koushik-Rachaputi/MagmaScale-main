import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComeOnBoardComponent } from './come-on-board.component';

describe('ComeOnBoardComponent', () => {
  let component: ComeOnBoardComponent;
  let fixture: ComponentFixture<ComeOnBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComeOnBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComeOnBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
