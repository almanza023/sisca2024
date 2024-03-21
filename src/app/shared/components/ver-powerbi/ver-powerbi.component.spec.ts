import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPowerbiComponent } from './ver-powerbi.component';

describe('VerPowerbiComponent', () => {
  let component: VerPowerbiComponent;
  let fixture: ComponentFixture<VerPowerbiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerPowerbiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerPowerbiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
