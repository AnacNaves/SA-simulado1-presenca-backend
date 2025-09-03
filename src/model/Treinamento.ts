import { DataBaseModel } from "./DatabaseModel.js";

//recuperar conexao com o banco
const database = new DataBaseModel().pool;

//classe que representa um Aluno no sistema
export class Treinamento {

    private idTreinamento: number = 0;
    private titulo: string;
    private descricao: string;
    private cargaHoraria: string;
    private periodo: string;

    public constructor(_titulo: string, _descricao: string, _cargaHoraria: string, _periodo: string) {
        this.titulo = _titulo;
        this.descricao = _descricao;
        this.cargaHoraria = _cargaHoraria;
        this.periodo = _periodo;
    }

    //método GET e SET

    public getIdTreinamento(): number {
        return this.idTreinamento;
    }
    public setIdTreinamento(_idTreinamento: number): void {
        this.idTreinamento = _idTreinamento;
    }


    public getTitulo() {
        return this.titulo;
    }

    public setTitulo(_titulo: string) {
        this.titulo = _titulo;
    }


    public getDescricao() {
        return this.descricao;
    }

    public setDescricao(_descricao: string) {
        this.descricao = _descricao;
    }


    public getCargaHoraria() {
        return this.cargaHoraria;
    }

    public setCargaHoraria(_cargaHoraria: string) {
        this.cargaHoraria = _cargaHoraria;
    }


    public getPeriodo() {
        return this.periodo;
    }

    public setPeriodo(_periodo: string) {
        this.periodo = _periodo;
    }


    // MÉTODO PARA ACESSAR O BANCO DE DADOS
    // CRUD Create - READ - Update - Delete

    static async listarTreinamentos(): Promise<Array<Treinamento> | null> {
        let listaDeTreinamentos: Array<Treinamento> = [];

        try {
            const querySelecTreinamentos = `SELECT * FROM treinamento;`;
            const respostaBD = await database.query(querySelecTreinamentos);

            respostaBD.rows.forEach((treinamento: any) => {
                let novoTreinamento = new Treinamento(
                    treinamento.titulo,
                    treinamento.descricao,
                    treinamento.cargaHoraria,
                    treinamento.periodo,
                );

                novoTreinamento.setIdTreinamento(treinamento.id_treinamento);

                listaDeTreinamentos.push(novoTreinamento);
            });

            return listaDeTreinamentos;
        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}`);
            return null;
        }
    }


    static async cadastrarTreinamentos(treinamento: Treinamento): Promise<Boolean> {
        try {
            const queryInsertTreinamento = `INSERT INTO treinamento (titulo, descricao, carga_horaria, periodo)
                                      VALUES (
                                            '${treinamento.getTitulo().toUpperCase()}',
                                            '${treinamento.getDescricao().toUpperCase()}',
                                            '${treinamento.getCargaHoraria().toUpperCase()}',
                                            '${treinamento.getPeriodo().toUpperCase()}'
                                            )
                                            RETURNING id_treinamento;`;

            const result = await database.query(queryInsertTreinamento);
            if (result.rows.length > 0) {
                console.log(`Treinamento cadastrado com sucesso. ID: ${result.rows[0].id_ctreinamento}`);
                return true;
            }
            return false;
        } catch (error) {
            console.log(`Erro ao cadastrar Treinamento: ${error}`);
            return false;
        }
    }


    static async removerTreinamento(id_treinamento: number): Promise<Boolean> {
        let queryResult = false;

        try {
            const queryDeleteTreinamento = `DELETE FROM treinamento WHERE id_treinamento= ${id_treinamento};`;

            await database.query(queryDeleteTreinamento).then((result: any) => {
                if (result.rowCount != 0) { queryResult = true; };
            });

            return queryResult;
        } catch (error) {
            console.log(`Erro na consulta: ${error}`);
            return queryResult;
        }
    }


    static async atualizaTreinamento(treinamento: Treinamento): Promise<Boolean> {
        let queryResult = false;

        try {
            const queryAtualizarTreinamento = `UPDADE treinamentos SET
                                         titulo = '${treinamento.getTitulo().toUpperCase()}', 
                                         descricao = '${treinamento.getDescricao().toUpperCase()}',
                                         carga_horaria = '${treinamento.getCargaHoraria()}',
                                         periodo = '${treinamento.getPeriodo().toUpperCase()}',
                                        WHERE id_treinamentos = ${treinamento.idTreinamento};`;

            await database.query(queryAtualizarTreinamento).then((result: any) => {
                if (result.rowCount != 0) { queryResult = true; }
            });
            return queryResult;
        } catch (error) {
            console.log(`Erro na consulta: ${error}`);
            return queryResult;
        }
    }

}

