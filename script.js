let corpo = document.querySelector('body');
let tabelas = document.querySelector('#tabelas');
//criando a tabela e adicionando grades internas para cada peça.
window.onload = function gerarTabela(){
    for(let i = 1; i < 8; i++){
        
        const div = document.createElement('div');

        div.classList.add("colunas");

        div.setAttribute('id',  "coluna"+ i);
    
        tabelas.appendChild(div);
    }
    for(let c = 1; c < 8; c++){
        
        let colunas = document.getElementById('coluna'+c);
        
        for(let w = 1;w < 7;w++){
            
            const div = document.createElement('div');

            div.classList.add("caixas")
        
            colunas.appendChild(div);
        }
    }
    
    
 };


 