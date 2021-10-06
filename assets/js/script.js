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

// RESET
let botaoReset = () => {
    const esvaziarTabela = document.querySelector('#tabela').innerHTML = '';
    criarTabela();

    matriz = [];
    zeraMatriz();

    contPlayer1 = 0;
    contPlayer2 = 0;
    contador();

    resetaCronometro()
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

    let linhaInteira = document.querySelectorAll(`div[data-linha='${linhaX}']`);
    let colunaInteira = document.querySelectorAll(`div[data-col='${colunaY}']`);

    let playerNumber = 1;

    if (idPlayer === 'disco__p2') {
        playerNumber = 2;
    }

    matriz[linhaX][colunaY] = playerNumber;

    // CONFERE POR LINHA
    for (let k = 0; k < matriz.length; k++) {
        let counterRow = 0;
        for (let l = 0; l < matriz[k].length - 1; l++) {
            if (matriz[k][l] === playerNumber &&
                matriz[k][l] === matriz[k][l + 1]) {
                counterRow++
            }
        }
        if (counterRow >= 3) {
            console.log(`Jogador ${playerNumber} ganhou!!!`)
            // return winMessage()
        }
    }

    // CONFERE POR COLUNA
    for (let m = 0; m < matriz.length; m++) {
        let counterCol = 0;
        for (let n = 0; n < matriz.length - 1; n++) {
            if (matriz[n][m] === playerNumber &&
                matriz[n][m] === matriz[n + 1][m])
                counterCol++
        }
        if (counterCol >= 3) {
            console.log(`Jogador ${playerNumber} ganhou!!!`)
            // return winMessage()
        }
    }
}

// INSERE DISCOS
function insereDisco(evt) {
    let celulaVaga = verifica(evt);
    if (celulaVaga !== undefined) {

        switch (player) {
            case true: {
                //player1
                const disco = document.createElement('div');
                disco.setAttribute('class', 'disco')
                disco.setAttribute('id', 'disco__p1')

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

                win(idP2, celulaVaga);

                contPlayer2++;
                player = !player;
                break;
            }
        }
        contador();
        if(contPlayer1 + contPlayer2 === 1) {
            timer = setInterval(() => { cronometro() }, 100);
        }
    }
}

// const textoVitoria = document.createElement('div');
// textoVitoria.innerHTML()
// document.querySelector('.container').appendChild(textoVitoria);

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

// Um pouco fora de sync --- precisa concertar
const cronometro = () => {
    if ((milisegundos += 10) === 100) {
        segundos++;
        milisegundos = 0;
    } if (segundos === 60) {
        minutos++;
        segundos = 0;
    }
    // está muito grande a linha, diminuir
    cronometroBox.innerHTML = `Tempo: 0${minutos}:${segundos > 10 ? segundos : '0' + segundos}:${milisegundos}`;
}

const resetaCronometro = () => {
    minutos = 0;
    segundos = 0;
    milisegundos = 0;
    clearInterval(timer);
    cronometroBox.innerHTML = `Tempo: 00:00:00`
}
resetaCronometro();

// colocar dentro da winMessage() para pausar o cronometro
// clearInterval(timer);