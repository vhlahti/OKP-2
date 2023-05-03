import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';

interface ILogin {
    jwt: string;
    status: string;
}

@Component({
    selector: 'app-user-login',
    templateUrl: './user-login.component.html',
    styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
    public errorMessages: string[] = [];
    public loginForm!: FormGroup;

    constructor(private accountService: AccountService, private router: Router) { }

    ngOnInit(): void {
        this.loginForm = new FormGroup({
            Name: new FormControl('', [
                Validators.required,
                Validators.maxLength(16),
                Validators.pattern('^[^äö]*$'),
            ]),
            Password: new FormControl('', [
                Validators.required,
                Validators.pattern('^[^äö]*$'),
                Validators.minLength(5),
                Validators.maxLength(16),
            ]),
        });
    }

    onLogin() {
        this.errorMessages = [];
        const formData = new FormData();
        formData.append("Name", this.loginForm.get("Name").value);
        formData.append("Password", this.loginForm.get("Password").value);

        this.accountService
            .login(formData)
            .subscribe({
                next: (res: ILogin) => {
                    console.log(res);
                    // if login successful
                    if (res.status === 'Success') {
                        this.accountService.setToken(res.jwt);
                        this.router.navigate(['/']);
                    }
                },
                error: (error) => {
                    this.errorMessages = error.error.errors;
                    // handle the error here
                },
            });
    }
}
