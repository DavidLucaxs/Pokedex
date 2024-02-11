const pokemonName = document.querySelector(".pokemon_name")
const pokemonNumber = document.querySelector(".pokemon_number")
const pokemonImage = document.querySelector(".pokemon_img")
const form = document.querySelector(".form_poke")
const input = document.querySelector(".input_search")

const btn_prev = document.querySelector(".btn-prev")
const btn_next = document.querySelector(".btn-next")

let search = 1


const fetchPokemon = async (pokemon)=>{
    try{
        const APIResponse =  await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        const data = await APIResponse.json()
        if(APIResponse.status == 200){
            return data
        }
    }catch{
        return null
    }
    
    
}

const RenderPokemon = async(pokemon)=>{
    pokemonName.innerHTML = "Loading..."
    pokemonNumber.innerHTML = "0"
    const data = await fetchPokemon(pokemon)
    if(data){
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        console.log(pokemonImage.src)
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        search = data.id
    }else{
        pokemonName.innerHTML = "Not Found :C"
        pokemonImage.style.display = 'none'
    }
}

form.addEventListener('submit',(event)=>{
    event.preventDefault()
    RenderPokemon(input.value.toLowerCase())
    input.value = ""
})

btn_prev.addEventListener('click',()=>{
    console.log("Antes")
    if(search == 1){
        return
    }
    RenderPokemon(search - 1)
    search -= 1
})

btn_next.addEventListener('click',()=>{
    console.log("Depois")
    RenderPokemon(search + 1)
    search += 1
})

RenderPokemon(search)