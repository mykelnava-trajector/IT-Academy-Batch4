const prompts = require('prompt-sync')();
const express = require('express')
const app = express();
app.listen(3000, () => console.log(`Listening on port 3000.`));
interface PokemonBoxInterface{
    name: string;
    image: string;
    move: string[];
    sound: string;
}
let PokemonBox: PokemonBoxInterface[] = []
// const FindPokemon = async (PokemonPick)=>{
//     const PokeAPI = await fetch(`https://pokeapi.co/api/v2/pokemon/${PokemonPick}`)
//     const PokeAPIJSON = await PokeAPI.json()
//     let PBox: PokemonBoxInterface = {
//         name: PokeAPIJSON.name,
//         image: PokeAPIJSON.OfficialArtwork.front_default,
//         move: PokeAPIJSON.moves[0].move.name,
//         sound: PokeAPIJSON.cries.latest
//     }
//     PokemonBox.push(PBox);
// }

const StorePokemon2 = async(PokemonP:string) => {
    const PokeAPI = await fetch(`https://pokeapi.co/api/v2/pokemon/${PokemonP}`)
    const PokeAPIJSON = await PokeAPI.json()
    const PokemonAPIImage = await fetch(PokeAPIJSON.sprites.front_default);
    const image = await PokemonAPIImage.arrayBuffer();
    const imageBase64 = Buffer.from(image).toString('base64');
    // const PokemonAPISound = await fetch(PokeAPIJSON.cries.latest)
    // const sound = await PokemonAPISound.arrayBuffer();
    // const soundBase64 = Buffer.from(sound).toString('base64');
    let PBox2: PokemonBoxInterface = {
        name: PokeAPIJSON.name,
        image: imageBase64,
        move: [],
        sound: PokeAPIJSON.cries.latest
    }
    for(let i = 0; i< PokeAPIJSON.moves.length; i++){
        PBox2.move.push(PokeAPIJSON.moves[i].move.name)
    }
    PokemonBox.push(PBox2)
    
}

const PokeDex = [
        {name: `Pokemon`, url: `http://localhost:3000/`},
        {name: `StorePokemon`, url:`http://localhost:3000/storepokemon?PokeP=(addpokemonname)`},
        {name: `View Box`, url:`http://localhost:3000/viewbox`},
        {name: `View Pokemon`, url:`http://localhost:3000/viewpokemon?PokeN=(pokemonname)`}
]

app.get(`/`, (req,res) => {
    res.json(PokeDex)
})
app.get(`/storepokemon`, (req,res)=>{
    let PokeP = req.query.PokeP;
    StorePokemon2(PokeP)
    if(PokeP){
       res.send(`Your pokemon ${PokeP} has been added to the box.`)
    }
    else{
        res.send(`Error, exited.`)
    }
    
})

app.get(`/viewbox`, (req,res)=>{
    res.json(PokemonBox)
})
app.get(`/viewpokemon`,  async(req,res)=>{
    let PokeN = req.query.PokeN
    const PokemonBox1 = PokemonBox.find((pokemon) => pokemon.name == PokeN)
    if(PokemonBox1){
        res.json(PokemonBox1)
    }
    else{
        res.send(`No Pokemon Found.`)
    }
    
  
})
