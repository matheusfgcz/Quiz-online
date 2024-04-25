const perguntas = [
    {
      pergunta: "Qual é a sintaxe correta para se referir a um script externo chamado 'xxx.js'?",
      respostas: [
        "<script href='xxx.js'>",
        "<script name='xxx.js'>",
        "<script src='xxx.js'>",
      ],
      correta: 2
    },
    {
      pergunta: "Como você escreve 'Hello World' em uma caixa de alerta?",
      respostas: [
        "msgBox('Hello World');",
        "alertBox('Hello World');",
        "alert('Hello World');",
      ],
      correta: 2
    },
    {
      pergunta: "Como você cria uma função em JavaScript?",
      respostas: [
        "function myFunction()",
        "function = myFunction()",
        "function:myFunction()",
      ],
      correta: 0
    },
    {
      pergunta: "Como você chama uma função chamada 'myFunction'?",
      respostas: [
        "call function myFunction()",
        "call myFunction()",
        "myFunction()",
      ],
      correta: 2
    },
    {
      pergunta: "Como escrever uma condição IF em JavaScript?",
      respostas: [
        "if i = 5 then",
        "if i == 5 then",
        "if (i == 5)",
      ],
      correta: 2
    },
    {
      pergunta: "Como um loop WHILE é escrito em JavaScript?",
      respostas: [
        "while (i <= 10)",
        "while i = 1 to 10",
        "while (i <= 10; i++)",
      ],
      correta: 0
    },
    {
      pergunta: "Como um loop FOR é escrito em JavaScript?",
      respostas: [
        "for (i = 0; i <= 5)",
        "for i = 1 to 5",
        "for (i = 0; i <= 5; i++)",
      ],
      correta: 2
    },
    {
      pergunta: "Qual é a maneira correta de escrever um array em JavaScript?",
      respostas: [
        "var colors = (1:'red', 2:'green', 3:'blue')",
        "var colors = 'red', 'green', 'blue'",
        "var colors = ['red', 'green', 'blue']",
      ],
      correta: 2
    },
    {
      pergunta: "Qual operador é usado para comparar igualdade estrita (valor e tipo) em JavaScript?",
      respostas: [
        "==",
        "===",
        "=",
      ],
      correta: 1
    },
    {
      pergunta: "Qual método do objeto String é usado para encontrar a posição de um caractere específico?",
      respostas: [
        "locate()",
        "search()",
        "find()",
      ],
      correta: 1
    }
  ];
  
  //variavel constante que armazena o documento e pega o caminho do id quiz no html
  const quiz = document.querySelector('#quiz')
  //cria uma constante que armazena uma estrutura document que modela um documento para javascript e usa o querySelector para buscar algo
  const template = document.querySelector('template')
  
  //variavel que é um conjunto de dados que guarda informações únicas
  const corretas = new Set()
  //variavel constante para guardar o total dde perguntas
  const totalDePerguntas = perguntas.length
  //variavel constante que armazena o documento e pega o caminho do id acertos no html e dentro dele pega o filho span
  const mostrarTotal = document.querySelector('#acertos span') 
  //modifica o conteudo dentro do span
  mostrarTotal.textContent = corretas.size + ' de ' + totalDePerguntas
  
  for(const item of perguntas){
    //clona o template e todas as tags para cada item do array
    const quizItem = template.content.cloneNode(true)
  
    //modifica o titulo do h3 para o titulo da pergunta do objeto 
    quizItem.querySelector('h3').textContent = item.pergunta
  
    //loop para as respostas
    for(let resposta of item.respostas){
      //pega um subitem e tudo dentro e os clona e muda o conteudo do span
      const dt = quizItem.querySelector('dl dt').cloneNode(true)
      dt.querySelector('span').textContent = resposta
      //Seta um atributo nome para cada input clonado  
      dt.querySelector('input').setAttribute('name', 'pergunta-' + perguntas.indexOf(item))
      //pega o valor dentro do input e do array das respostas pelo indice no momento e armazena [0,1,2]
      dt.querySelector('input').value = item.respostas.indexOf(resposta)
      //cria uma função que passará por cada input sempre que o mesmo for ativo
      dt.querySelector('input').onchange = (event) =>{
        //pega o valor do input selecionado, guarda em uma variavel e compara com a resposta correta
        const estaCorreta = event.target.value == item.correta
        //reseta a contagem de corretas se o usuario mudar para a opção errada
        corretas.delete(item)
        if(estaCorreta){
          //se selecionou a reposta correta soma aos acertos
          corretas.add(item)
        }
        //modifica o conteudo dentro do span e atualiza na tela
        mostrarTotal.textContent = corretas.size + ' de ' + totalDePerguntas
      }
  
      //adiciona um filho para cada dl e mostra na tela
      quizItem.querySelector('dl').appendChild(dt)
    }
    //remove a resposta da tela do usuario
    quizItem.querySelector('dl dt').remove()
    //coloca a pergunta na tela
    quiz.appendChild(quizItem)
  }