
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

  const precoAgua = 17;
  const precoVasilhame = 18;

  incluirVasilhame.addEventListener("change", () => {
    if (incluirVasilhame.checked) {
      quantidadeVasilhame.style.display = "block";
    } else {
      quantidadeVasilhame.style.display = "none";
      quantidadeVasilhame.value = "";
    }
    calcularTotal();
  });

  document.querySelectorAll("input, select").forEach(el => {
    el.addEventListener("input", calcularTotal);
  });

  pagamentoSelect.addEventListener("change", function () {
    if (this.value === "Dinheiro") {
      modalTroco.style.display = "block";
    } else {
      valorTrocoInput.style.display = "none";
      valorTrocoInput.value = "";
    }
    calcularTotal();
  });

  closeTroco.onclick = () => {
    modalTroco.style.display = "none";
    pagamentoSelect.value = "";
  };

  trocoSim.onclick = () => {
    valorTrocoInput.style.display = "block";
    valorTrocoInput.focus();
    modalTroco.style.display = "none";
  };

  trocoNao.onclick = () => {
    valorTrocoInput.style.display = "none";
    valorTrocoInput.value = "";
    modalTroco.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target === modalResumo) {
      modalResumo.style.display = "none";
    }
    if (event.target === modalTroco) {
      modalTroco.style.display = "none";
    }
  };

  document.getElementById("fecharResumo").onclick = function () {
    document.getElementById("modalResumo").style.display = "none";
  };

  function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

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

  pedidoForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const endereco = document.getElementById("endereco").value.trim();
    const quantidade = parseInt(document.getElementById("quantidade").value) || 0;
    const pagamento = pagamentoSelect.value;

    if (quantidade < 1) {
      alert("Informe a quantidade de galões.");
      return;
    }

    let vasilhameQtd = 0;
    let vasilhame = "Não";

    if (incluirVasilhame.checked) {
      vasilhame = "Sim";
      vasilhameQtd = parseInt(quantidadeVasilhame.value);
      if (!vasilhameQtd || vasilhameQtd < 1) {
        alert("Por favor, informe a quantidade de vasilhames.");
        return;
      }
      if (vasilhameQtd > quantidade) {
        alert("Você não pode pedir mais vasilhames do que galões.");
        return;
      }
    }

    const total = (quantidade * precoAgua) + (vasilhameQtd * precoVasilhame);
    const trocoValor = parseFloat(valorTrocoInput.value || 0);

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
     ÁGUA<br>
    ----------------------------------------------------<br> 
      Nome: ${nome}<br>
      Endereço: ${endereco}<br>
      Quantidade: ${quantidade} galão(ões)<br>
      Vasilhame: ${vasilhame} (${vasilhameQtd})<br>
      Forma de pagamento: ${pagamento}${trocoInfo}<br>
      <strong>Total: R$ ${formatarMoeda(total)}</strong>
    `;

    document.getElementById("resumoPedido").innerHTML = resumo;
    document.getElementById("modalResumo").style.display = "block";

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
