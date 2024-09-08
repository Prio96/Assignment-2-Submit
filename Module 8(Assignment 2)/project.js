alert("Alhamdulillah Welcome brother")
const SelectContainer = document.getElementById("select-container")
SelectContainer.innerHTML = `
    <h3>Favorites(<span id="fav-count">0</span>)</h3>
    <div id="fav-container">

    </div>
`
const CardContainer = SelectContainer.querySelector("#fav-container")
const CallApi = (name) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
        .then(res => res.json())
        .then(data => {
            console.log(typeof data.meals)
            document.getElementById("card-container").innerHTML = ``
            ShowFood(data.meals)
        })
}
fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
    .then(res => res.json())
    .then(data => {
        console.log(data.meals)
        document.getElementById("card-container").innerHTML = ``
        ShowFood(data.meals)
    })
const SearchFood = () => {
    const inputValue = document.getElementById("search-bar").value
    document.getElementById("search-bar").value = ""
    CallApi(inputValue)
}

const createDetailModal = (element) => {

    const ModalDiv = document.createElement("div")
    ModalDiv.classList.add('modal', 'fade')
    ModalDiv.id = 'MyModal'
    ModalDiv.setAttribute('tabindex', '-1')
    ModalDiv.setAttribute('aria-labelledby', 'modalLabel')
    ModalDiv.setAttribute('aria-hidden', 'true')

    ModalDiv.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="modalLabel">${element.strMeal}</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" id='modal-body'>
                    <h5>Instructions</h5>
                    <p>${element.strInstructions}</p>
                    <p>To know more,<br> <a href="${element.strSource}">Click this</a></p>
                    <p>See in <a href="${element.strYoutube}"><i class="fa-brands fa-youtube" style="color: #e23c12;"></i></a><p>
                </div>
                <div class="modal-footer m-auto">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">OK</button>
                </div>
            </div>
        </div>
    `

    document.body.appendChild(ModalDiv)
    return ModalDiv
}

const ShowModal = (element) => {
    console.log(element)
    let ModalElement = document.getElementById("MyModal")
    ModalElement = createDetailModal(element)
    const MyModal = new bootstrap.Modal(ModalElement)
    MyModal.show()
}

const ShowFood = (elements) => {
    const container = document.getElementById("card-container")
    for (const element of elements) {
        const div = document.createElement("div")
        div.classList.add("card")
        div.innerHTML = `
            <img class="card-img" onerror="this.src='Pictures/NoFace.webp';" src=${element.strMealThumb}>
            <h3 class="text-white text-center">${element.strMeal}</h3>
            <a href="${element.strSource}" class="text-center" id="twt-link"><i class="fa-solid fa-bowl-food" style="color: #FFD43B;"></i></a>
            <p class="ms-1 text-warning">Origin:<span class="text-white">   ${element.strArea}</span></p>
            <p class="ms-1 text-warning">Type:<span class="text-white">  ${element.strCategory}</span></p>
            <div class="d-flex justify-content-center align-items-center gap-2 mb-2" id="btn-container">
            <button id="open-modal-btn" class="btn btn-warning">Details</button>
            <button id="fav-btn" class="btn btn-warning">Add To Favorites</button>
            </div>
        `
        const favbtn = div.querySelector("#fav-btn")
        favbtn.onclick = function () {
            AddFavorite(element)
        }
        container.appendChild(div)
        const ButtonDiv = div.querySelector('#btn-container')
        ButtonDiv.querySelector('#open-modal-btn').addEventListener('click', () => {
            ShowModal(element)
        })
    }
}


const favs = []
const AddFavorite = (element) => {
    if (favs.length == 11) {
        alert("You cannot add more than 11 foods in favorites")
        return
    }
    for (let i = 0; i < favs.length; i++) {
        if (favs[i].idMeal == element.idMeal) {
            alert("You already added the food in favorites")
            return
        }
    }
    favs.push(element)
    const favdiv = document.createElement("div")
    favdiv.classList.add("fav")
    favdiv.innerHTML = `
            <hr>
            <p>${element.strMeal}</p>
        `
    CardContainer.append(favdiv)
    const FavCount = SelectContainer.querySelector("#fav-count")
    FavCount.innerHTML = `${favs.length}`
}






