const params = new URLSearchParams(window.location.search)
const id = params.get("id");

const url = 'https://botafogo-atletas.mange.li/2024-1/';

const pega_json = async(caminho) => {
    const resposta = await fetch(caminho);
    const dados = await resposta.json();
    return dados;
}

const montaPagina = (dados) => {
    const body = document.body;
    body.innerHTML = "";

    const nome = document.createElement('h1');
    nome.innerHTML = dados.nome;
    body.appendChild(nome);

    const imagem = document.createElement("img");
    imagem.src = dados.imagem;
    body.appendChild(imagem);

    const detalhes = document.createElement("p");
    detalhes.innerHTML = dados.detalhes;
    body.appendChild(detalhes);

    const cookies = document.createElement('p');
    cookies.innerHTML = document.cookie;
    body.appendChild(cookies);
}

if (sessionStorage.getItem('Logado')){
    pega_json(`https://botafogo-atletas.mange.li/2024-1/${id}`).then(
        (r) => montaPagina(r)
    );
}
else{
    document.body.innerHTML = `<h1>Você precisa estar logado</h1>`
}



const achaCookie= ( chave ) => {
    const lista = document.cookie.split("; ");
    const par = lista.find(
        ( e ) => e .startsWith(`${chave}=`)
    );

    return par.split("=")[1];
}

const dadosSessionStorage = sessionStorage.getItem('dados');
const obj = JSON.parse(dadosSessionStorage);

console.log('numero de jogos:', obj.nJogos)