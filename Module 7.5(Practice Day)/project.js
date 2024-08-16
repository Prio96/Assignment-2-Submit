alert("Welcome to Ma Er Dowa Restaurant")
const callApi=(food)=>{
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${food}`)
        .then(res=>res.json())
        .then(data=>{
            console.log(data.meals)
            SearchResult(data.meals)
        })
}
const SearchFood=()=>{
    document.getElementById("detail-container").innerHTML=``
    document.getElementById("result-container").innerHTML=``
    const inputValue=document.getElementById("search-input").value
    document.getElementById("search-input").value=""
    callApi(inputValue)
}

const SearchResult=(elements)=>{

    console.log(typeof elements)

    const container=document.getElementById("result-container")

    if(elements==null){
        const div=document.createElement("div")
        div.innerHTML=`
            <p>Sorry. No results have been found.</p>
       `
       container.appendChild(div)
    }
    else{
        for(const element of elements){
            console.log(typeof element)
            const div=document.createElement("div")
            div.classList.add("card")
            div.innerHTML=`
                <img class="food-img" src="${element.strMealThumb}">
                <h3 class="food-name">${element.strMeal}</h3>
            `

            container.appendChild(div)
            div.addEventListener("click",()=>{
                document.getElementById("detail-container").innerHTML=``
                const detailContainer=document.getElementById("detail-container")
                const detailDiv=document.createElement("div")
                detailDiv.classList.add("detail-card")
                detailDiv.innerHTML=`
                    <img class="food-detail-img" src="${element.strMealThumb}">
                    <h3 class="food-detail-name">${element.strMeal}</h3>
                    <p class="ingtext">Ingredients</p>
                    <ul id="list">
                            
                    </ul>
                `
                const listElement=detailDiv.querySelector("#list")
                const prefix="strIngredient"


                for(let x in element){
                    console.log(x)
                    if(x.startsWith(prefix) && element[x]!="" && element[x]!=null){
                        const ingredient=element[x]
                        const point=document.createElement("li")
                        const textNode=document.createTextNode(ingredient)
                        console.log(textNode)
                        point.appendChild(textNode)
                        listElement.appendChild(point)
                    }
                }
                detailContainer.appendChild(detailDiv)

            })
        }  
    }
        
    
}

