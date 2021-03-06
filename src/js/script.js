const tabela = document.querySelector('#tabela');
let jogador = true;
let contJogador1 = 0;
let contJogador2 = 0;

let matriz = [];
const zeraMatriz = () => {
    for (let i = 0; i < 6; i++) {
        let linha = [];
        for (let j = 0; j < 7; j++) {
            linha.push(0);
        }
        matriz.push(linha);
    }
}
zeraMatriz();

// CRIAR A TABELA 6 LINHA X 7 COLUNAS
const criarTabela = () => {

    for (let i = 0; i < 7; i++) {
        const divColuna = document.createElement('div');
        divColuna.setAttribute('class', 'colunas');
        divColuna.setAttribute('data-col', i);
        divColuna.addEventListener('click', insereDisco);

        for (let j = 0; j < 6; j++) {
            const divLinha = document.createElement('div');
            divLinha.setAttribute('class', 'caixas');
            divLinha.setAttribute('data-linha', j);
            divLinha.setAttribute('data-col', i);
            divColuna.appendChild(divLinha);
        }
        tabela.appendChild(divColuna);
    }
}
criarTabela();

// MENSAGEM VITÓRIA
const textoVitoria = document.createElement('div');
const textoVitoriaDiv = document.querySelector('#resultado');
let imagemVitoria = document.createElement('div');
document.body.appendChild(imagemVitoria);

const mensagemVitoria = (vencedor) => {
    textoVitoria.innerText = (`Jogador ${vencedor} ganhou!!!`);
    textoVitoriaDiv.appendChild(textoVitoria);
    if (vencedor === 1) {
        pontos1++
    } else {
        pontos2++
    }
    clearInterval(timer);
    imagemVitoria.classList.add('imagemVitoria');
    placar();
}

// EMPATE
const empate = () => {
    let matrizStr = matriz.toString().includes('0');
    if (!matrizStr) {
        clearInterval(timer);
        textoVitoria.innerText = `Empate!`;
        textoVitoriaDiv.appendChild(textoVitoria);
        imagemVitoria.classList.add('imagemEmpate');
    }
}

// RESET
let botaoReset = () => {
    const cair = document.querySelectorAll('.disco');

    for (let i = 0; i < cair.length; i++) {
        let random = Math.floor(Math.random() * (9 - 4)) + 4;
        cair[i].style.animation = `sairDaTela .${random}s`;
    }

    resetaCronometro();
    setTimeout(() => {
        const esvaziarTabela = document.querySelector('#tabela').innerHTML = '';
        criarTabela();
        textoVitoriaDiv.innerHTML = '';
        matriz = [];
        zeraMatriz();
        contJogador1 = 0;
        contJogador2 = 0;
        contador();

        imagemVitoria.classList.remove('imagemVitoria');
        imagemVitoria.classList.remove('imagemEmpate');
    }, 400)
}

let gerarBotao = () => {
    const botao = document.createElement('button');
    botao.innerText = 'Reset';
    botao.setAttribute('class', 'reset');
    document.querySelector('.botoes').appendChild(botao);
    const reset = document.querySelector('.reset');
    reset.onclick = botaoReset;
}
gerarBotao();

// VERIFICA SE A CAIXA ESTÁ VAZIA
const verifica = (e) => {
    let elementoVazio = e.currentTarget.childNodes;
    for (let i = e.currentTarget.childNodes.length - 1; i >= 0; i--) {
        if (elementoVazio[i].innerHTML === '') {
            return e.currentTarget.childNodes[i];
        }
    }
}

// IMPEDE A JOGADA DEPOIS DA VITÓRIA
const verificaVitoria = () => {
    if (document.querySelector('#resultado').innerHTML !== null) {
        for (let i = 0; i < matriz.length + 1; i++) {
            document.getElementsByClassName('colunas')[i].removeEventListener('click', insereDisco);
        }
    }
}

// FUNÇÃO VENCEDOR
const vitoria = (idPlayer, elemento) => {
    let linhaX = elemento.dataset.linha;
    let colunaY = elemento.dataset.col;
    let numeroJogador = 1;

    if (idPlayer === 'disco__p2') {
        numeroJogador = 2;
    }

    matriz[linhaX][colunaY] = numeroJogador;

    // CONFERE POR LINHA
    for (let k = 0; k < matriz.length; k++) {
        for (let l = 0; l < matriz[k].length - 3; l++) {
            if (matriz[k][l] === numeroJogador &&
                matriz[k][l] === matriz[k][l + 1] &&
                matriz[k][l + 1] === matriz[k][l + 2] &&
                matriz[k][l + 2] === matriz[k][l + 3]) {
                verificaVitoria();
                return mensagemVitoria(numeroJogador);
            }
        }
    }

    // CONFERE POR COLUNA
    for (let m = 0; m < matriz.length + 1; m++) {
        for (let n = 0; n < matriz.length - 3; n++) {
            if (matriz[n][m] === numeroJogador &&
                matriz[n][m] === matriz[n + 1][m] &&
                matriz[n + 1][m] === matriz[n + 2][m] &&
                matriz[n + 2][m] === matriz[n + 3][m]) {
                verificaVitoria();
                return mensagemVitoria(numeroJogador);
            }
        }
    }

    // DIAGONAL DIREITA
    for (let a = 0; a < matriz.length - 3; a++) {
        for (let b = 0; b <= matriz.length - 3; b++) {
            if (matriz[a][b] === numeroJogador &&
                matriz[a + 1][b + 1] === numeroJogador &&
                matriz[a + 2][b + 2] === numeroJogador &&
                matriz[a + 3][b + 3] === numeroJogador) {
                verificaVitoria();
                return mensagemVitoria(numeroJogador);
            }
        }
    }

    // DIAGONAL ESQUERDA
    for (let q = 0; q < matriz.length - 3; q++) {//linha       
        for (let r = 0; r <= matriz.length; r++) {//coluna 
            if (matriz[q][r] === numeroJogador &&
                matriz[q + 1][r - 1] === numeroJogador &&
                matriz[q + 2][r - 2] === numeroJogador &&
                matriz[q + 3][r - 3] === numeroJogador) {
                verificaVitoria();
                return mensagemVitoria(numeroJogador);
            }
        }
    }

    empate()
}

// INSERE DISCOS
function insereDisco(evt) {
    let celulaVaga = verifica(evt);
    if (celulaVaga !== undefined) {

        switch (jogador) {
            case true: {
                //player1
                const disco = document.createElement('div');
                const img = document.createElement('img');
                img.src = jogador1img;
                img.setAttribute('class', 'img')
                disco.appendChild(img);
                disco.setAttribute('class', 'disco');
                disco.setAttribute('id', 'disco__p1');
                // disco.style.backgroundImage = `url(${jogador1img})`;

                const idP1 = 'disco__p1';
                celulaVaga.appendChild(disco);
                contJogador1++;

                vitoria(idP1, celulaVaga);

                jogador = !jogador;
                break;
            }

            case false: {
                // player2
                const disco = document.createElement('div');
                const img = document.createElement('img');
                img.src = jogador2img;
                img.setAttribute('class', 'img');
                disco.setAttribute('class', 'disco');
                disco.setAttribute('id', 'disco__p2');
                disco.appendChild(img);

                const idP2 = 'disco__p2';
                celulaVaga.appendChild(disco);
                contJogador2++;

                vitoria(idP2, celulaVaga);

                jogador = !jogador;
                break;
            }
        }
        contador();
        if (contJogador1 + contJogador2 === 1) {
            timer = setInterval(() => { cronometro() }, 10);
        }
    }
}

// CONTADOR
const contador = () => {
    let contador1 = document.querySelector('.contador__p1');
    let contador2 = document.querySelector('.contador__p2');
    contador1.innerHTML = `Jogador 1: ${contJogador1}`;
    contador2.innerHTML = `Jogador 2: ${contJogador2}`;
}
contador();

// CRONOMETRO
let cronometroBox = document.querySelector('.cronometro');
let minutos = 0;
let segundos = 0;
let milisegundos = 0;
let timer;

const cronometro = () => {
    if ((milisegundos += 10) === 1000) {
        segundos++;
        milisegundos = 0;
    } if (segundos === 60) {
        minutos++;
        segundos = 0;
    }
    cronometroBox.innerHTML = `0${minutos}:${segundos > 10 ? segundos :
        '0' + segundos}:${milisegundos}`;
}

const resetaCronometro = () => {
    minutos = 0;
    segundos = 0;
    milisegundos = 0;
    clearInterval(timer);
    cronometroBox.innerHTML = `00:00:00`;
}
resetaCronometro();

// SCORE 
let placar1 = document.querySelector('.placar1');
let placar2 = document.querySelector('.placar2');
let pontos1 = 0;
let pontos2 = 0;

const placar = () => {
    placar1.innerHTML = `Jogador 1: ${pontos1}`;
    placar2.innerHTML = `Jogador 2: ${pontos2}`;
};
placar();

// PAGINA INICIAL
const paginaInicial = document.querySelector('.paginaInicial');
let paragrafo = document.querySelector('.paginaInicial p');
const main = document.querySelector('main');
const btnTroca = document.createElement('button');
btnTroca.classList.add('btnTroca');
btnTroca.setAttribute('value', 'jogar');
btnTroca.innerText = 'Jogar';
paginaInicial.appendChild(btnTroca);

btnTroca.addEventListener('click', () => {
    if (clicks === 2) {
        main.style.display = 'flex';
        paginaInicial.style.display = 'none';
    } else {
        paragrafo.classList.add('pulsa');
        setTimeout(() => {
            paragrafo.classList.remove('pulsa');
        }, 400)
    }
});

// ESCOLHER PERSONAGEM
const figuras = ['./src/assets/img/psyduck.png', './src/assets/img/monkey.png',
    './src/assets/img/duck.png', './src/assets/img/monkey2.png',
    './src/assets/img/rubberDuck.png', './src/assets/img/yoyo-monkey.png',
    './src/assets/img/astronaut.png','./src/assets/img/blue-rocket.png',
    './src/assets/img/kenzie.png', './src/assets/img/kenzie-blocks.png']; 

const escolhasDiscos = () => {
    let discosCaixa = document.querySelector('.caixa__discos');
    for (let i = 0; i < figuras.length; i++) {
        let chooseDisc = document.createElement('div');
        chooseDisc.classList.add('disco', 'caixas');
        chooseDisc.setAttribute('id', `discoInicial`);
        chooseDisc.dataset.number = `${i}`;
        chooseDisc.style.backgroundImage = `url(${figuras[i]})`;
        discosCaixa.appendChild(chooseDisc)
    }
    paginaInicial.appendChild(discosCaixa);
};
escolhasDiscos()

let clicks = 0;
let jogador1img;
let jogador2img;
let escolhido1 = -1;

document.addEventListener('click', (event) => {
    let escolhido = event.target;
    let escolhidoData = escolhido.dataset.number;

    if (escolhidoData) {
        if (clicks < 2 && escolhidoData !== escolhido1) {
            clicks++
            escolhido.style.boxShadow = '0px 0px 4px 3px #2A8BE6';

            switch (jogador) {
                case true: {
                    jogador1img = figuras[escolhido.dataset.number];
                    escolhido.style.backgroundColor = 'var(--yellow)';
                    paragrafo.innerText = 'Selecione o jogador 2';
                    escolhido1 = escolhido.dataset.number;
                    jogador = !jogador;
                    break;

                } case false: {
                    jogador2img = figuras[escolhido.dataset.number];
                    escolhido.style.backgroundColor = 'var(--dark-blue)';
                    paragrafo.innerText = 'Click em jogar para começar!';
                    jogador = !jogador;
                    break;
                }
            }
        }
    }
});

// TROCAR PERSONAGEM
const trocarPer = () => {
    botaoReset()
    setTimeout(() => {
        jogador = true;
        clicks = 0;
        paragrafo.innerText = 'Selecione o jogador 1';
        paginaInicial.style.display = 'flex';
        main.style.display = 'none';
        let discosCaixa = document.querySelector('.caixa__discos');
        discosCaixa.innerHTML = '';
        escolhido1 = 20;
        escolhasDiscos();
    }, 400)
}

const btnPersonagem = () => {
    const btnEscolher = document.createElement('button');
    btnEscolher.classList.add('escolherDnv');
    btnEscolher.innerText = 'Escolher outro personagem';
    document.querySelector('.botoes').appendChild(btnEscolher);

    const btnPers = document.querySelector('.escolherDnv');
    btnPers.onclick = trocarPer;
}
btnPersonagem();