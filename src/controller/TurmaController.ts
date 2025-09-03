import type {Request, Response} from 'express';
import { Turma  } from '../model/Turma.js';

interface TurmaDTO {
    idTreinamento: number;
    dataInicio: Date;
    dataFim: Date;     
}

class TurmaController extends Turma {

    static async todos(req: Request, res: Response) {
        try {
            const listaDeTurmas = await Turma.listarTurmas();
            res.status(200).json(listaDeTurmas);

        } catch (error) {
            console.log(`Erro ao acessar método herdado: ${error}`);
            res.status(400).json("Erro ao recuperar as informações do turma");
        }
    }

    static async cadastrar(req: Request, res: Response) {
        try {
            const dadosRecebidos: TurmaDTO = req.body;

            const result = await Turma.cadastrarTurma(
                dadosRecebidos.idTreinamento,
                dadosRecebidos.dataInicio,
                dadosRecebidos.dataFim
            );

            if (result) {
                return res.status(200).json(`Turma cadastrado com sucesso`);
            } else {
                return res.status(400).json('Não foi possível cadastrar o turma no banco de dados');
            }
        } catch (error) {
            console.log(`Erro ao cadastrar o turma : ${error}`);
            return res.status(400).json('Erro ao cadastrar o turma');
        }
    }

    static async remover(req: Request, res: Response): Promise<Response> {
        try {
            const idTurma = parseInt(req.query.idTurma as string);
            const result = await Turma.removerTurma(idTurma);
            
            if (result) {
                return res.status(200).json('Turma removido com sucesso');
            } else {
                return res.status(401).json('Erro ao deletar turma');
            }
        } catch (error) {
            console.log("Erro ao remover o turma");
            console.log(error);
            return res.status(500).send("error");
        }
    }

    static async atualizar(req: Request, res: Response): Promise<Response> {
        try {
            const dadosRecebidos: TurmaDTO = req.body;

            const turma = new Turma(
                dadosRecebidos.idTreinamento,
                dadosRecebidos.dataInicio,
                dadosRecebidos.dataFim          
            );

            turma.setIdTreinamento(parseInt(req.query.idTreinamento as string));

            if (await Turma.atualizarTurma(
                turma.getIdTreinamento(),
                turma.getDataInicio(),
                turma.getDataFim()
            )) {
                return res.status(200).json({ mensagem: "Cadastro atualizado com sucesso!" });
            } else {
                return res.status(400).json('Não foi possível atualizar a turma no banco de dados');
            }
        } catch (error) {
            console.error(`Erro no modelo: ${error}`);
            return res.json({ mensagem: "Erro ao atualizar turma." });
        }
    }
}

export default TurmaController;