// CRIAR A TABELA 6 LINHA X 7 COLUNAS
const tabela = document.querySelector('#tabela')
let player      = true;
let contPlayer1 = 0;
let contPlayer2 = 0;

const matriz = [[]];

const criarTabela = () => {
    
    for(let i = 0; i < 7; i++){
        const divColuna = document.createElement('div');
        divColuna.setAttribute('class', 'colunas')
        divColuna.setAttribute('data-col', i);

        divColuna.addEventListener('click', insereDisco);

        for(let j = 0; j < 6; j++){
            const divLinha = document.createElement('div');
            divLinha.setAttribute('class', 'caixas')
            divLinha.setAttribute('data-linha', j)
            divLinha.setAttribute('data-col', i)

            divColuna.appendChild(divLinha);

        }
        tabela.appendChild(divColuna)
    }
}
criarTabela();
let botaoReset = () =>{
    const esvaziarTabela = document.querySelector('#tabela').innerHTML = '';
    criarTabela();
}
let gerarBotao = () =>{
    const botao = document.createElement('button');
    botao.innerText = 'Reset';
    botao.setAttribute('class','reset');
    document.querySelector('.container').appendChild(botao);
    const reset = document.querySelector('.reset');
    reset.onclick = botaoReset;
}
gerarBotao();

const verifica = (e) => {
    let elementoVazio = e.currentTarget.childNodes;

        for (let i = e.currentTarget.childNodes.length - 1; i >= 0; i--){

            if (elementoVazio[i].innerHTML === '') {
                let posicao = elementoVazio[i];
                
                console.log(posicao)
               
                return e.currentTarget.childNodes[i];
            }
        }
}

const validaUltimo = (idPlayer, elemento) => {
        let linhaX  = elemento.dataset.linha;
        let colunaY = elemento.dataset.col;

        let linhaInteira = document.querySelectorAll(`div[data-linha='${linhaX}']`)
        let colunaInteira = document.querySelectorAll(`div[data-col='${colunaY}']`)

        console.log('linha inteira', linhaInteira)
        console.log('coluna inteira', colunaInteira)

        console.log('linha', linhaX)
        console.log('coluna', colunaY)

        
        for(let i = 0; i < linhaInteira.length; i++){ 
            if (linhaInteira[i].firstChild.id === idPlayer){
                console.log('igual', i)
            } else {
                return console.log('não foi sequencia')
            }
            
        }
    
}

function insereDisco(evt) {

    switch(player){
        case true: {
            //player1
            const disco = document.createElement('div');
            disco.setAttribute('class', 'disco')
            disco.setAttribute('id', 'disco__p1')

            const idP1 = 'disco__p1';

            let celulaVaga = verifica(evt);    
            
            celulaVaga.appendChild(disco);
            contPlayer1++;

            if (contPlayer1 === 4){
                validaUltimo(idP1,  celulaVaga)
            }
            player = !player;   
        break;
        }            

        case false: {
            // player2
            const disco = document.createElement('div');
            disco.setAttribute('class', 'disco')
            disco.setAttribute('id', 'disco__p2')

            let celulaVaga = verifica(evt);    
            celulaVaga.appendChild(disco);

            contPlayer2++;
            player = !player;   
        break;
        }     
    }  
}
const textoVitoria = document.createElement('div');
textoVitoria.innerHTML()
document.querySelector('.container').appendChild(textoVitoria);