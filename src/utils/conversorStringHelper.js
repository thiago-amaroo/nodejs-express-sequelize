module.exports = (objetoParams) => {
  for (let propriedade in objetoParams ) {
        
    if(/Id|id/.test(propriedade)) {
      objetoParams[propriedade] = Number(objetoParams[propriedade]);
    }
  }
  return objetoParams;
};

//Essa funcao recebe um objeto qualquer. Percorre as propriedades e testa sealguma propriedade tem Id ou id no nome.
//usa metodo test que é um metodo de expressoes regulares do js
//se ele achar, transforma o valor da propriedade de string para number, já que ids sao numbers
//retorna o objeto modificado
