
import express from "express";
import { SERVER_ROUTES } from "./appConfig.js";
import ColaboradorController from "./controller/ColaboradorController.js";
import TreinamentoController from "./controller/TreinamentoController.js";
import TurmaController from "./controller/TurmaController.js";

const router = express.Router();

router.get('/', (req, res) => {
    res.json({ mensagem: "API -- Rota Padrão"})
});

router.get(SERVER_ROUTES.LISTA_COLABORADORES, ColaboradorController.todos);
router.post(SERVER_ROUTES.NOVO_COLABORADOR, ColaboradorController.cadastrar);
router.delete(SERVER_ROUTES.REMOVER_COLABORADOR,ColaboradorController.remover);
router.put(SERVER_ROUTES.ATUALIZAR_COLABORADOR, ColaboradorController.atualizar);

router.get(SERVER_ROUTES.LISTA_TREINAMENTOS, TreinamentoController.todos);
router.post(SERVER_ROUTES.NOVO_TREINAMENTO, TreinamentoController.cadastrar);
router.delete(SERVER_ROUTES.REMOVER_COLABORADOR, TreinamentoController.remover);
router.put(SERVER_ROUTES.ATUALIZAR_COLABORADOR, TreinamentoController.atualizar);

router.get(SERVER_ROUTES.LISTA_TURMAS, TurmaController.todos);
router.post(SERVER_ROUTES.NOVA_TURMA, TurmaController.cadastrar);
router.delete(SERVER_ROUTES.REMOVER_TURMA, TurmaController.remover);
router.put(SERVER_ROUTES.ATUALIZAR_TURMA, TurmaController.atualizar);

export {router}