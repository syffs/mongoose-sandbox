import { MongoMemoryServer } from "mongodb-memory-server";

class DBManager {
    private _server: MongoMemoryServer;
    private static _instance: DBManager;
    static getInstance(): DBManager {
        if (!this._instance) {
            this._instance = new DBManager();
        }
        return this._instance;
    }

    private constructor() {}
    async start(): Promise<string> {
        this._server = await MongoMemoryServer.create();
        return this._server.getUri();
    }
    async stop() {
        return await this._server.stop();
    }
}

export const mongoDatabase = DBManager.getInstance();
