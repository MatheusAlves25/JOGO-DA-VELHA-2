let jogadorAtual = "X"; // Jogador humano
let tabuleiro = ["", "", "", "", "", "", "", "", ""];
let jogoAtivo = true;

const combinacoesVitoria = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
  [0, 4, 8], [2, 4, 6]             // Diagonais
];

const somClique = new Audio("Audio/click.mp3");
const somVitoria = new Audio("Audio/victory.mp3");
const somEmpate = new Audio("Audio/draw.mp3");

const celulas = document.querySelectorAll(".celula");
const mensagem = document.getElementById("mensagem");

celulas.forEach(celula => {
  celula.addEventListener("click", () => {
    const index = celula.getAttribute("data-index");

    // Se a célula estiver vazia e o jogo estiver ativo
    if (tabuleiro[index] === "" && jogoAtivo && jogadorAtual === "X") {
        celula.textContent = "X";
        celula.classList.add("x");
        
        tabuleiro[index] = "X"; // Jogador humano joga
      somClique.currentTime = 0;
      somClique.play();
      verificarResultado();

      // Atualiza o indicativo para a vez da CPU
      if (jogoAtivo) {
        jogadorAtual = "O"; // Passa a vez para a CPU
        document.getElementById("turno-jogador").textContent = "CPU (O)";
        document.getElementById("turno-jogador").style.color = "#00ff00"; // Verde neon para CPU

        cpuJogar(); // CPU faz sua jogada
      }
    }
  });
});

function cpuJogar() {
  setTimeout(() => {
    const indexAleatorio = escolherPosicaoAleatoria();

    // Se a célula estiver vazia, a CPU faz a jogada
    if (tabuleiro[indexAleatorio] === "") {
      tabuleiro[indexAleatorio] = "O";
      celulas[indexAleatorio].textContent = "O";
      celulas[indexAleatorio].classList.add("o");

      somClique.currentTime = 0;
      somClique.play();
      verificarResultado();

      // Passa a vez para o jogador humano
      if (jogoAtivo) {
        jogadorAtual = "X";
        document.getElementById("turno-jogador").textContent = "Jogador X";
        document.getElementById("turno-jogador").style.color = "#00ffff"; // Azul neon para jogador
      }
    } else {
      cpuJogar(); // Se a posição escolhida estiver ocupada, tenta novamente
    }
  }, 2000); // Atraso de 2 segundos para simular a jogada da CPU
}

function escolherPosicaoAleatoria() {
  // Seleciona uma posição vazia aleatória no tabuleiro
  const posicoesVazias = [];
  tabuleiro.forEach((valor, index) => {
    if (valor === "") posicoesVazias.push(index);
  });

  const indexAleatorio = Math.floor(Math.random() * posicoesVazias.length);
  return posicoesVazias[indexAleatorio];
}

function verificarResultado() {
  for (const combinacao of combinacoesVitoria) {
    const [a, b, c] = combinacao;

    if (tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c]) {
      mensagem.textContent = `Jogador ${tabuleiro[a]} venceu!`;
      celulas[a].classList.add("vencedora");
      celulas[b].classList.add("vencedora");
      celulas[c].classList.add("vencedora");
      jogoAtivo = false;
      somVitoria.currentTime = 0;
      somVitoria.play();
      return;
    }
  }

  if (!tabuleiro.includes("")) {
    mensagem.textContent = "Empate!";
    jogoAtivo = false;
    somEmpate.currentTime = 0;
    somEmpate.play();
  }
}

function reiniciarJogo() {
  jogadorAtual = "X";
  tabuleiro = ["", "", "", "", "", "", "", "", ""];
  jogoAtivo = true;
  celulas.forEach(celula => {
    celula.textContent = "";
    celula.classList.remove("x", "o");
    celulas.forEach(celula => {
        celula.textContent = "";
        celula.classList.remove("x", "o", "vencedora");
      });
      
  });
  
  // Atualiza o indicativo de turno para o início
  document.getElementById("turno-jogador").textContent = "Jogador X";
  document.getElementById("turno-jogador").style.color = "#00ffff"; // Azul neon para o jogador
}
// Variáveis para controlar a música de fundo
const musicaDeFundo = new Audio("Audio/bg-music.mp3");
const musicaBtn = document.getElementById("musica-btn");

// Função para controlar a música de fundo
let musicaTocando = false;

musicaBtn.addEventListener("click", () => {
  if (musicaTocando) {
    musicaDeFundo.pause();
    musicaBtn.textContent = "Iniciar Música"; // Altera o texto do botão para "Iniciar Música"
  } else {
    musicaDeFundo.play();
    musicaBtn.textContent = "Parar Música"; // Altera o texto do botão para "Parar Música"
  }
  musicaTocando = !musicaTocando; // Alterna o estado da música (tocando ou não)
});

// Configurações de música (começa pausada)
musicaDeFundo.loop = true; // A música vai tocar em loop
musicaDeFundo.volume = 0.5; // A música começa com volume médio (pode ser ajustado entre 0.0 e 1.0)
document.getElementById("turno-jogador").textContent = "Jogador X";
document.getElementById("turno-jogador").style.color = "#00ffff";
document.getElementById("turno-jogador").style.borderColor = "#00ffff";
document.getElementById("turno-jogador").style.textShadow = "0 0 5px #00ffff";

document.getElementById("turno-jogador").textContent = "CPU (O)";
document.getElementById("turno-jogador").style.color = "#00ff00";
document.getElementById("turno-jogador").style.borderColor = "#00ff00";
document.getElementById("turno-jogador").style.textShadow = "0 0 5px #00ff00";
