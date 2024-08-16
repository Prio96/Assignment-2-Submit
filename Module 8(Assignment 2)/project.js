alert("Alhamdulillah Welcome brother")
const SelectContainer=document.getElementById("select-container")
SelectContainer.innerHTML=`
    <h3>Favorites(<span id="fav-count">0</span>)</h3>
    <div id="fav-container">

    </div>
`
const CardContainer=SelectContainer.querySelector("#fav-container")
const CallApi=(name)=>{
    fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${name}`)
    .then(res=>res.json())
    .then(data=>{
        console.log(typeof data.player)
        document.getElementById("card-container").innerHTML=``
        ShowPlayer(data.player)
    })
}
fetch("https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=")
    .then(res=>res.json())
    .then(data=>{
        console.log(data.player)
        document.getElementById("card-container").innerHTML=``
        ShowPlayer(data.player)
    })
const SearchPlayer=()=>{
    const inputValue=document.getElementById("search-bar").value
    document.getElementById("search-bar").value=""
    CallApi(inputValue)
}

const createDetailModal=(element)=>{
    
    const ModalDiv=document.createElement("div")
    ModalDiv.classList.add('modal','fade')
    ModalDiv.id='MyModal'
    ModalDiv.setAttribute('tabindex','-1')
    ModalDiv.setAttribute('aria-labelledby','modalLabel')
    ModalDiv.setAttribute('aria-hidden','true')
    
    ModalDiv.innerHTML=`
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalLabel">${element.strPlayer}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" id='modal-body'>
                    Gender: ${element.strGender}
                </div>
                <div class="modal-body" id='modal-body'>
                    Height: ${element.strHeight}
                </div>
                <div class="modal-body" id='modal-body'>
                    Weight: ${element.strWeight}
                </div>
                <div class="modal-body" id='modal-body'>
                    ${element.strDescriptionEN}
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
    


const ShowModal=(element)=>{
    console.log(element)

    let ModalElement=document.getElementById("MyModal")


    ModalElement=createDetailModal(element)
    

    const MyModal=new bootstrap.Modal(ModalElement)

    MyModal.show()

    
}

const ShowPlayer=(elements)=>{
    const container=document.getElementById("card-container")
    for(const element of elements){
        if(element.strWeight==""){
            element.strWeight="Unknown"
        }
        if(element.strHeight==""){
            element.strHeight="Unknown"
        }
        const div=document.createElement("div")
        div.classList.add("card")
        div.innerHTML=`
            <img class="card-img" onerror="this.src='Pictures/NoFace.webp';" src=${element.strThumb}>
            <h3 class="text-white text-center">${element.strPlayer}</h3>
            <a href="${element.strTwitter}" class="text-center" id="twt-link"><i class="fa-brands fa-twitter" style="color: #FFD43B;"></i></a>
            <p class="ms-1 text-white"><span class="text-warning">Nationality:  </span>${element.strNationality}</p>
            <p class="ms-1 text-white"><span class="text-warning">Sport:  </span>${element.strSport}</p>
            <p class="ms-1 text-white"><span class="text-warning">Team:  </span>${element.strTeam}</p>
            <p class="ms-1 text-white"><small>${element.strDescriptionEN.slice(0,80)}...</small></p>
            <div class="d-flex justify-content-center align-items-center gap-2" id="btn-container">
            <button id="open-modal-btn" class="btn btn-warning">Details</button>
            <button id="fav-btn" class="btn btn-warning">Add To Favorites</button>
            </div>
        `
        const favbtn=div.querySelector("#fav-btn")
        favbtn.onclick=function(){
            AddFavorite(element)
        }
        container.appendChild(div)
        const ButtonDiv=div.querySelector('#btn-container')
        ButtonDiv.querySelector('#open-modal-btn').addEventListener('click',()=>{
            ShowModal(element)
        })
    }
}


const favs=[]
const AddFavorite=(element)=>{
    if(favs.length==11){
        alert("You cannot add more than 11 players in favorites")
        return
    }
    let flag=false
    for (let i=0;i<favs.length;i++){
        if(favs[i].idPlayer==element.idPlayer){
            alert("You already added the player in favorites")
            flag=true
            return
        }
    }
    if(flag==false){
        favs.push(element)
        const favdiv=document.createElement("div")
        favdiv.classList.add("fav")
        favdiv.innerHTML=`
            <hr>
            <p>${element.strPlayer}</p>
        `
        CardContainer.append(favdiv)
    }
    const FavCount=SelectContainer.querySelector("#fav-count")
    FavCount.innerHTML=`${favs.length}`
}



