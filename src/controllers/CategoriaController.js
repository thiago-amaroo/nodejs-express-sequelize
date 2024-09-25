const CategoriaServices = require('../services/CategoriaServices.js');
const Controller = require('./Controller.js');

const categoriaServices = new CategoriaServices();

class CategoriaController extends Controller {
  constructor() {
    super(categoriaServices);
  }
}

module.exports = CategoriaController;