const dogArea = document.querySelector("#dog-image-container")
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const ulArea = document.querySelector('#dog-breeds')
const breedUrl = 'https://dog.ceo/api/breeds/list/all'
const dropDown = document.querySelector('#breed-dropdown')
let breedsArray = []
ulArea.addEventListener('click', handleClick)
dropDown.addEventListener('change', handleChange)

function getImages(){
    fetch(imgUrl)
    .then(resp => resp.json())
    .then(images => { 
        const imgs = images.message
        let imgsArray = createImg(imgs)
        renderImgs(imgsArray)
    })
}

function createImg(imgs) {
    return imgs.map((img) => {
        let i = `<img src= ${img}>`
        return i
    })  
}

function renderImgs(imgsArray) {
    imgsArray.forEach(element => {
        renderElement(element)
    })
}

function renderElement(element) {
    ulArea.innerHTML += element
}

function getBreeds(){
    fetch(breedUrl)
    .then(resp => resp.json())
    .then(breeds => { 
        breedsArray = Object.keys(breeds.message)
        const breedsLis = createLi(breedsArray)
        renderLis(breedsLis)
        // let breedsLis = createImg(imgs)
        // renderLi(breedsLis)
    })
}

function createLi(breedsArray) {
    return breedsArray.map((breed) => {
        let li = `<li>${breed}</li>`
        return li
    })  
}

function renderLis(breedsLis) {
    breedsLis.forEach(element => {
        renderElement(element)
    })
}

function handleClick(event) {
    if (event.target.nodeName === 'LI'){
        if (event.target.style.color === 'red'){
       event.target.style.color = 'black'  
        } else {
            event.target.style.color = 'red' 
        }
    }
}

function handleChange(event) {
    const letter = event.target.value
    const filterBreeds = breedsArray.filter(breed => breed.startsWith(letter))
    const filterBreedsLis = createLi(filterBreeds)
    ulArea.innerHTML = ''
    renderLis(filterBreedsLis)
}

getImages()
getBreeds()