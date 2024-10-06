console.log('work!');


async function apiGithubsearch() {

const input = document.querySelector('.search-input');
const listContainer = document.querySelector('.auto-complete-container');
console.log(listContainer);

function render(coll) { 
    const list = document.createElement('ul'); 
    for (const element of coll) { 
      const item = document.createElement('li'); 
      item.textContent = element; 
      list.appendChild(item); 
    } 
    listContainer.append(list); 
  }


input.addEventListener('input', async function() {
    const inputValue = this.value;
    const requestApi = `https://api.github.com/search/repositories?q=${inputValue}`;
    let result = []; 
  
    try {
      const response = await fetch(requestApi);
      const data = await response.json();
      const repos = data.items;
  
      for (let i = 0; i < 5; i++) {
        result.push(repos[i].name);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  
    render(result);
  });
  

 
  
};

apiGithubsearch();