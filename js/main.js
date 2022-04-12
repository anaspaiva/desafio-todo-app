const inserirTarefa = document.querySelector('#inserir-tarefa');
const listaTarefas = document.querySelector('#lista-tarefas');
const itensRestantes = document.querySelector('.itens-restantes');
const filtro = document.querySelector ('.filtro'); 

class Tarefa {
  tarefa;
  check = false;
}

let conteudo;
let lista = JSON.parse(localStorage.getItem("listaTarefa")) || [];
let contarTarefa = JSON.parse(localStorage.getItem("contarTarefa")) || 0;

atualizarLista(lista);
alteraContagemTarefa(contarTarefa);


// Adicionar tarefa com botão enter 

inserirTarefa.addEventListener('keyup', function (event) {

  let enter = event.which;
  
  if (enter == 13) {
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

// Funçaõ de remover tarefa individualmente 

function removerTarefa(id) {
  event.preventDefault();

  if (!lista[id].check) {
    contarTarefa--;
    alteraContagemTarefa(contarTarefa);
  }

  lista.splice(id, 1);

  atualizarLista(lista);
  salvarLocalStorage();
}

// Atualizar a lista quando as tarefas forem adicionadas ou removidas

function atualizarLista(listaAtual) {
  listaTarefas.innerHTML = '';
  let listas = typeof (listaAtual) != "undefined" ? listaAtual : lista;
  
  for (let i = 0; i < listas.length; i++) {
    if (listas[i].check == false) {
      listaTarefas.innerHTML += `
        <li class="tarefa-inserida">
          <div class="tarefa-concluida" onclick="marcarTarefa(${i});">
          <span class="check"></span>
          <div class="tarefa-descricao">${listas[i].tarefa}</div>
          </div>
          
          <div class="remover-tarefa" onclick="removerTarefa(${i});">
            <img class="cross" src="/assets/icon-cross.svg" alt="Remover Tarefa">
          </div>
        </li>
      `;
    }
    else {
      listaTarefas.innerHTML += `
        <li class="tarefa-inserida">
          <div class="tarefa-concluida marcar-tarefa-concluida" onclick="marcarTarefa(${i});">
            <span class="check"> 
            <img class="check-tarefa" src="../assets/icon-check.svg" alt="Tarefa concluída"></span>
            <div class="tarefa-descricao">${listas[i].tarefa}</div>
          </div>
          
          <div class="remover-tarefa" onclick="removerTarefa(${i});">
            <img class="cross" src="/assets/icon-cross.svg"  alt="Remover Tarefa">
          </div>
        </li>
      `;
    }
  }
}

// Marcar (riscar) tarefa concluída

function marcarTarefa(id) {
  event.preventDefault();

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

// Filtro das tarefas concluídas e não concluídas

function filtrarTarefas(filtro) {
  listaTarefas.innerHTML = '';
  funcao1 = filtro ? "marcar-tarefa-concluida" : "";
  funcao2 = filtro ? `<img class="check-tarefa" src="../assets/icon-check.svg" alt="Tarefa concluída">` : ""
  lista
    .filter(todo => todo.check === filtro)
    .map((todo, i) => {
      listaTarefas.innerHTML += `
        <li class="tarefa-inserida">
          <div class="tarefa-concluida ${funcao1}" onclick="marcarTarefa(${i});">
          <span class="check">${funcao2}</span>
          
          <div class="tarefa-descricao">${todo.tarefa}</div>
          </div>
          
          <div class="remover-tarefa" onclick="removerTarefa(${!i});">
            <img class="remover-tarefa" src="../assets/icon-cross.svg" alt="Remover Tarefa">
          </div>
        </li>
      `;
    });
}

// Ação de limpar tudo 

function limparTudo() {
  listaTarefas.innerHTML = '';
  quantidadeDeTarefas = lista.length;
  lista.splice(0, quantidadeDeTarefas);

  contarTarefa = 0;
  alteraContagemTarefa(contarTarefa);
}

// Contagem de tarefas 

function alteraContagemTarefa(contarTarefa) {
  itensRestantes.innerHTML = `${contarTarefa} itens restantes`;
  salvarLocalStorage();
}

function salvarLocalStorage() {
  localStorage.setItem("listaTarefa", JSON.stringify(lista));
  localStorage.setItem("contarTarefa", JSON.stringify(contarTarefa));
}