const characterId = document.getElementById('characterId');
const btnGo = document.getElementById('btn-go');
const btnReset = document.getElementById('btn-reset');
const content = document.getElementById('content');
const conteinerResult = document.getElementById('result-style');
const image = document.getElementById('img');
// acessa os elementos do html através do objeto DOM, utilizando o método "getElementById"


const fetchApi = (value) => {
  const result = fetch(`https://rickandmortyapi.com/api/character/${value}`)
  .then((res) => res.json())
  return result;
}
// Criando uma Arrow Function, onde estamos acessando a API 'Rick and Morty' através do fetch criando um objeto Promisse
// Onde que após concluido iremos encaminhar os dados a result pelo return


const keys = ['name', 'status', 'species', 'gender', 'origin', 'episode'];
const newKeys = {
  name: 'Nome',
  status: 'Status',
  species: 'Espécie',
  gender: 'Gênero',
  origin: 'Planeta de origem',
  episode: 'Episódios',
}
// Array para inteirar cada elemento com o método map atribuindo um getDocumentById

const buildResult = (result) => {
  return keys.map((key) => document.getElementById(key)).map((elem) => {
// Iremos interagir com cada indice com o map, onde ambos irão receber um elemento pelo DOM
// Após iremos usar map novamente para aplicar uma função
    if(elem.checked === true && (Array.isArray(result[elem.name])) === true){
        const arrayResult = result[elem.name].join('\r\n');
        const newElem = document.createElement('p');
        newElem.innerHTML = `${newKeys[elem.name]}: ${arrayResult}`;
        content.appendChild(newElem);
// Array.isArray é um método para verificar se um elemento é um array 
// object[] acessa propriedade do objeto 
// join() junta todos os elementos de um array em uma string
// \r\n Quebra de linha, `${}` template string interpolação variavel string
// innerHTML = envia conteudo ao html, appendChild cria um nó filho no elem.pai
      } else if(elem.checked === true && (elem.name === 'origin')){
        const newElem = document.createElement('p');
        newElem.innerHTML = `${newKeys[elem.name]}: ${result[elem.name].name}`;
        content.appendChild(newElem);

      } else if(elem.checked === true && typeof(result[elem.name]) !== 'object'){
        const newElem = document.createElement('p');
        newElem.innerHTML = `${newKeys[elem.name]}: ${result[elem.name]}`;
        content.appendChild(newElem);
        // typeof verifica o tipo de variavel
      }
    });
}
// função assíncrona dentro do addEventListener
btnGo.addEventListener('click', async (event) => {
  event.preventDefault();
//   Cancela o evento porém não para a propagação

  if(characterId.value === ''){
    return content.innerHTML = 'É necessário fazer um filtro.';
  }

  const result = await fetchApi(characterId.value);
  if(content.firstChild === null){
    conteinerResult.className = 'result-style';
    image.src = `${result.image}`;
    buildResult(result);
  } else {
    content.innerHTML = '';
    conteinerResult.className = 'result-style';
    image.src = `${result.image}`;
    buildResult(result);
  }
});

btnReset.addEventListener('click', () => location.reload());
// Atualiza a página 