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

const verifica = (e) => {
    let elementoVazio = e.currentTarget.childNodes;

        for (let i = e.currentTarget.childNodes.length - 1; i >= 0; i--){

            if (elementoVazio[i].innerHTML === '') {
               
                return e.currentTarget.childNodes[i];
            }
        }
}

const validaUltimo = (idPlayer, elemento) => {
        let linhaX  = elemento.dataset.linha;
        let colunaY = elemento.dataset.col;

        

        let linhaInteira = document.querySelectorAll(`div[data-linha='${linhaX}']`)
        let colunaInteira = document.querySelectorAll(`div[data-col='${colunaY}']`)
        
        console.log('coluna parent', colunaInteira.parentElement)
        
        let contLinha = 0;
        let contCol   = 0;

        let discoAntBaixo = colunaY.previousSibling;
        console.log(discoAntBaixo);

        console.log('linha inteira', linhaInteira)
        console.log('coluna inteira', colunaInteira)

        console.log('linha', linhaX)
        console.log('coluna', colunaY)

        // VITÓRIA LINHA
        for(let i = 0; i < linhaInteira.length; i++){ 
            if(linhaInteira[i].firstChild !== null){
                if (linhaInteira[i].firstChild.id === idPlayer){
                    contLinha++;
                        if(contLinha === 4){
                             console.log('igual linha', i, 'linha venceu')
                        }
                } else {
                    return console.log('não foi sequencia linha')
                }
            }
        }

        // VITÓRIA COLUNA
        for (let j = 1; j < colunaInteira.length; j++){
            if (colunaInteira[j].firstChild !== null ){
                if(colunaInteira[j].firstChild.id === idPlayer){
                    contCol++;
                        if(contCol === 4){
                             console.log('igual coluna', j, 'coluna venceu')
                        }
                } else {
                    return console.log('não foi sequencia coluna')
                }
            }
            
        }

        //VITÓRIA DIAGONAL
        for (let k = 0; k < 4; k++){
            
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

            if (contPlayer1 >= 4){

                //A PARTIR DO MOMENTO QUE TIVER 4 DISCOS VAI SER NECESSÁRIO CHEGAR A CADA
                // JOGADA
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