import type {Request, Response} from 'express';
import { Colaborador } from '../model/Colaborador.js';

interface ColaboradorDTO {
    nome: string;
    cpf: string;
    email: string;
    cargo: string;
}

class ColaboradorController extends Colaborador {

    static async todos(req: Request, res: Response) {
        try {
            const listaDeColaboradores = await Colaborador.listarColaboradores();
            res.status(200).json(listaDeColaboradores);

        } catch (error) {
            console.log(`Erro ao acessar método herdado: ${error}`);
            res.status(400).json("Erro ao recuperar as informações do Colaborador");
        }
    }

    static async cadastrar(req: Request, res: Response) {
        try {
            const dadosRecebidos: ColaboradorDTO = req.body;

            const novoColaborador = new Colaborador(
                dadosRecebidos.nome,
                dadosRecebidos.cpf,
                dadosRecebidos.email,
                dadosRecebidos.cargo             
            );

            const result = await Colaborador.cadastrarColaborador(novoColaborador);

            if (result) {
                return res.status(200).json(`Colaborador cadastrado com sucesso`);
            } else {
                return res.status(400).json('Não foi possível cadastrar o colaborador no banco de dados');
            }
        } catch (error) {
            console.log(`Erro ao cadastrar o colaborador : ${error}`);
            return res.status(400).json('Erro ao cadastrar o colaborador');
        }
    }

    static async remover(req: Request, res: Response): Promise<Response> {
        try {
            const idColaborador = parseInt(req.query.idColaborador as string);
            const result = await Colaborador.removerColaborador(idColaborador);
            
            if (result) {
                return res.status(200).json('Colaborador removido com sucesso');
            } else {
                return res.status(401).json('Erro ao deletar colaborador');
            }
        } catch (error) {
            console.log("Erro ao remover o colaborador");
            console.log(error);
            return res.status(500).send("error");
        }
    }

    static async atualizar(req: Request, res: Response): Promise<Response> {
        try {
            const dadosRecebidos: ColaboradorDTO = req.body;

            const colaborador = new Colaborador(
                dadosRecebidos.nome,
                dadosRecebidos.cpf,
                dadosRecebidos.email,
                dadosRecebidos.cargo             
            );

            colaborador.setIdColaborador(parseInt(req.query.idColaborador as string));

            if (await Colaborador.atualizaColaborador(colaborador)) {
                return res.status(200).json({ mensagem: "Cadastro atualizado com sucesso!" });
            } else {
                return res.status(400).json('Não foi possível atualizar o colaborador no banco de dados');
            }
        } catch (error) {
            console.error(`Erro no modelo: ${error}`);
            return res.json({ mensagem: "Erro ao atualizar colaborador." });
        }
    }
}

export default ColaboradorController;