import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompraProductoComponent } from './compra-producto.component';

describe('CompraProductoComponent', () => {
  let component: CompraProductoComponent;
  let fixture: ComponentFixture<CompraProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompraProductoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompraProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
