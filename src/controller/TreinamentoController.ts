import type {Request, Response} from 'express';
import { Treinamento } from '../model/Treinamento.js';

interface TreinamentoDTO {
    titulo: string;
    descricao: string;
    cargaHoraria: string;  
    periodo: string;
}

class TreinamentoController extends Treinamento {

    static async todos(req: Request, res: Response) {
        try {
            const listaDeTreinamentos = await Treinamento.listarTreinamentos();
            res.status(200).json(listaDeTreinamentos);

        } catch (error) {
            console.log(`Erro ao acessar método herdado: ${error}`);
            res.status(400).json("Erro ao recuperar as informações do Treinamento");
        }
    }

    static async cadastrar(req: Request, res: Response) {
        try {
            const dadosRecebidos: TreinamentoDTO = req.body;

            const novoTreinamento = new Treinamento(
                dadosRecebidos.titulo,
                dadosRecebidos.descricao,
                dadosRecebidos.cargaHoraria,
                dadosRecebidos.periodo             
            );

            const result = await Treinamento.cadastrarTreinamentos(novoTreinamento);

            if (result) {
                return res.status(200).json(`Treinamento cadastrado com sucesso`);
            } else {
                return res.status(400).json('Não foi possível cadastrar o treinamento no banco de dados');
            }
        } catch (error) {
            console.log(`Erro ao cadastrar o treinamento : ${error}`);
            return res.status(400).json('Erro ao cadastrar o treinamento');
        }
    }

    static async remover(req: Request, res: Response): Promise<Response> {
        try {
            const idTreinamento = parseInt(req.query.idTreinamento as string);
            const result = await Treinamento.removerTreinamento(idTreinamento);
            
            if (result) {
                return res.status(200).json('Treinamento removido com sucesso');
            } else {
                return res.status(401).json('Erro ao deletar treinamento');
            }
        } catch (error) {
            console.log("Erro ao remover o treinameto");
            console.log(error);
            return res.status(500).send("error");
        }
    }

    static async atualizar(req: Request, res: Response): Promise<Response> {
        try {
            const dadosRecebidos: TreinamentoDTO = req.body;

            const treinamento = new Treinamento(
                dadosRecebidos.titulo,
                dadosRecebidos.descricao,
                dadosRecebidos.cargaHoraria,
                dadosRecebidos.periodo             
            );

            treinamento.setIdTreinamento(parseInt(req.query.idTreinamento as string));

            if (await Treinamento.atualizaTreinamento(treinamento)) {
                return res.status(200).json({ mensagem: "Cadastro atualizado com sucesso!" });
            } else {
                return res.status(400).json('Não foi possível atualizar o treinamento no banco de dados');
            }
        } catch (error) {
            console.error(`Erro no modelo: ${error}`);
            return res.json({ mensagem: "Erro ao atualizar treinamento." });
        }
    }
}

export default TreinamentoController;