/* document.getElementById("pedidoForm").addEventListener("submit", function (event) {
    event.preventDefault();
  
    const nome = document.getElementById("nome").value;
    const endereco = document.getElementById("endereco").value;
    const quantidade = parseInt(document.getElementById("quantidade").value);
    const vasilhame = document.getElementById("vasilhame").value;
    const pagamento = document.getElementById("pagamento").value;
  
    const precoAgua = 15;
    const precoVasilhame = 18;
    const total = (quantidade * precoAgua) + (vasilhame === "Sim" ? quantidade * precoVasilhame : 0);
  
    const resumo = `
      Nome: ${nome}<br>
      Endereço: ${endereco}<br>
      Quantidade: ${quantidade} galão(ões)<br>
      Vasilhame: ${vasilhame}<br>
      Forma de pagamento: ${pagamento}<br>
      <strong>Total: R$ ${total.toFixed(2)}</strong>
    `;
  
    document.getElementById("resumoPedido").innerHTML = resumo;
    document.getElementById("modalResumo").style.display = "block";
  
    document.getElementById("confirmarPedido").onclick = function () {
      const mensagem = `Olá,%20gostaria%20de%20pedir%20água%20de%2020L.%0A%0A` +
        `*Nome*: ${nome}%0A` +
        `*Endereço*: ${endereco}%0A` +
        `*Quantidade*: ${quantidade}%20galões%0A` +
        `*Vasilhame*: ${vasilhame}%0A` +
        `*Forma%20de%20pagamento*: ${pagamento}%0A` +
        `*Total*: R$ ${total.toFixed(2)}`;
  
      const link = `https://wa.me/5548991015816?text=${mensagem}`;
      window.open(link, "_blank");
      document.getElementById("modalResumo").style.display = "none";
    };
  });
  
  document.querySelector(".close").onclick = function () {
    document.getElementById("modalResumo").style.display = "none";
  };
  
  window.onclick = function (event) {
    if (event.target == document.getElementById("modalResumo")) {
      document.getElementById("modalResumo").style.display = "none";
    }
  }; */

// ======================================================================================================
/* document.addEventListener("DOMContentLoaded", function () {
  const incluirVasilhame = document.getElementById("incluirVasilhame");
  const quantidadeVasilhame = document.getElementById("quantidadeVasilhame");
  const pagamentoSelect = document.getElementById("pagamento");
  const valorTrocoInput = document.getElementById("valorTroco");
  const modalTroco = document.getElementById("modalTroco");
  const closeTroco = document.getElementById("closeTroco");
  const trocoSim = document.getElementById("trocoSim");
  const trocoNao = document.getElementById("trocoNao");
  const pedidoForm = document.getElementById("pedidoForm");

  const precoAgua = 15;
  const precoVasilhame = 18;

  // Mostrar ou esconder campo de vasilhame
  incluirVasilhame.addEventListener("change", () => {
    if (incluirVasilhame.checked) {
      quantidadeVasilhame.style.display = "block";
    } else {
      quantidadeVasilhame.style.display = "none";
      quantidadeVasilhame.value = ""; // Limpa o campo ao desmarcar
    }
    
    calcularTotal();
  });

  // Atualizar total em tempo real
  document.querySelectorAll("input, select").forEach(el => {
    el.addEventListener("input", calcularTotal);
  });

  // Modal de troco ao escolher "Dinheiro"
  pagamentoSelect.addEventListener("change", function () {
    if (this.value === "Dinheiro") {
      modalTroco.style.display = "block";
    } else {
      valorTrocoInput.style.display = "none";
      valorTrocoInput.value = "";
    }
    calcularTotal();
  });

  // Botões do modal de troco
  closeTroco.onclick = () => {
    modalTroco.style.display = "none";
    pagamentoSelect.value = "";
  };

  trocoSim.onclick = () => {
    valorTrocoInput.style.display = "block";
    modalTroco.style.display = "none";
  };

  trocoNao.onclick = () => {
    valorTrocoInput.style.display = "none";
    valorTrocoInput.value = "";
    modalTroco.style.display = "none";
  };

  // Fechar modais ao clicar fora
  window.onclick = function (event) {
    if (event.target === modalResumo) {
      modalResumo.style.display = "none";
    }
    if (event.target === modalTroco) {
      modalTroco.style.display = "none";
    }
  };

  // Fechar modal de resumo ao clicar no "X"
  document.getElementById("fecharResumo").onclick = function () {
    document.getElementById("modalResumo").style.display = "none";
  };

  // Cálculo do total
  function calcularTotal() {
    const qtdAgua = parseInt(document.getElementById("quantidade").value) || 0;
    const qtdVasilhame = incluirVasilhame.checked ? parseInt(quantidadeVasilhame.value) || 0 : 0;
    const total = (qtdAgua * precoAgua) + (qtdVasilhame * precoVasilhame);

    let totalField = document.getElementById("totalAtual");
    if (!totalField) {
      totalField = document.createElement("p");
      totalField.id = "totalAtual";
      pedidoForm.appendChild(totalField);
    }
    totalField.innerHTML = `<strong>Total: R$ ${total.toFixed(2)}</strong>`;
  }

  // Submissão do pedido
  pedidoForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const endereco = document.getElementById("endereco").value;
    const quantidade = parseInt(document.getElementById("quantidade").value) || 0;
    const pagamento = pagamentoSelect.value;
    const vasilhame = incluirVasilhame.checked ? "Sim" : "Não";
    const vasilhameQtd = incluirVasilhame.checked ? parseInt(quantidadeVasilhame.value) || 0 : 0;
    const total = (quantidade * precoAgua) + (vasilhameQtd * precoVasilhame);
    const trocoValor = parseFloat(valorTrocoInput.value || 0);

    // Validações de troco
    if (valorTrocoInput.style.display === "block") {
      if (!valorTrocoInput.value) {
        alert("Por favor, informe o valor do troco.");
        return;
      }
      if (trocoValor < total) {
        alert(`O valor do troco deve ser maior ou igual ao total (R$ ${total.toFixed(2)}).`);
        return;
      }
    }

    // Validação de quantidade de vasilhames
    if (incluirVasilhame.checked && (!vasilhameQtd || vasilhameQtd <= 0)) {
      alert("Por favor, informe a quantidade de vasilhames.");
      return;
    }

    const trocoInfo = (pagamento === "Dinheiro" && valorTrocoInput.style.display === "block")
      ? `<br>Troco para: R$ ${trocoValor.toFixed(2)}`
      : "";

    const resumo = `
        Nome: ${nome}<br>
        Endereço: ${endereco}<br>
        Quantidade: ${quantidade} galão(ões)<br>
        Vasilhame: ${vasilhame} (${vasilhameQtd})<br>
        Forma de pagamento: ${pagamento}${trocoInfo}<br>
        <strong>Total: R$ ${total.toFixed(2)}</strong>
      `;

    document.getElementById("resumoPedido").innerHTML = resumo;
    document.getElementById("modalResumo").style.display = "block";

    // Botão de enviar via WhatsApp
    document.getElementById("confirmarPedido").onclick = function () {
      const mensagem = `Olá,%20gostaria%20de%20pedir%20água%20de%2020L.%0A%0A` +
        `*Nome*: ${nome}%0A` +
        `*Endereço*: ${endereco}%0A` +
        `*Quantidade*: ${quantidade}%20galões%0A` +
        `*Vasilhame*: ${vasilhame} (${vasilhameQtd})%0A` +
        `*Forma%20de%20pagamento*: ${pagamento}` +
        (trocoInfo ? `%0A*Troco para*: R$ ${trocoValor.toFixed(2)}` : "") +
        `%0A*Total*: R$ ${total.toFixed(2)}`;

      const link = `https://wa.me/5548991015816?text=${mensagem}`;
      window.open(link, "_blank");
      document.getElementById("modalResumo").style.display = "none";
    };
  });
});
 */

// =====================================================================================================

document.addEventListener("DOMContentLoaded", function () {
  const incluirVasilhame = document.getElementById("incluirVasilhame");
  const quantidadeVasilhame = document.getElementById("quantidadeVasilhame");
  const pagamentoSelect = document.getElementById("pagamento");
  const valorTrocoInput = document.getElementById("valorTroco");
  const modalTroco = document.getElementById("modalTroco");
  const closeTroco = document.getElementById("closeTroco");
  const trocoSim = document.getElementById("trocoSim");
  const trocoNao = document.getElementById("trocoNao");
  const pedidoForm = document.getElementById("pedidoForm");

  const precoAgua = 15;
  const precoVasilhame = 18;

  // Mostrar ou esconder campo de vasilhame
  incluirVasilhame.addEventListener("change", () => {
    if (incluirVasilhame.checked) {
      quantidadeVasilhame.style.display = "block";
    } else {
      quantidadeVasilhame.style.display = "none";
      quantidadeVasilhame.value = ""; // Limpa o campo ao desmarcar
    }
    
    calcularTotal();
  });

  // Atualizar total em tempo real
  document.querySelectorAll("input, select").forEach(el => {
    el.addEventListener("input", calcularTotal);
  });

  // Modal de troco ao escolher "Dinheiro"
  pagamentoSelect.addEventListener("change", function () {
    if (this.value === "Dinheiro") {
      modalTroco.style.display = "block";
    } else {
      valorTrocoInput.style.display = "none";
      valorTrocoInput.value = "";
    }
    calcularTotal();
  });

  // Botões do modal de troco
  closeTroco.onclick = () => {
    modalTroco.style.display = "none";
    pagamentoSelect.value = "";
  };

  trocoSim.onclick = () => {
    valorTrocoInput.style.display = "block"; // Exibe o campo de valor do troco
    valorTrocoInput.focus(); // Foca automaticamente no campo de troco
    modalTroco.style.display = "none"; // Fecha o modal de pagamento
  };

  trocoNao.onclick = () => {
    valorTrocoInput.style.display = "none"; // Oculta o campo de valor do troco
    valorTrocoInput.value = ""; // Limpa o campo de troco
    modalTroco.style.display = "none"; // Fecha o modal de pagamento
  };

  // Fechar modais ao clicar fora
  window.onclick = function (event) {
    if (event.target === modalResumo) {
      modalResumo.style.display = "none";
    }
    if (event.target === modalTroco) {
      modalTroco.style.display = "none";
    }
  };

  // Fechar modal de resumo ao clicar no "X"
  document.getElementById("fecharResumo").onclick = function () {
    document.getElementById("modalResumo").style.display = "none";
  };

  // Função para formatar valores com vírgula
  function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  // Cálculo do total
  function calcularTotal() {
    const qtdAgua = parseInt(document.getElementById("quantidade").value) || 0;
    const qtdVasilhame = incluirVasilhame.checked ? parseInt(quantidadeVasilhame.value) || 0 : 0;
    const total = (qtdAgua * precoAgua) + (qtdVasilhame * precoVasilhame);

    let totalField = document.getElementById("totalAtual");
    if (!totalField) {
      totalField = document.createElement("p");
      totalField.id = "totalAtual";
      pedidoForm.appendChild(totalField);
    }
    totalField.innerHTML = `<strong>Total: R$ ${formatarMoeda(total)}</strong>`;
  }

  // Submissão do pedido
  pedidoForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const endereco = document.getElementById("endereco").value;
    const quantidade = parseInt(document.getElementById("quantidade").value) || 0;
    const pagamento = pagamentoSelect.value;
    const vasilhame = incluirVasilhame.checked ? "Sim" : "Não";
    const vasilhameQtd = incluirVasilhame.checked ? parseInt(quantidadeVasilhame.value) || 0 : 0;
    const total = (quantidade * precoAgua) + (vasilhameQtd * precoVasilhame);
    const trocoValor = parseFloat(valorTrocoInput.value || 0);

    // Validações de troco
    if (valorTrocoInput.style.display === "block") {
      if (!valorTrocoInput.value) {
        alert("Por favor, informe o valor do troco.");
        return;
      }
      if (trocoValor < total) {
        alert(`O valor do troco deve ser maior ou igual ao total (R$ ${formatarMoeda(total)}).`);
        return;
      }
    }

    const trocoInfo = (pagamento === "Dinheiro" && valorTrocoInput.style.display === "block")
      ? `<br>Troco para: R$ ${formatarMoeda(trocoValor)}`
      : "";

    const resumo = `  
        Nome: ${nome}<br>
        Endereço: ${endereco}<br>
        Quantidade: ${quantidade} galão(ões)<br>
        Vasilhame: ${vasilhame} (${vasilhameQtd})<br>
        Forma de pagamento: ${pagamento}${trocoInfo}<br>
        <strong>Total: R$ ${formatarMoeda(total)}</strong>
      `;

    document.getElementById("resumoPedido").innerHTML = resumo;
    document.getElementById("modalResumo").style.display = "block";

    // Botão de enviar via WhatsApp
    document.getElementById("confirmarPedido").onclick = function () {
      const mensagem = `Olá,%20gostaria%20de%20pedir%20água%20de%2020L.%0A%0A` +
        `*Nome*: ${nome}%0A` +
        `*Endereço*: ${endereco}%0A` +
        `*Quantidade*: ${quantidade}%20galões%0A` +
        `*Vasilhame*: ${vasilhame} (${vasilhameQtd})%0A` +
        `*Forma%20de%20pagamento*: ${pagamento}` +
        (trocoInfo ? `%0A*Troco para*: R$ ${formatarMoeda(trocoValor)}` : "") +
        `%0A*Total*: R$ ${formatarMoeda(total)}`;

      const link = `https://wa.me/5548991015816?text=${mensagem}`;
      window.open(link, "_blank");
      document.getElementById("modalResumo").style.display = "none";
    };
  });
});
