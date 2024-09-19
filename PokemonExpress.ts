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

const StorePokemon = async(PokemonP:string) => {
    const PokeAPI = await fetch(`https://pokeapi.co/api/v2/pokemon/${PokemonP}`)
    const PokeAPIJSON = await PokeAPI.json()
    const PokemonAPIImage = await fetch(PokeAPIJSON.sprites.front_default);
    const image = await PokemonAPIImage.arrayBuffer();
    const imageBase64 = Buffer.from(image).toString('base64');
    // Use this code when it's when you want to change the url to a base64.
    const PokemonAPISound = await fetch(PokeAPIJSON.cries.latest)
    const sound = await PokemonAPISound.arrayBuffer();
    const soundBase64 = Buffer.from(sound).toString('base64');
    // Replace sound: PokeAPIJSON.cries.latest with sound: soundBase64
    let PBox2: PokemonBoxInterface = {
        name: PokeAPIJSON.name,
        image: imageBase64,
        move: [],
        sound: `data:audio/wav;base64,${soundBase64}`
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
    StorePokemon(PokeP)
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
        res.send(`Pokemon name: ${PokemonBox1.name}
            <p>Pokemon Image: <img src="data:image/png;base64,${PokemonBox1.image}"</p>
            <p>Pokemon Moves: ${PokemonBox1.move}</p>
            <p>Pokemon Sound:</p>
            <p><audio controls>
            <source src ="${PokemonBox1.sound}" type="audio/wav">
            Your Browser doesn't support the audio element.
            </audio></p>`)
    }
    else{
        res.send(`No Pokemon Found.`)
    }
    
  
})
