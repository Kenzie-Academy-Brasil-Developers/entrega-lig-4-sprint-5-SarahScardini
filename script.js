// CRIAR A TABELA 6 LINHA X 7 COLUNAS
const tabela = document.querySelector('#tabela')

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

function insereDisco(evt) {
    const disco = document.createElement('div');
    disco.setAttribute('id', 'disco')

    let celulaVaga = verifica(evt);    
    celulaVaga.appendChild(disco);

}