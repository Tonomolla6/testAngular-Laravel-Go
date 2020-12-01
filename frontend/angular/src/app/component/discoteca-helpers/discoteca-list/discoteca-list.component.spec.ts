import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscotecaListComponent } from './discoteca-list.component';

describe('DiscotecaListComponent', () => {
  let component: DiscotecaListComponent;
  let fixture: ComponentFixture<DiscotecaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscotecaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscotecaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
