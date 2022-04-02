const inserirTarefa = document.querySelector('#inserir-tarefa');
const botaoEnterTarefa = document.querySelector('#btn-add-tarefa');
const listaTarefas = document.querySelector('#lista-tarefas');
const itensRestantes = document.querySelector('.itens-restantes');

class Tarefa {
  tarefa;
  check = false;
}

let conteudo;
let lista = JSON.parse(localStorage.getItem("listaTarefa")) || [];
let contarTarefa = JSON.parse(localStorage.getItem("contarTarefa")) || 0;

atualizarLista(lista);
alteraContagemTarefa(contarTarefa);

inserirTarefa.addEventListener('keyup', function (e) {

  let key = e.which || e.keyCode;

  if (key == 13) {
    conteudo = this.value;

    if (conteudo != '') {

      fazerTarefa = new Tarefa;
      fazerTarefa.tarefa = conteudo;

      lista.push(fazerTarefa);

      atualizarLista(lista);

      contarTarefa++;

      alteraContagemTarefa(contarTarefa);

    } 

    document.querySelector('#inserir-tarefa').value = null;
  }
});

botaoEnterTarefa.addEventListener('click',()=>{
  add()
})

function removerTarefa(id) {
  e.preventDefault();

  if (!lista[id].check) {
    contarTarefa--;
    alteraContagemTarefa(contarTarefa);
  }

  lista.splice(id, 1);

  atualizarLista(lista);
  salvarLocalStorage();
}


function atualizarLista(lista) {
  listaTarefas.innerHTML = '';
  for (let i = 0; i < lista.length; i++) {
    if (lista[i].check == false) {
      listaTarefas.innerHTML += `
        <li class="tarefa">
          <a href="#" class="tarefa-concluida" onclick="marcarTarefa(${i});">
            <span class="check nova-tarefa"></span>
            <div class="tarefa-descricao">${lista[i].tarefa}</div>
          </a>
          <a href="#" class="remover-tarefa" onclick="removerTarefa(${i});">
            <img src="../assets/icon-cross.svg" class="remover-tarefa" alt="Remover Tarefa">
          </a>
        </li>
      `;
    }
    else {
      listaTarefas.innerHTML += `
        <li class="tarefa">
          <a href="#" class="tarefa-concluida" onclick="marcarTarefa(${i});">
            <span class="check nova-tarefa"> 
            <img src="../assets/icon-check.svg" class="img-check" alt="Tarefa concluída"></span>
            <div class="tarefa-descricao">${lista[i].tarefa}</div>
          </a>
          <a href="#" class="remover-tarefa" onclick="removerTarefa(${i});">
            <img src="../assets/icon-cross.svg" class="remover-tarefa" alt="Remover Tarefa">
          </a>
        </li>
      `;
    }
  }
}

function riscarTarefa(id) {
  e.preventDefault();

  if (!lista[id].check) {
    lista[id].check = true;
    contarTarefa--;
  }
  else {
    lista[id].check = false;
    contarTarefa++
  }

  atualizarLista(lista);
  alteraContagemTarefa(contarTarefa);
  salvarLocalStorage();
}

function limparTudo() {

  listaTarefas.innerHTML = '';
  quantidadeDeTarefas = lista.length;
  lista.splice(0, quantidadeDeTarefas);

  contarTarefa = 0;
  alteraContagemTarefa(contarTarefa);
}

function alteraContagemTarefa(contarTarefa) {
  itensRestantes.innerHTML = `${contarTarefa} itens restantes`;
  salvarLocalStorage();
}

function salvarLocalStorage() {
  localStorage.setItem("listaTarefa", JSON.stringify(lista));
  localStorage.setItem("contarTarefa", JSON.stringify(contarTarefa));
}