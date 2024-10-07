const debounce = (fn, debounceTime) => {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, debounceTime);
  };
};



async function apiGithubsearch() {

const input = document.querySelector('.search-input');
const listContainer = document.querySelector('.autocomplete-container');
const selectedRepoList = document.querySelector('.selected-repo-list');

function render(coll, owners, stars) {
  listContainer.textContent = ''; 
  const list = document.createElement('ul');  
  for (let i = 0; i < coll.length; i++) {  
    const element = coll[i];
    const owner = owners[i];
    const starUrl = stars[i];
    const item = document.createElement('li');  
    item.textContent = element;  
    item.classList.add('autocomplete-item'); 
    item.dataset.owner = owner;
    item.dataset.stars = starUrl; 
    item.addEventListener('click', selectRepository); 
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
    let result = []

    const repositories = await requestToApi(requestUrl);
  
      for (let i = 0; i < 5; i++) {
        if (repositories[i]) {
        result.push(repositories[i]);
        }
      }

      let names = [];
      let owners = [];
      let stars = [];

      for (const element of result) {
        names.push(element.name);
        owners.push(element.owner.login);
        stars.push(element.stargazers_count);
      }

      render(names, owners, stars); 

  }, 400));


  function selectRepository(event) {
    const clickedItem = event.currentTarget;
    const repositoryName = clickedItem.textContent;
    const ownerName = clickedItem.getAttribute('data-owner');
    const stars = clickedItem.getAttribute('data-stars');
  
    const existingItem = document.querySelector(`li[data-repository="${repositoryName}"]`);
    if (existingItem) {
      alert('Sorry, this repository has already been added to the list, you cannot add it again.');
      return;
    }
  
    const selectedItem = document.createElement('li');
    selectedItem.classList.add('selected-item');
    selectedItem.dataset.repository = repositoryName; // Add data-repository attribute
  
    const selectedItemText = document.createElement('p');
    selectedItemText.innerText = `Name: ${repositoryName}
    Owner: ${ownerName}
    Stars: ${stars}`;
  
    const removeButton = document.createElement('button');
    removeButton.classList.add('remove-button');
    removeButton.textContent = 'X';
  
    selectedItem.appendChild(selectedItemText);
    selectedItem.appendChild(removeButton);
    selectedRepoList.appendChild(selectedItem);
  
    removeButton.addEventListener('click', () => {
      selectedItem.remove();
    });
  
    listContainer.textContent = '';
    input.value = '';
  }
};

apiGithubsearch();