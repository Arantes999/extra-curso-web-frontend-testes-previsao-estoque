// Lista de produtos na loja
const loja = [];

// Cria um novo produto
function criarProduto(nome, estoqueInicial, vendasPorDia) {
  return {
    nome,
    estoque: estoqueInicial,
    vendasPorDia,
    historicoVendas: []
  };
}

// Adiciona um produto na loja
function adicionarProdutoNaLoja(produto) {
  loja.push(produto);
}

// Vende produtos por um dia (reduz o estoque e registra a venda)
function venderDia(produto) {
  const vendas = Math.min(produto.vendasPorDia, produto.estoque);
  produto.estoque -= vendas;
  produto.historicoVendas.push(vendas);
}

// Calcula quantos dias até o estoque zerar
function diasAteEstoqueZerado(produto) {
  if (produto.vendasPorDia === 0) return Infinity;
  return Math.ceil(produto.estoque / produto.vendasPorDia);
}

// Retorna o produto mais próximo de acabar o estoque
function produtoMaisProximoDeEsgotar() {
  if (loja.length === 0) return null;

  return loja.reduce((maisProximo, atual) => {
    return diasAteEstoqueZerado(atual) < diasAteEstoqueZerado(maisProximo)
      ? atual
      : maisProximo;
  });
}

// Sugere quanto reabastecer com base nas vendas anteriores
function sugerirReabastecimento(produto) {
  if (produto.historicoVendas.length === 0) return 0;

  const total = produto.historicoVendas.reduce((a, b) => a + b, 0);
  const mediaDiaria = total / produto.historicoVendas.length;

  return Math.ceil(mediaDiaria * 7); // Sugerido para durar 7 dias
}

// Simula vendas por 30 dias para um produto
function simularVendasPor30Dias(produto) {
  for (let i = 0; i < 30; i++) {
    venderDia(produto);
  }
}

// Simula vendas por 30 dias para todos os produtos da loja
function simularVendasNaLoja() {
  loja.forEach(produto => simularVendasPor30Dias(produto));
}


// Criar produtos
const produto1 = criarProduto("Sabonete", 100, 3);
const produto2 = criarProduto("Shampoo", 50, 2);

// Adicionar na loja
adicionarProdutoNaLoja(produto1);
adicionarProdutoNaLoja(produto2);
                                                                                                
// Simular 30 dias de vendas
simularVendasNaLoja();

// Ver resultados
console.log("Produto mais próximo de acabar:", produtoMaisProximoDeEsgotar().nome);
console.log("Estoque restante:");
loja.forEach(p => {
  console.log(`${p.nome}: ${p.estoque} unidades`);
});

console.log("Sugestões de reabastecimento:");
loja.forEach(p => {
  console.log(`${p.nome}: sugerido reabastecer ${sugerirReabastecimento(p)} unidades`);
});
