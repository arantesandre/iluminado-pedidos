document.addEventListener("DOMContentLoaded", function () {
    const incluirVasilhameAgua = document.getElementById("incluirVasilhameAgua");
    const quantidadeVasilhameAgua = document.getElementById("quantidadeVasilhameAgua");
    const incluirVasilhameGas = document.getElementById("incluirVasilhameGas");
    const quantidadeVasilhameGas = document.getElementById("quantidadeVasilhameGas");
    const pagamentoSelect = document.getElementById("pagamento");
    const valorTrocoInput = document.getElementById("valorTroco");
    const modalTroco = document.getElementById("modalTroco");
    const closeTroco = document.getElementById("closeTroco");
    const trocoSim = document.getElementById("trocoSim");
    const trocoNao = document.getElementById("trocoNao");
    const pedidoForm = document.getElementById("pedidoForm");

    const precoAgua = 15;
    const precoVasilhameAgua = 20;
    const precoGas = 135;
    const precoVasilhameGas = 235;

    incluirVasilhameAgua.addEventListener("change", () => {
        quantidadeVasilhameAgua.style.display = incluirVasilhameAgua.checked ? "block" : "none";
        if (!incluirVasilhameAgua.checked) quantidadeVasilhameAgua.value = "";
        calcularTotal();
    });

    incluirVasilhameGas.addEventListener("change", () => {
        quantidadeVasilhameGas.style.display = incluirVasilhameGas.checked ? "block" : "none";
        if (!incluirVasilhameGas.checked) quantidadeVasilhameGas.value = "";
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
        if (event.target === modalResumo) modalResumo.style.display = "none";
        if (event.target === modalTroco) modalTroco.style.display = "none";
    };

    document.getElementById("fecharResumo").onclick = function () {
        document.getElementById("modalResumo").style.display = "none";
    };

    function formatarMoeda(valor) {
        return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    function calcularTotal() {
        const qtdAgua = parseInt(document.getElementById("quantidadeAgua").value) || 0;
        const qtdGas = parseInt(document.getElementById("quantidadeGas").value) || 0;

        const qtdVasilhameAgua = incluirVasilhameAgua.checked ? parseInt(quantidadeVasilhameAgua.value) || 0 : 0;
        const qtdVasilhameGas = incluirVasilhameGas.checked ? parseInt(quantidadeVasilhameGas.value) || 0 : 0;

        const total = (qtdAgua * precoAgua) + (qtdVasilhameAgua * precoVasilhameAgua)
            + (qtdGas * precoGas) + (qtdVasilhameGas * precoVasilhameGas);

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
        const qtdAgua = parseInt(document.getElementById("quantidadeAgua").value) || 0;
        const qtdGas = parseInt(document.getElementById("quantidadeGas").value) || 0;
        const pagamento = pagamentoSelect.value;

        if (!nome) {
            alert("Informe seu nome.");
            return;
        }

        if (!endereco) {
            alert("Informe seu endereço.");
            return;
        }

        if (qtdAgua < 1) {
            alert("Informe a quantidade de galões de água.");
            return;
        }

        if (qtdGas < 1) {
            alert("Informe a quantidade de botijões de gás.");
            return;
        }

        let vasilhameAguaQtd = 0;
        let vasilhameGasQtd = 0;
        let erro = false;

        if (incluirVasilhameAgua.checked) {
            vasilhameAguaQtd = parseInt(quantidadeVasilhameAgua.value);
            if (!vasilhameAguaQtd || vasilhameAguaQtd < 1) {
                alert("Informe a quantidade de vasilhames de água.");
                erro = true;
            }
            if (vasilhameAguaQtd > qtdAgua) {
                alert("Não pode pedir mais vasilhames de água do que galões.");
                erro = true;
            }
        }

        if (incluirVasilhameGas.checked) {
            vasilhameGasQtd = parseInt(quantidadeVasilhameGas.value);
            if (!vasilhameGasQtd || vasilhameGasQtd < 1) {
                alert("Informe a quantidade de vasilhames de gás.");
                erro = true;
            }
            if (vasilhameGasQtd > qtdGas) {
                alert("Não pode pedir mais vasilhames de gás do que botijões.");
                erro = true;
            }
        }

        if (erro) return;

        const total = (qtdAgua * precoAgua) + (vasilhameAguaQtd * precoVasilhameAgua)
            + (qtdGas * precoGas) + (vasilhameGasQtd * precoVasilhameGas);

        const trocoValor = parseFloat(valorTrocoInput.value || 0);
        if (valorTrocoInput.style.display === "block") {
            if (!valorTrocoInput.value) {
                alert("Informe o valor do troco.");
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
      GÁS E ÁGUA<br>
      ----------------------------------------------------<br>
      Nome: ${nome}<br>
      Endereço: ${endereco}<br>
      Água: ${qtdAgua} galão(ões) + Vasilhame (${vasilhameAguaQtd})<br>
      Gás: ${qtdGas} botijão(ões) + Vasilhame (${vasilhameGasQtd})<br>
      Forma de pagamento: ${pagamento}${trocoInfo}<br>
      <strong>Total: R$ ${formatarMoeda(total)}</strong>
    `;

        document.getElementById("resumoPedido").innerHTML = resumo;
        document.getElementById("modalResumo").style.display = "block";

        document.getElementById("confirmarPedido").onclick = function () {
            const mensagem = `Olá,%20gostaria%20de%20fazer%20um%20pedido:%0A%0A` +
                `*Nome:* ${nome}%0A` +
                `*Endereço:* ${endereco}%0A` +
                (qtdAgua > 0 ? `*Água:* ${qtdAgua} galão(ões) + Vasilhame (${vasilhameAguaQtd})%0A` : "") +
                (qtdGas > 0 ? `*Gás:* ${qtdGas} botijão(ões) + Vasilhame (${vasilhameGasQtd})%0A` : "") +
                `*Forma%20de%20pagamento*: ${pagamento}` +
                (trocoInfo ? `%0A*Troco para:* R$ ${formatarMoeda(trocoValor)}` : "") +
                `%0A*Total:* R$ ${formatarMoeda(total)}`;

            const link = `https://wa.me/5548991015816?text=${mensagem}`;
            window.open(link, "_blank");
            document.getElementById("modalResumo").style.display = "none";
        };
    });
});