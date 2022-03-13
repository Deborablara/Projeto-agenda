const mongoose = require('mongoose')
const validator = require('validator')

const ContatoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: false, default: '' },
  email: { type: String, required: false, default: '' },
  phone: { type: String, required: false, default: '' },
  createIn: { type: Date, default: Date.now }
})

Contato.filterId = async function (id) {
  if (typeof id !== 'string') return
  const user = await ContatoModel.findById(id)
  return user
}

const ContatoModel = mongoose.model('Contato', ContatoSchema)

function Contato(body) {
  this.body = body
  this.errors = []
  this.contato = null
}

Contato.prototype.register = async function () {
  this.valida()

  if (this.errors.length > 0) return

  this.contato = await ContatoModel.create(this.body)
}

Contato.prototype.valida = function () {
  this.cleanUp()

  // Validação
  // O e-mail precisa ser válido
  if (this.body.email && !validator.isEmail(this.body.email))
    this.errors.push('E-mail inválido')
  if (!this.body.name) this.errors.push('Nome é obrigatório.')
  if (!this.body.email && !this.body.phone) {
    this.errors.push('Email ou contato precisam ser preenchidos.')
  }
}

Contato.prototype.cleanUp = function () {
  for (const key in this.body) {
    if (typeof this.body[key] !== 'string') {
      this.body[key] = ''
    }
  }

  this.body = {
    name: this.body.name,
    lastname: this.body.lastname,
    email: this.body.email,
    phone: this.body.phone
  }
}

module.exports = Contato