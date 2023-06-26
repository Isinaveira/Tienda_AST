import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaUserComponent } from './consulta-user.component';

describe('ConsultaUserComponent', () => {
  let component: ConsultaUserComponent;
  let fixture: ComponentFixture<ConsultaUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
