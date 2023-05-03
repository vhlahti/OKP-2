import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';

interface ISignup {
    jwt: string;
    status: string;
}

@Component({
    selector: 'app-user-register',
    templateUrl: './user-register.component.html',
    styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent {
    public errorMessages: string[] = [];
    public signupForm!: FormGroup;

    constructor(private accountService: AccountService, private router: Router) { }

    ngOnInit(): void {
        this.signupForm = new FormGroup({
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

    onSignup() {
        this.errorMessages = [];
        const formData = new FormData();
        formData.append("Name", this.signupForm.get("Name").value);
        formData.append("Password", this.signupForm.get("Password").value);

        this.accountService
            .signup(formData)
            .subscribe({
                next: (res: ISignup) => {
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
