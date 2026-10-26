$(function() {
    $("#botao").click(inserirTarefa);

    atualizarIndicadores();
});

function inserirTarefa() {
    var campoTitulo = $(".campoTitulo").val();
    var campoObs = $(".campoObs").val();
    var campoPrioridade = $(".campoPrioridade").val();

    if (campoTitulo.trim() == "" || campoObs.trim() == "") {
        alert("Preencha o título e as observações da tarefa!");
        return;
    }

    var tabela = $(".tarefas").find("tbody");
    var linha = funLinha(campoTitulo, campoObs, campoPrioridade);

    linha.find(".botaoDeletar").click(deletaLinha);
    linha.find(".botaoConcluir").click(concluirTarefa);

    tabela.append(linha);

    atualizarIndicadores();

    $(".campoTitulo").val("");
    $(".campoObs").val("");
    $(".campoTitulo").focus();
}

function funLinha(campoTitulo, campoObs, campoPrioridade) {
    var linha = $("<tr>");

    var colunaTarefa = $("<td>").text(campoTitulo);
    var colunaObs = $("<td>").text(campoObs);
    var colunaPrioridade = $("<td>").text(campoPrioridade);

    var colunaConcluir = $("<td>");
    var colunaDeletar = $("<td>");

    var botaoConcluir = $("<a>")
        .attr("href", "#")
        .addClass("botaoConcluir")
        .text("Concluir");

    var botaoDeletar = $("<a>")
        .attr("href", "#")
        .addClass("botaoDeletar")
        .text("Apagar");

    colunaConcluir.append(botaoConcluir);
    colunaDeletar.append(botaoDeletar);

    linha.append(colunaTarefa);
    linha.append(colunaObs);
    linha.append(colunaPrioridade);
    linha.append(colunaConcluir);
    linha.append(colunaDeletar);

    return linha;
}

function deletaLinha(evento) {
    evento.preventDefault();

    var botao = $(this);
    var linha = botao.closest("tr");

    if (confirm("Deseja realmente apagar esta tarefa?")) {
        linha.remove();
        atualizarIndicadores();
    }
}

function concluirTarefa(evento) {
    evento.preventDefault();

    var botao = $(this);
    var linha = botao.closest("tr");

    linha.toggleClass("linhaConcluida");

    if (linha.hasClass("linhaConcluida")) {
        botao.text("Desfazer");
    } else {
        botao.text("Concluir");
    }

    atualizarIndicadores();
}

function atualizarIndicadores() {
    var total = $(".tarefas tbody tr").length;
    var concluidas = $(".tarefas tbody tr.linhaConcluida").length;
    var pendentes = total - concluidas;

    $("#totalTarefas").text(total);
    $("#tarefasPendentes").text(pendentes);
    $("#tarefasConcluidas").text(concluidas);
}