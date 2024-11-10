import { Server } from "http";
import app from "./app";
import { localConfig } from "./config";

let server : Server;

const main = async() => {
    server = app.listen(localConfig.port, () => {
        console.log('Server listening on port: ', localConfig.port);
    })
}

main();