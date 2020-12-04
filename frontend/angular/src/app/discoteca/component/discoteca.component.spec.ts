import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscotecaComponent } from './discoteca.component';

describe('DiscotecaComponent', () => {
  let component: DiscotecaComponent;
  let fixture: ComponentFixture<DiscotecaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscotecaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscotecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
