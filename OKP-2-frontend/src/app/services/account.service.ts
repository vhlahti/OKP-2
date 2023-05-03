import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject, map, of } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { IUser } from '../models/IUser';

interface IJWT {
    nameid: string;
    role: string;
}

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    baseUrl = environment.apiUrl;
    private currentUserSource = new ReplaySubject<IUser>(null);
    currentUser$ = this.currentUserSource.asObservable();

    constructor(private http: HttpClient) { }

    loadCurrentUser(token: string | null) {
        if (token === null) {
            this.currentUserSource.next(null);
            return of(null);
        }
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', `Bearer ${token}`);
        return this.http.get(this.baseUrl, { headers }).pipe(
            map((user: IUser) => {
                if (user) {
                    localStorage.setItem('token', user.token);
                    this.currentUserSource.next(user);
                }
            })
        );
    }

    signup(formData: FormData) {
        return this.http.post(this.baseUrl + 'signup', formData);
    }

    login(formData: FormData) {
        return this.http.post(this.baseUrl + 'login', formData)
    }

    logout() {
        localStorage.removeItem('token');
        this.currentUserSource.next(null);
    }

    public setToken(token: string) {
        localStorage.removeItem('token');
        localStorage.setItem('token', token);
    }

    public getToken() {
        return localStorage.getItem('token') ?? '';
    }

    public getUsername() {
        const token = this.getToken();
        if (!token) return "";
        const payload = this.decodeJWT(token).payload as IJWT;
        return payload.nameid;
    }

    public getRole() {
        const token = this.getToken();
        if (!token) return "guest";
        const payload = this.decodeJWT(token).payload as IJWT;
        return payload.role;
    }

    private decodeJWT(token: string) {
        var arr = token.split('.');
        return { header: JSON.parse(atob(arr[0])), payload: JSON.parse(atob(arr[1])), secret: arr[2] }
    }

    getFavorites(token: string | null) {
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', `Bearer ${token}`);
        return this.http.get(this.baseUrl + 'favorites', { headers }).pipe(
            map((user: IUser) => {
                if (user) {
                    localStorage.setItem('token', user.token);
                    this.currentUserSource.next(user);
                }
            })
        );
    }
}
