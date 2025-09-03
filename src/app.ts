import { server } from "./server.js";
import { DataBaseModel } from "./model/DatabaseModel.js";
import dotenv from 'dotenv';

dotenv.config();

const port: number = parseInt(process.env.SERVER_PORT as string);

new DataBaseModel().testeConexao().then((resdb) => {
    if (resdb) {
        console.clear();
        console.log("Conexão com banco de dados realizada com sucesso !! :)");

        server.listen(port, () => {
            console.log(`Servidor iniciado no endereço ${process.env.SERVER_PORT}:${port}`);
        });
    } else {
        console.log("Erro ao conectar com o banco de dados :(");
    }
});