const apiKey = 'bEMG5NiP29-la9o1En4kcImhoDjpULTb2TfqGQFDBv8'


const inputBox = document.getElementById('search-input')
const searchContainer = document.querySelector('.search-results')
const showMore = document.getElementById('show-more-button')
// const search = document.getElementById('search')

let page = 1;
let searchItem = ''




function startSearch() {
    if (inputBox.value === ''){
        alert("No input entered!")
    } else {
        searchItem = `${inputBox.value.toLowerCase()}`
        const api = `https://api.unsplash.com/search/photos?page=${page}$&query=${searchItem}&client_id=bEMG5NiP29-la9o1En4kcImhoDjpULTb2TfqGQFDBv8`
        checkImage(api)
    }
    inputBox.value = ''
    showMore.style.display = 'block'
    page += 1
}




async function checkImage (url){
    searchContainer.innerHTML = ''

    const response = await fetch(url)
    var data = await response.json()

    //Get the length for each result in one page
    const length = data.results.length

    //Displaying the searched images
    for (let i=0; i<=length; i++){
        let image = document.createElement("img");
        image.src = `${data.results[i].urls.full}`
        image.alt = `${data.results[i].description}`

        let link = document.createElement('a')
        link.href = `${data.results[i].urls.full}`

        // Add both elements to a class
        link.classList.add("search-result")
        image.classList.add("img")

        link.appendChild(image)

        searchContainer.appendChild(link)
    }
}

async function handleClick() {
  const moreLinks = `https://api.unsplash.com/search/photos?page=${page}$&query=${searchItem}&client_id=bEMG5NiP29-la9o1En4kcImhoDjpULTb2TfqGQFDBv8`
  const response = await fetch(moreLinks)
  const moreData = await response.json()

  console.log(moreData)
  console.log(moreLinks)

  console.log(`Length of new data: ${moreData.results.length}`)

  for(let i=page; i<=moreData.total_pages; i++){
    page += 1
    //Get the length for each result in one page
    const length = moreData.results.length


        for (let i=0; i<=length; i++){
            let image = document.createElement("img");
            image.src = `${moreData.results[i].urls.full}`
            image.alt = `${moreData.results[i].description}`

            let link = document.createElement('a')
            link.href = `${moreData.results[i].urls.full}`

            // Add both elements to a class
            link.classList.add("search-result")
            image.classList.add("img")

            link.appendChild(image)

            searchContainer.appendChild(link)
        }
    }
}

showMore.onclick = handleClick


