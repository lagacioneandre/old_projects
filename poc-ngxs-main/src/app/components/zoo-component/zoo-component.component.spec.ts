import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZooComponentComponent } from './zoo-component.component';

describe('ZooComponentComponent', () => {
  let component: ZooComponentComponent;
  let fixture: ComponentFixture<ZooComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZooComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZooComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
