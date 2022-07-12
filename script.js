function corDeFundo(evento) {
  const ponto = evento.target;
  ponto.className = 'cor-de-fundo';
}

function adicionar() {
  const elementoNovo = document.createElement('li');
  const elementoDaLista = document.getElementById('texto-tarefa').value;
  elementoNovo.innerText = elementoDaLista;
  document.getElementById('lista-tarefas').appendChild(elementoNovo);
  document.getElementById('texto-tarefa').value = '';
  const contador = document.querySelectorAll('#lista-tarefas li').length;
  for (let elemento = 0; elemento < contador; elemento += 1) {
    document.getElementsByTagName('li')[elemento].addEventListener('click', corDeFundo);
  }
}

document.getElementById('criar-tarefa').addEventListener('click', adicionar);
