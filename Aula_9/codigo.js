
const url = 'https://botafogo-atletas.mange.li/2024-1/';

const pega_json = async(caminho) => {
    const resposta = await fetch(caminho);
    const dados = await resposta.json();
    return dados;
}

const container = document.getElementById("container");

const manipulaClick = (e) => {
    const id = e.currentTarget.dataset.id;
    const url = `detalhes.html?id=${id}`;

    //cookie
    document.cookie = `id=${id}`;
    document.cookie = `altura=${e.currentTarget.dataset.altura}`;

    //localStorage
    localStorage.setItem('id', id);
    localStorage.setItem('dados', JSON.stringify(e.currentTarget.dataset));

    sessionStorage.setItem('id', id);
    sessionStorage.setItem('dados', JSON.stringify(e.currentTarget.dataset));


    window.location = url;
}

const montaCard = (atleta) => {
    const cartao = document.createElement("article");
    const nome = document.createElement("h1");
    const imagem = document.createElement("img");
    const descri = document.createElement("p");
    const link = document.createElement('a');

    nome.innerHTML = atleta.nome;
    nome.style.fontFamily = "sans-serif"
    cartao.appendChild(nome);

    imagem.src = atleta.imagem;
    cartao.appendChild(imagem);

    descri.innerHTML = atleta.detalhes;
    cartao.appendChild(descri);

    /*link.innerText = "Saiba mais..."
    link.href = `detalhes.html?id=${atleta.id}`;
    cartao.appendChild(link)*/

    cartao.onclick = manipulaClick;

    cartao.dataset.id = atleta.id;
    cartao.dataset.nJogos = atleta.n_jogos;
    cartao.dataset.altura = atleta.altura;


    return cartao;
};        

pega_json(`${url}masculino`).then(
    (r) => {
        r.forEach(
            (ele) => container.appendChild(montaCard(ele))
        )
    }
);

const manipulaBotao = () => {
    const texto = document.getElementById("senha").value;
    if (hex_md5(texto) === '5029cc9dd0295ded2f500084635c18c1'){
        sessionStorage.setItem('Logado', 'sim');
    }
    else{
        alert("voce errou a senha!!!");
    }
}

const logout = () => {
    sessionStorage.removeItem('Logado');
}

document.getElementById('botao').onclick = manipulaBotao;
document.getElementById('logout').onclick = logout;

