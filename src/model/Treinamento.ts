import { DataBaseModel } from "./DatabaseModel.js";

//recuperar conexao com o banco
const database = new DataBaseModel().pool;

//classe que representa um Aluno no sistema
export class Colaborador {

    private idColaborador: number = 0;
    private nome: string;
    private cpf: string;
    private email: string;
    private cargo: string;

    public constructor(_nome: string, _cpf: string, _email: string, _cargo: string) {
        this.nome = _nome;
        this.cpf = _cpf;
        this.email = _email;
        this.cargo = _cargo;
    }

    //método GET e SET

    public getIdColaborador(): number {
        return this.idColaborador;
    }
    public setIdColaborador(_idColaborador: number): void {
        this.idColaborador = _idColaborador;
    }


    public getNome() {
        return this.nome;
    }

    public setNome(_nome: string) {
        this.nome = _nome;
    }



    public getCpf() {
        return this.cpf;
    }

    public setCpf(_cpf: string) {
        this.cpf = _cpf;
    }

    public getEmail() {
        return this.email;
    }

    public setEmail(_email: string) {
        this.email = _email;
    }


    public getCargo() {
        return this.cargo;
    }

    public setCargo(_cargo: string) {
        this.cargo = _cargo;
    }

    // MÉTODO PARA ACESSAR O BANCO DE DADOS
    // CRUD Create - READ - Update - Delete

    static async listarColaboradores(): Promise<Array<Colaborador> | null> {
        let listaDeColaboradores: Array<Colaborador> = [];

        try {
            const querySelecColaborador = `SELECT * FROM colaborador;`;
            const respostaBD = await database.query(querySelecColaborador);

            respostaBD.rows.forEach((colaborador: any) => {
                let novoColaborador = new Colaborador(
                    colaborador.nome,
                    colaborador.cpf,
                    colaborador.email,
                    colaborador.cargo,
                );

                novoColaborador.setIdColaborador(colaborador.id_colaborador);

                listaDeColaboradores.push(novoColaborador);
            });

            return listaDeColaboradores;
        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}`);
            return null;
        }
    }

    static async cadastrarColaborador(colaborador: Colaborador): Promise<Boolean> {
        try {

            const queryInsertColaborador = `INSERT INTO colaborador (nome, cpf, email, cargo)
                                      VALUES (
                                            '${colaborador.getNome().toUpperCase()}',
                                            '${colaborador.getCpf().toUpperCase()}',
                                            '${colaborador.getEmail().toUpperCase()}',
                                            '${colaborador.getCargo().toUpperCase()}'
                                            )
                                            RETURNING id_colaborador;`;

            const result = await database.query(queryInsertColaborador);

            if (result.rows.length > 0) {

                console.log(`Colaborador cadastrado com sucesso. ID: ${result.rows[0].id_colaborador}`);
                return true;
            }

            return false;

        } catch (error) {
            console.log(`Erro ao cadastrar Colaborador: ${error}`);
            return false;
        }
    }

    static async removerColaborador(id_colaborador: number): Promise<Boolean> {
        let queryResult = false;

        try {
            const queryDeleteColaborador = `DELETE FROM colaborador WHERE id_colaborador= ${id_colaborador};`;
            await database.query(queryDeleteColaborador).then((result: any) => {
                if (result.rowCount != 0) { queryResult = true; };
            });

            return queryResult;
        } catch (error) {
            console.log(`Erro na consulta: ${error}`);
            return queryResult;
        }
    }

    static async atualizaColaborador(colaborador: Colaborador): Promise<Boolean> {
        let queryResult = false;

        try {
            const queryAtualizarColaborador = `UPDADE colaborador SET
                                         nome = '${colaborador.getNome().toUpperCase()}', 
                                         cpf = '${colaborador.getCpf().toUpperCase()}',
                                         email = '${colaborador.getEmail()}',
                                         cargo = '${colaborador.getCargo().toUpperCase()}',
                                        WHERE id_colaborador = ${colaborador.idColaborador};`;

            await database.query(queryAtualizarColaborador).then((result: any) => {
                if (result.rowCount != 0) { queryResult = true; }
            });
            return queryResult;
        } catch (error) {
            console.log(`Erro na consulta: ${error}`);
            return queryResult;
        }
    }

}

