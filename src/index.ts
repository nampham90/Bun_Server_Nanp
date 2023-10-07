
import express, {Application} from 'express';
import cors, { CorsOptions } from 'cors';
import {Server as HttpServer} from 'http';
import {Server as SocketIOServer} from 'socket.io';
import Routes from './routes';
import Database from './db';
import helmet from "helmet";
import * as bodyParser from "body-parser";
export default class Server {
    private app: Application;
    private httpServer: HttpServer;
    private io: SocketIOServer;
    constructor(app: Application) {
        this.app = app;
        this.httpServer = new HttpServer(app);
        this.io = new SocketIOServer(this.httpServer);
        this.config();
        this.syncDatabase();
        new Routes(app);
    }

    private config() :void {
        const corsOptions: CorsOptions = {
            origin: "http://localhost:8080", // Thay đổi origin tùy theo nhu cầu của bạn
            methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Các phương thức được phép
            credentials: true, // Cho phép gửi cookie và thông tin xác thực qua CORS
            optionsSuccessStatus: 204, // Trạng thái thành công khi gửi yêu cầu OPTIONS
        }

        this.app.use(cors(corsOptions));
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(bodyParser.json());
        this.app.use(express.urlencoded({extended: true}));
    }

    private syncDatabase(): void {
        const db = new Database();
        db.sequelize?.sync();
    }

    start(port: number): void {
        this.httpServer.listen(port, () => {
          console.log(`Server is running on port ${port}`);
        });
    
       // const socketService = new SocketService(this.io);
    }
}

