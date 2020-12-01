import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscotecaPreview.TsComponent } from './discoteca-preview.ts.component';

describe('DiscotecaPreview.TsComponent', () => {
  let component: DiscotecaPreview.TsComponent;
  let fixture: ComponentFixture<DiscotecaPreview.TsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscotecaPreview.TsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscotecaPreview.TsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
