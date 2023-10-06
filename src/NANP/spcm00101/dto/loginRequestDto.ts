import {Request} from "express";
export class LoginRequestDto {
    private username: string;
    private password: string;

    constructor(req: Request) {
        this.username = req.body.username;
        this.password = req.body.password;
    }

    getUsername() {
        return this.username;
    }

    setUsername(username: string) {
        this.username = username;
    }

    getPassword() {
        return this.password;
    }

    setPassword(password: string) {
        this.password = password;
    }
}