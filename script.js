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
        
        // console.log('coluna parent', elemento.parentElement.previousSibling.childNodes[colunaY-1], colunaY)
        
        let contLinha = 0;
        let contCol   = 0;

       

        // console.log('linha inteira', linhaInteira)
        // console.log('coluna inteira', colunaInteira)

        // console.log('linha', linhaX)
        // console.log('coluna', colunaY)

        // VITÓRIA LINHA
        // for(let i = 0; i < linhaInteira.length; i++){ 
        //     if(linhaInteira[i].firstChild !== null){
        //         if (linhaInteira[i].firstChild.id === idPlayer){
        //             contLinha++;
        //                 if(contLinha === 4){
        //                      console.log('igual linha', i, 'linha venceu')
        //                 }
        //         } else {
        //             return console.log('não foi sequencia linha')
        //         }
        //     }
        // }

        // VITÓRIA COLUNA
        // for (let j = 1; j < colunaInteira.length; j++){
        //     if (colunaInteira[j].firstChild !== null ){
        //         if(colunaInteira[j].firstChild.id === idPlayer){
        //             contCol++;
        //                 if(contCol === 4){
        //                      console.log('igual coluna', j, 'coluna venceu')
        //                 }
        //         } else {
        //             return console.log('não foi sequencia coluna')
        //         }
        //     }
            
        // }
        // console.log(elemento.parentElement)
        let discoDiagonalEsqBaixo = 0;
        // VITÓRIA DIAGONAL ESQUERDA BAIXO
        for (let k = 1; k < 4; k++){
            // div com o disco.coluna.tabela.filhos da tabela
            let colAnterior = elemento.parentElement.parentElement.childNodes[colunaY-k];
            if(colAnterior !== undefined){
                let discoAnterior = colAnterior.childNodes[++linhaX]
                if(discoAnterior !== undefined){
                    if(discoAnterior.firstChild !== null){
                        if(discoAnterior.firstChild.id === idPlayer){
                            discoDiagonalEsqBaixo++;
                            if(discoDiagonalEsqBaixo === 3){
                                console.log('ganhou', idPlayer)
                            }
                           
                        }
                        
                    } 
                    
                }
               
            }      

        }

        let discoDiagonalEsqCima = 0;
        for (let k = 1; k < 4; k++){
            // div com o disco.coluna.tabela.filhos da tabela
            let colAnteriorCima = elemento.parentElement.parentElement.childNodes[colunaY++];
            console.log('colunaY', colunaY)
            // console.log(colAnteriorCima)
            // console.log(colAnteriorCima)
            if(colAnteriorCima !== undefined){
                console.log(colAnteriorCima)
                let discoAnteriorCima = colAnteriorCima.childNodes[linhaX++]
                console.log('discoAnteriorCima', discoAnteriorCima)
                if(discoAnteriorCima !== undefined){
                    if(discoAnteriorCima.firstChild !== null){
                        if(discoAnteriorCima.firstChild.id === idPlayer){
                            discoDiagonalEsqCima++;
                            if(discoDiagonalEsqCima === 3){
                                console.log('ganhou', idPlayer)
                            }
                           
                        }
                        
                    } 
                    
                }
               
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

            const idP2 = 'disco__p2';

            let celulaVaga = verifica(evt); 

            celulaVaga.appendChild(disco);
            contPlayer2++;

            if (contPlayer2 >= 4){

                //A PARTIR DO MOMENTO QUE TIVER 4 DISCOS VAI SER NECESSÁRIO CHEGAR A CADA
                // JOGADA
                validaUltimo(idP2,  celulaVaga)
            }
            player = !player;   
        break;
        }     
    }  
}