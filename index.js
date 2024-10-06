// class Repository {
//     constructor() {
//         this.name = name;
//         this.owner = owner;
//         this.stars = stars;
//     }
// }

async function apiGithubsearch() {

    const debounce = (fn, debounceTime) => {
        let timer;
        return function (...args) {
          clearTimeout(timer);
          timer = setTimeout(() => {
            fn.apply(this, args);
          }, debounceTime);
        };
      };

const input = document.querySelector('.search-input');
const listContainer = document.querySelector('.autocomplete-container');

function render(coll) { 
    listContainer.innerHTML = '';
    const list = document.createElement('ul'); 
    for (const element of coll) { 
      const item = document.createElement('li'); 
      item.textContent = element; 
      item.classList.add('autocomplete-item');
      list.appendChild(item); 
    } 
    listContainer.append(list); 
  }

  async function requestToApi(url) {
    const response = await fetch(url);
    const data = await response.json();
    const repos = data.items;
    return repos;
  } 

input.addEventListener('input', debounce(async function() {
    const inputValue = this.value;
    const requestUrl = `https://api.github.com/search/repositories?q=${inputValue}`;
    let result = []; 

    const repositories = await requestToApi(requestUrl);
  
      for (let i = 0; i < 5; i++) {
        if (repositories[i]) {
        result.push(repositories[i]);
        }
      }

      let names = [];

      for (const element of result) {
        names.push(element.name);
      }
      
    render(names);
  }, 400));
  
};

apiGithubsearch();