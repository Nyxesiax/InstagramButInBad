import { DetailWindowComponent } from './detail-window.component';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

describe('DetailWindowComponent', () => {
  let component: DetailWindowComponent;
  let fixture: ComponentFixture<DetailWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
