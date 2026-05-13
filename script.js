// Detecta se o usuário apertou Enter
function teclaEnter(evento) {
  if (evento.key === "Enter") {
    buscarCep();
  }
}

// Formata o CEP enquanto o usuário digita (ex: 01310-100)
document.getElementById("cep").addEventListener("input", function () {
  let valor = this.value.replace(/\D/g, ""); // remove tudo que não é número
  if (valor.length > 5) {
    valor = valor.slice(0, 5) + "-" + valor.slice(5, 8); // adiciona o traço
  }
  this.value = valor;
});

async function buscarCep() {
    const cep = document.getElementById("cep").value.replace("-", "");
    const resultado = document.getElementById("resultado");

    // Limpa o resultado anterior
    resultado.innerHTML = "";

    // Verifica se o CEP tem 8 dígitos
    if (cep.length !== 8) {
        resultado.innerHTML = `<p class="erro">Digite um CEP com 8 números.</p>`;
        return;
    }

    const url = `https://viacep.com.br/ws/${cep}/json/`;

    // Faz a chamada para a API
    const resposta = await fetch(url);
    const dados = await resposta.json();

    // Verifica se o CEP foi encontrado
    if (dados.erro) {
        resultado.innerHTML = `<p class="erro">CEP não encontrado!</p>`;
        return;
    }

    // Exibe os dados na tela
    resultado.innerHTML = `
    <p><strong>Logradouro:</strong> ${dados.logradouro}</p>
    <p><strong>Bairro:</strong> ${dados.bairro}</p>
    <p><strong>Cidade:</strong> ${dados.localidade}</p>
    <p><strong>Estado:</strong> ${dados.uf}</p>
  `;
}

//Ana Clara 