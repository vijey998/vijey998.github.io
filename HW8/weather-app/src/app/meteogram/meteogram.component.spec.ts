import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeteogramComponent } from './meteogram.component';

describe('MeteogramComponent', () => {
  let component: MeteogramComponent;
  let fixture: ComponentFixture<MeteogramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeteogramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeteogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
