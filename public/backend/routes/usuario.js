const express = require('express');
const Usuario = require('../models/usuario');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Função para criptografar a senha
function hashSenha(senha) {
  const hash = crypto.createHash('sha256');
  hash.update(senha);
  return hash.digest('hex');
}

// **Middleware para verificar token - ADICIONAR ESTA FUNÇÃO**
const verificarToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }

    const token = authHeader.split(' ')[1];
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const usuario = await Usuario.findById(decoded.userId);
    
    if (!usuario) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    if (usuario.ultimo_token !== token) {
      return res.status(401).json({ message: 'Sessão expirada. Faça login novamente.' });
    }

    req.usuario = usuario;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expirado. Faça login novamente.' });
    }
    return res.status(401).json({ message: 'Token inválido' });
  }
};

// **Rota para Criar Usuário**
/**
 * @swagger
 * /usuario/create:
 *   post:
 *     summary: Cria um novo usuário
 *     description: Cria um novo usuário com nome de usuário e senha criptografada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome_usuario:
 *                 type: string
 *                 description: Nome do usuário
 *                 example: "joao123"
 *               senha:
 *                 type: string
 *                 description: Senha do usuário
 *                 example: "senha123"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/create', async (req, res) => {
  const { nome_usuario, senha } = req.body;

  try {
    const usuarioExistente = await Usuario.findOne({ nome_usuario });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'Usuário já existe!' });
    }

    const senhaCriptografada = hashSenha(senha);
    const novoUsuario = new Usuario({ nome_usuario, senha: senhaCriptografada });
    await novoUsuario.save();

    res.status(201).json({ message: 'Usuário criado com sucesso!' });
  } catch (err) {
    console.error("Erro ao criar usuário:", err);
    res.status(500).json({ message: 'Erro ao criar usuário!' });
  }
});
