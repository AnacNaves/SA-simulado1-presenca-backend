import { DataBaseModel } from "./DatabaseModel.js";

//recuperar conexao com o banco
const database = new DataBaseModel().pool;

//classe que representa um Aluno no sistema
export class Turma {

    private idTurma: number = 0;
    private idTreinamento: number;
    private dataInicio: Date;
    private dataFim: Date;

    public constructor(_idTreinamento: number, _dataInicio: Date, _dataFim: Date) {
        this.idTreinamento = _idTreinamento;
        this.dataInicio = _dataInicio;
        this.dataFim = _dataFim;
    }

    //método GET e SET

    public getIdTreinamento(): number {
        return this.idTreinamento;
    }
    public setIdTreinamento(_idTreinamento: number): void {
        this.idTreinamento = _idTreinamento;
    }


    public getDataInicio() {
        return this.dataInicio;
    }

    public setDataInicio(_dataInicio: Date) {
        this.dataInicio = _dataInicio;
    }


    public getDataFim() {
        return this.dataFim;
    }

    public setDataFim(_dataFim: Date) {
        this.dataFim = _dataFim;
    }


    // MÉTODO PARA ACESSAR O BANCO DE DADOS
    // CRUD Create - READ - Update - Delete

    static async listarTurmas(): Promise<Array<any> | null> {

        let listaDeTurmas: Array<any> = [];

        try {
            const querySelectTurmas =
                `SELECT t.id_turma, t.data_inicio, t.data_fim, tr.id_treinamento, tr.titulo, tr.descricao, tr.carga_horaria, tr.periodo
        FROM turma t
        INNER JOIN treinamento tr
        ON t.id_treinamento = tr.id_treinamento;`;

            const respostaBD = await database.query(querySelectTurmas);

            if (respostaBD.rows.length === 0) {
                return null;
            }

            const listaDeTurmas: any[] = [];

            respostaBD.rows.forEach((linha: any) => {
                const turma = {
                    idTurma: linha.id_turma,
                    dataInicio: linha.data_inicio,
                    dataFim: linha.data_fim,

                    treinamento: {
                        idTreinamento: linha.id_treinamento,
                        titulo: linha.titulo,
                        descricao: linha.descricao,
                        cargaHoraria: linha.carga_horaria,
                        periodo: linha.periodo
                    }
                };

                listaDeTurmas.push(turma);
            });
            return listaDeTurmas;

        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}`);
            return null;
        }
    }

    static async cadastrarTurma(idTreinamento: number, dataInicio: Date, dataFim: Date): Promise<any> {
        try {
            const queryInsertTurma =
                ` NSERT INTO turma (id_treinamento, data_inicio, data_fim)
                VALUES ($1, $2, $3) RETURNING id_turma;`;

            const valores = [idTreinamento, dataInicio, dataFim];

            const resultado = await database.query(queryInsertTurma, valores);

            if (resultado.rowCount != 0) {

                console.log(`Turma cadastrado com sucesso! ID: ${resultado.rows[0].id_turma}`);
                return resultado.rows[0].id_turma;

            } return false;

        } catch (error) {
            console.error(`Erro ao cadastrar Turma: ${error}`);
            throw new Error('Erro ao cadastrar o Turma.');
        }
    }

    static async atualizarTurma(idTreinamento: number, dataInicio: Date, dataFim: Date): Promise<any> {
        try {
            const queryUpdateTurma =
                `UPDATE turma SET id_treinamento = $1, data_inicio = $2, data_fim = $3 RETURNING id_turma;`;

            const valores = [idTreinamento, dataInicio, dataFim];

            const resultado = await database.query(queryUpdateTurma, valores);

            if (resultado.rowCount === 0) {
                throw new Error('Turma não encontrado.');
            }

            return resultado.rows[0].id_turma;

        } catch (error) {
            console.error(`Erro ao atualizar turma: ${error}`);

            throw new Error('Erro ao atualizar o turma.');
        }
    }


    static async removerTurma(id_turma: number): Promise<Boolean> {
        let queryResult = false;

        try {
            const queryDeleteTurma = `DELETE FROM turma WHERE id_turma= ${id_turma};`;
            await database.query(queryDeleteTurma).then((result: any) => {
                if (result.rowCount != 0) { queryResult = true; };
            });

            return queryResult;
        } catch (error) {
            console.log(`Erro na consulta: ${error}`);
            return queryResult;
        }
    }
}

