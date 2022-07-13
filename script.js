const listaLi = '#lista-tarefas li';

function tarefaConcluida(evento) {
  const ponto = evento.target;
  const itensDaLista = document.querySelectorAll(listaLi);
  for (let elemento = 0; elemento < itensDaLista.length; elemento += 1) {
    const item = itensDaLista[elemento];
    const riscoClasse = ' completed';
    if (item === ponto && ponto.className.includes(riscoClasse)) {
      item.className = item.className.replace(riscoClasse, '');
    } else if (item === ponto) {
      item.className = item.className.concat(riscoClasse);
    }
  }
}

function corDeFundo(evento) {
  const ponto = evento.target;
  const itensDaLista = document.querySelectorAll(listaLi);
  for (let elemento = 0; elemento < itensDaLista.length; elemento += 1) {
    const item = itensDaLista[elemento];
    const corClasse = ' cor-de-fundo';
    if (item.className.includes(corClasse)) {
      item.className = item.className.replace(corClasse, '');
    } else if (item === ponto) {
      item.className = item.className.concat(corClasse);
    }
  }
}

function ativarSelecao() {
  const itensDaLista = document.querySelectorAll(listaLi);
  for (let elemento = 0; elemento < itensDaLista.length; elemento += 1) {
    itensDaLista[elemento].addEventListener('dblclick', tarefaConcluida);
    itensDaLista[elemento].addEventListener('click', corDeFundo);
  }
}

function adicionar() {
  const elementoNovo = document.createElement('li');
  const elementoDaLista = document.getElementById('texto-tarefa').value;
  elementoNovo.innerText = elementoDaLista;
  document.getElementById('lista-tarefas').appendChild(elementoNovo);
  document.getElementById('texto-tarefa').value = '';
  ativarSelecao();
}

document.getElementById('criar-tarefa').addEventListener('click', adicionar);

function apagar() {
  const itensDaLista = document.querySelectorAll(listaLi);
  for (let elemento = 0; elemento < itensDaLista.length; elemento += 1) {
    itensDaLista[elemento].remove();
  }
}

document.getElementById('apaga-tudo').addEventListener('click', apagar);

function removerFinalizados() {
  const itensDaLista = document.querySelectorAll(listaLi);
  for (let elemento = 0; elemento < itensDaLista.length; elemento += 1) {
    const item = itensDaLista[elemento];
    if (item.className.includes('completed')) {
      item.remove();
    }
  }
}

document.getElementById('remover-finalizados').addEventListener('click', removerFinalizados);

function salvarLista() {
  const itensDaLista = document.querySelectorAll(listaLi);
  const arrayDaLista = [];
  const arrayDaClasse = [];
  for (let elemento = 0; elemento < itensDaLista.length; elemento += 1) {
    arrayDaLista.push((itensDaLista[elemento]).innerText);
    arrayDaClasse.push((itensDaLista[elemento]).className);
  }
  localStorage.setItem('lista', JSON.stringify(arrayDaLista));
  localStorage.setItem('classe', JSON.stringify(arrayDaClasse));
}

document.getElementById('salvar-tarefas').addEventListener('click', salvarLista);

function carregarLista() {
  if (localStorage.getItem('lista') !== null) {
    const arrayDaLista = JSON.parse(localStorage.getItem('lista'));
    const arrayDaClasse = JSON.parse(localStorage.getItem('classe'));
    for (let indice = 0; indice < arrayDaLista.length; indice += 1) {
      const elementoNovo = document.createElement('li');
      elementoNovo.innerText = arrayDaLista[indice];
      elementoNovo.className = arrayDaClasse[indice];
      document.getElementById('lista-tarefas').appendChild(elementoNovo);
    }
  }
  ativarSelecao();
}

window.onload = carregarLista;

function movimentoCima() {
  const itensDaLista = document.querySelectorAll(listaLi);
  const corClasse = 'cor-de-fundo';
  for (let elemento = 1; elemento < itensDaLista.length; elemento += 1) {
    if (itensDaLista[elemento].className.includes(corClasse)) {
      const cloneDoAnterior = document.createElement('li');
      cloneDoAnterior.innerText = itensDaLista[elemento - 1].innerText;
      cloneDoAnterior.className = itensDaLista[elemento - 1].className;

      const clone = document.createElement('li');
      clone.innerText = itensDaLista[elemento].innerText;
      clone.className = itensDaLista[elemento].className;

      itensDaLista[elemento].replaceWith(cloneDoAnterior);
      itensDaLista[elemento - 1].replaceWith(clone);
    }
  }
  ativarSelecao();
}

document.getElementById('mover-cima').addEventListener('click', movimentoCima);

function movimentoBaixo() {
  const itensDaLista = document.querySelectorAll(listaLi);
  const corClasse = 'cor-de-fundo';
  for (let elemento = 0; elemento < (itensDaLista.length - 1); elemento += 1) {
    if (itensDaLista[elemento].className.includes(corClasse)) {
      const cloneDoPosterior = document.createElement('li');
      cloneDoPosterior.innerText = itensDaLista[elemento + 1].innerText;
      cloneDoPosterior.className = itensDaLista[elemento + 1].className;

      const clone = document.createElement('li');
      clone.innerText = itensDaLista[elemento].innerText;
      clone.className = itensDaLista[elemento].className;

      itensDaLista[elemento].replaceWith(cloneDoPosterior);
      itensDaLista[elemento + 1].replaceWith(clone);
    }
  }
  ativarSelecao();
}

document.getElementById('mover-baixo').addEventListener('click', movimentoBaixo);
