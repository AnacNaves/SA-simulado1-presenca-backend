
CREATE TABLE colaborador (
    id_colaborador SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(11) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    cargo VARCHAR(50) NOT NULL
);

CREATE TABLE treinamento (
    id_treinamento SERIAL PRIMARY KEY,
   titulo VARCHAR(100) NOT NULL,
   descricao VARCHAR(100) NOT NULL,
   carga_horaria VARCHAR(20) NOT NULL,
   periodo VARCHAR(20) NOT NULL
);

CREATE TABLE turma (
    id_turma SERIAL PRIMARY KEY,
    id_treinamento INT NOT NULL,
    data_inicio DATE NOT NULL,
    data_fim DATE NOT NULL,
    FOREIGN KEY (id_treinamento) REFERENCES Treinamento(id_treinamento)
);


INSERT INTO colaborador (nome, cpf, email, cargo) VALUES
('Ana Silva', '12345678901', 'ana.silva@empresa.com', 'Analista de Qualidade'),
('Carlos Souza', '98765432100', 'carlos.souza@empresa.com', 'Técnico de Segurança'),
('Maria Lima', '45612378999', 'maria.lima@empresa.com', 'Engenheira de Produção'),
('Rafael Costa', '85274196322', 'rafael.costa@empresa.com', 'Supervisor de Manutenção'),
('Juliana Pereira', '32165498711', 'juliana.pereira@empresa.com', 'Assistente Administrativa');

INSERT INTO treinamento (titulo, descricao, carga_horaria, periodo) VALUES
('NR-12 - Segurança no Trabalho em Máquinas', 'Treinamento obrigatório para operação segura de máquinas.', '16 horas', 'Anual'),
('NR-35 - Trabalho em Altura', 'Capacitação obrigatória para atividades em altura.', '8 horas', 'Bienal'),
('5S - Organização e Limpeza', 'Treinamento de qualidade e organização do ambiente de trabalho.', '4 horas', 'Semestral'),
('ISO 9001 - Gestão da Qualidade', 'Norma internacional para gestão de qualidade.', '2 dias', 'Anual'),
('Primeiros Socorros', 'Capacitação básica em primeiros socorros.', '6 horas', 'Bienal');

INSERT INTO turma (id_treinamento, data_inicio, data_fim) VALUES
(1, '2025-03-01', '2025-03-05'),
(2, '2025-04-10', '2025-04-12'),
(3, '2025-05-15', '2025-05-15'),
(4, '2025-06-01', '2025-06-07'),
(5, '2025-07-20', '2025-07-22');
