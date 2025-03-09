import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSignComponent } from './login-sign.component';

describe('LoginSignComponent', () => {
  let component: LoginSignComponent;
  let fixture: ComponentFixture<LoginSignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginSignComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginSignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
