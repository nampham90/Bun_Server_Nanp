import { format} from 'date-fns'

export default class Logger{
    private logFilePath: string;
    constructor() {
        this.logFilePath = this.getLogfilePath();

    }

    private getLogfilePath(): string {
        const now =new Date();
        const dataPart =  `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate()}`;
        const path = 'logs/'+dataPart+'.txt';
        return path;
    }

    async logError(message: unknown) {
        const currentTime = new Date();
        const formattedTime = format(currentTime, 'dd-MM-yyyy HH:mm:ss');
        const logMessage = `${formattedTime} - : ${message}\n`;
        const file = Bun.file(this.logFilePath);
        const curentMsg = await file.text();
        const writer = file.writer();
        writer.write(curentMsg+logMessage);
        writer.flush();
    }
}