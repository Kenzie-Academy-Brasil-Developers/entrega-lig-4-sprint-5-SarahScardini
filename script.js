// CRIAR A TABELA 6 LINHA X 7 COLUNAS
const tabela = document.querySelector('#tabela')

// tabela.addEventListener('click', (evt) => {
//     console.log(evt)
//     console.log(evt.target)
//     console.log(evt.currentTarget)
// })

const criarTabela = () => {
    
    for(let i = 0; i < 7; i++){
        const divColuna = document.createElement('div');
        divColuna.setAttribute('class', 'coluna')
        divColuna.setAttribute('data-col', i);
        divColuna.addEventListener('click', insereDisco);

        for(let j = 0; j < 6; j++){
            const divLinha = document.createElement('div');
            divLinha.setAttribute('class', 'linha')
            divLinha.setAttribute('data-linha', j)

            divColuna.appendChild(divLinha);

        }
        tabela.appendChild(divColuna)

    }
    
    // const div = document.createElement('div');
}
criarTabela();

const verifica = (e) => {
        let elementoVazio = e.currentTarget.childNodes;

        console.log(elementoVazio)

        for (let i = e.currentTarget.childNodes.length; i >= 0; i--){
            console.log(i)
            if (elementoVazio.innerHTML === ' ') {

                console.log('nodo vazio', e.currentTarget.childNodes[i])
                // return e.currentTarget.childNodes[i];
            }
        }

    
}

function insereDisco(evt) {
    console.log(evt)
    console.log('target', evt.target)
    console.log('currentTarget', evt.currentTarget)

    const disco = document.createElement('div');
    disco.setAttribute('id', 'disco')

    // const ultimoElemento = evt.currentTarget.lastChild;
    // let teste = ultimoElemento;

    // console.log('ultimoElemento', ultimoElemento)
    // console.log('teste', teste)

    // let acima = ultimoElemento.previousElementSibling;

    let celulaVaga = verifica(evt);
    
    celulaVaga.appendChild(disco);

}

