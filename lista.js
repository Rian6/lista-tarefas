const frm = document.querySelector("form")      // obtém elementos da página
const dvQuadro = document.querySelector("#divQuadro")

frm.addEventListener("submit", (e) => {
  e.preventDefault()                            // evita envio do form

  const tarefa = frm.inTarefa.value             // obtém o conteúdo digitado

  const h5 = document.createElement("h5")       // cria o elemento HTML h5
  const texto = document.createTextNode(tarefa) // cria um texto
  h5.appendChild(texto)                         // define que texto será filho de h5
  dvQuadro.appendChild(h5)                      // e que h5 será filho de divQuadro

  frm.inTarefa.value = ""                       // limpa o campo de edição
  frm.inTarefa.focus()                          // joga o cursor neste campo
})

frm.btSelecionar.addEventListener("click", () => {
  const tarefas = document.querySelectorAll("h5") // busca todos os elementos h5

  if (tarefas.length == 0) { // valida se as tarefas estão vazias
    alert("Não há tarefas para selecionar") // exibe alerta para selecionar tarefas
    return
  }

  let aux = -1 // variavel auxiliar


  for (let i = 0; i < tarefas.length; i++) {

    if (tarefas[i].className == "tarefa-selecionada") { // valida o elemento pela classe o elemento selecionado
      tarefas[i].className = "tarefa-normal" // substitui a classe do elemento
      aux = i // troca auxiliar
      break
    }
  }


  if (aux == tarefas.length - 1) { // valida auxiliar igual a tamanho da lista - 1
    aux = -1 // define auxiliar como -1
  }

  tarefas[aux + 1].className = "tarefa-selecionada" // muda a class do elemento de tarefas do auxiliar +1
})

frm.btRetirar.addEventListener("click", () => {
  const tarefas = document.querySelectorAll("h5") // seleciona todos os elementos com h5

  let aux = -1 // define auxiliar


  tarefas.forEach((tarefa, i) => { // percorre tarefas criando indexador i e um objeto para cada iteração de tarefa
    if (tarefa.className == "tarefa-selecionada") { // valida pela classe da tarefa
      aux = i // troca auxiliar pelo idexador
      console.log(i) // mostra indexador no console
    }
  })

  if (aux == -1) { // valida auxiliar se é -1
    alert("Selecione uma tarefa para removê-la...") // pede para selecionar tarefa quando vazia
    return
  }

  if (confirm(`Confirma Exclusão de "${tarefas[aux].innerText}"?`)) { // exibe mensagem de confirmação com o nome da tarefa buscada pelo indice
    dvQuadro.removeChild(tarefas[aux]) // remove tarefa da div
  }
})

frm.btGravar.addEventListener("click", () => {
  const tarefas = document.querySelectorAll("h5") // busca todas as tarefas pelo h5

  if (tarefas.length == 0) { // valida se é vazia
    alert("Não há tarefas para serem salvas") // exibe caso for vazio
    return
  }

  let dados = "" // cria a variavel dados
  tarefas.forEach(tarefa => { // itera dados criaando um objeto tarefa para cada linha
    dados += tarefa.innerText + ";"// concatena tarefa com o dados
  })


  localStorage.setItem("tarefasDia", dados.slice(0, -1)) // salva dados


  if (localStorage.getItem("tarefasDia")) { // recupera dados
    alert("Ok! Tarefas Salvas") // mensagem de salvo
  }
})

window.addEventListener("load", () => {

  if (localStorage.getItem("tarefasDia")) { // valida se dados existem

    const dados = localStorage.getItem("tarefasDia").split(";") // busca os dados separados por virgula

    // percorre os dados armazenados em localStorage
    dados.forEach(dado => { // percorre o conjunto
      const h5 = document.createElement("h5") // cria um elemento para cada valor da lista
      const texto = document.createTextNode(dado) // implementa o texto no elemento
      h5.appendChild(texto) // anexa o texto no elemento
      dvQuadro.appendChild(h5) // anexa o elemento na div da pagina
    })
  }
})