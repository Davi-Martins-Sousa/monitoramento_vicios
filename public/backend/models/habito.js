const mongoose = require('mongoose');

const habitoSchema = new mongoose.Schema({
  usuario_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  nome_habito: {
    type: String,
    required: true
  },
  descricao: {
    type: String,
    default: ''
  },
  recaidas: {
    type: Number,
    default: 0
  },
  maior_periodo_sem_vicio: {
    type: Number,
    default: 0
  },
  inicio: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Habito', habitoSchema);
