module.exports = (req) => {
  let { pagina = 1, limite = 5 } = req.query;
  const pular = (pagina - 1) * limite;

  const paginar = {
    pagina: pagina,
    pular: pular,
    limite: limite
  };
  return paginar;
};