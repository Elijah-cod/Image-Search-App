const apiKey = 'bEMG5NiP29-la9o1En4kcImhoDjpULTb2TfqGQFDBv8'
const url = "https://api.unsplash.com/search/photos?page=1$&query=dog&client_id=bEMG5NiP29-la9o1En4kcImhoDjpULTb2TfqGQFDBv8"

const inputBox = document.getElementById('search-input')
const searchButton = document.getElementById('search')
const searchContainer = document.querySelector('.search-results')


async function checkImage (){
    searchContainer.innerHTML = ''
    const response = await fetch(url)
    var data = await response.json()

    //Get the length for each result in one page
    const length = data.results.length


    for (let i=0; i<=length; i++){
        let image = document.createElement("img");
        image.src = `${data.results[i].urls.full}`

        let description = document.createElement('a')
        description.href = `${data.results[i].urls.full}`
        description.textContent = `${data.results[i].description}`

        // Add both elements to a class
        image.classList.add("search-result")
        description.classList.add("search-result")

        searchContainer.appendChild(image)
        // searchContainer.appendChild(description)
    }
}

checkImage()