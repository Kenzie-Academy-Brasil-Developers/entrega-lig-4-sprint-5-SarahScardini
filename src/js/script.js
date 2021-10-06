const tabela = document.querySelector('#tabela');
let player = true;
let contPlayer1 = 0;
let contPlayer2 = 0;

let matriz = [];
const zeraMatriz = () => {
    for (let i = 0; i < 6; i++) {
        let row = [];
        for (let j = 0; j < 7; j++) {
            row.push(0);
        }
        matriz.push(row);
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
const mensagemVitoria = (vencedor) => {
    clearInterval(timer);
    textoVitoria.innerText = (`Jogador ${vencedor} ganhou!!!`);
    document.querySelector('#resultado').appendChild(textoVitoria);
    if (vencedor === 1) {
        points1++
    } else {
        points2++
    }
    score();
}

// EMPATE
const empate = () => {
    let matrizStr = matriz.toString().includes('0');
    if (!matrizStr) {
        textoVitoria.innerHTML = `Empate!`;
        clearInterval(timer);
    }
}

// RESET
let botaoReset = () => {
    const esvaziarTabela = document.querySelector('#tabela').innerHTML = '';
    criarTabela();
    textoVitoria.innerText = '';
    matriz = [];
    zeraMatriz();
    contPlayer1 = 0;
    contPlayer2 = 0;
    contador();
    resetaCronometro();
}

let gerarBotao = () => {
    const botao = document.createElement('button');
    botao.innerText = 'Reset';
    botao.setAttribute('class', 'reset');
    document.querySelector('.container').appendChild(botao);
    const reset = document.querySelector('.reset');
    reset.onclick = botaoReset;
}
gerarBotao();

// VERIFICA SE A CAIXA ESTÁ VAZIA
const verifica = (e) => {
    let elementoVazio = e.currentTarget.childNodes;

    for (let i = e.currentTarget.childNodes.length - 1; i >= 0; i--) {

        if (elementoVazio[i].innerHTML === '') {
            let posicao = elementoVazio[i];

            return e.currentTarget.childNodes[i];
        }
    }
}

// FUNÇÃO VENCEDOR
const win = (idPlayer, elemento) => {
    let linhaX = elemento.dataset.linha;
    let colunaY = elemento.dataset.col;
    let playerNumber = 1;

    if (idPlayer === 'disco__p2') {
        playerNumber = 2;
    }

    matriz[linhaX][colunaY] = playerNumber;

    // CONFERE POR LINHA
    for (let k = 0; k < matriz.length; k++) {
        for (let l = 0; l < matriz[k].length - 3; l++) {
            if (matriz[k][l] === playerNumber &&
                matriz[k][l] === matriz[k][l + 1] &&
                matriz[k][l + 1] === matriz[k][l + 2] &&
                matriz[k][l + 2] === matriz[k][l + 3]) {
                return mensagemVitoria(playerNumber);
            }
        }
    }

    // CONFERE POR COLUNA
    for (let m = 0; m < matriz.length + 1; m++) {
        for (let n = 0; n < matriz.length - 3; n++) {
            if (matriz[n][m] === playerNumber &&
                matriz[n][m] === matriz[n + 1][m] &&
                matriz[n + 1][m] === matriz[n + 2][m] &&
                matriz[n + 2][m] === matriz[n + 3][m]) {
                return mensagemVitoria(playerNumber);
            }
        }
    }

    // DIAGONAL DIREITA
    for (let a = 0; a < matriz.length - 3; a++) {
        for (let b = 0; b <= matriz.length - 3; b++) {
            if (matriz[a][b] === playerNumber &&
                matriz[a + 1][b + 1] === playerNumber &&
                matriz[a + 2][b + 2] === playerNumber &&
                matriz[a + 3][b + 3] === playerNumber) {
                return mensagemVitoria(playerNumber);
            }
        }
    }

    // DIAGONAL ESQUERDA
    for (let q = 0; q < matriz.length - 3; q++) {//linha       
        for (let r = 0; r <= matriz.length; r++) {//coluna 
            if (matriz[q][r] === playerNumber &&
                matriz[q + 1][r - 1] === playerNumber &&
                matriz[q + 2][r - 2] === playerNumber &&
                matriz[q + 3][r - 3] === playerNumber) {
                return mensagemVitoria(playerNumber);
            }
        }

    }
    empate()
}

// INSERE DISCOS
function insereDisco(evt) {
    let celulaVaga = verifica(evt);
    if (celulaVaga !== undefined) {

        switch (player) {
            case true: {
                //player1
                const disco = document.createElement('div');
                disco.setAttribute('class', 'disco');
                disco.setAttribute('id', 'disco__p1');

                const idP1 = 'disco__p1';
                celulaVaga.appendChild(disco);
                contPlayer1++;

                win(idP1, celulaVaga);

                player = !player;
                break;
            }

            case false: {
                // player2
                const disco = document.createElement('div');
                disco.setAttribute('class', 'disco');
                disco.setAttribute('id', 'disco__p2');

                const idP2 = 'disco__p2';
                celulaVaga.appendChild(disco);
                contPlayer2++;

                win(idP2, celulaVaga);

                player = !player;
                break;
            }
        }
        contador();
        if (contPlayer1 + contPlayer2 === 1) {
            timer = setInterval(() => { cronometro() }, 10);
        }
    }
}

// CONTADOR
const contador = () => {
    let contador1 = document.querySelector('.contador__p1');
    let contador2 = document.querySelector('.contador__p2');
    contador1.innerHTML = `Movimentos do Jogador <strong>1</strong>: ${contPlayer1}`;
    contador2.innerHTML = `Movimentos do Jogador <strong>2</strong>: ${contPlayer2}`;
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
    cronometroBox.innerHTML = `Tempo: 0${minutos}:${segundos > 10 ? segundos :
        '0' + segundos}:${milisegundos}`;
}

const resetaCronometro = () => {
    minutos = 0;
    segundos = 0;
    milisegundos = 0;
    clearInterval(timer);
    cronometroBox.innerHTML = `Tempo: 00:00:00`;
}
resetaCronometro();

// SCORE 
let score1 = document.querySelector('.placar1');
let score2 = document.querySelector('.placar2');
let points1 = 0;
let points2 = 0;

const score = () => {
    score1.innerHTML = `Jogador 1: ${points1}`;
    score2.innerHTML = `Jogador 2: ${points2}`;
};
score();