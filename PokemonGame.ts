import * as readline from 'readline';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
interface PokemonAbilities1{
    ability:string;
    dmg: number;
    hp: number;
 }
function PokeStats1 (yourPStats:PokemonAbilities1){
    console.log(
        `Your pokemon stats are:\nMove: ${yourPStats.ability}, Damage: ${yourPStats.dmg}, and HP: ${yourPStats.hp}`
    )
}
function PokeStats2 (enemyPStats:PokemonAbilities1){
    console.log(
        `Enemy pokemon stats are:\nMove: ${enemyPStats.ability}, Damage: ${enemyPStats.dmg}, and HP: ${enemyPStats.hp}`
    )
}
const PokemonB = async() => {
    rl.question('What is your pokemon? [Examples are: charizard, pikachu]\nAnswer:', async(pokemonpick) => {
        const yourPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonpick}`)
        const yourPokemondata = await yourPokemon.json();
        console.log(`===================================`)
        console.log(`You picked:  ${yourPokemondata.name}`)
        const yourPokemonsMove = await fetch(yourPokemondata.moves[0].move.url)
        const yourPokemonMovedata = await yourPokemonsMove.json()
        let yourPStats =  {
            ability: yourPokemondata.moves[0].move.name,
            dmg: yourPokemonMovedata.accuracy,
            hp: yourPokemondata.stats[0].base_stat
        }
        console.log(`===================================`)
        PokeStats1(yourPStats)
        console.log(`===================================`)
    rl.question('What is the enemy pokemon? [Examples are: charizard, pikachu]\nAnswer: ', async(enemypick) => {
            const enemyPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${enemypick}`)
            const enemyPokemondata= await enemyPokemon.json();
            console.log(`===================================`)
            console.log(`Enemy picked: ${enemyPokemondata.name}`)
            const enemyPokemonsMove = await fetch(enemyPokemondata.moves[0].move.url)
            const enemyPokemonsMovedata = await enemyPokemonsMove.json()
            let enemyPStats =  {
                ability: enemyPokemondata.moves[0].move.name,
                dmg: enemyPokemonsMovedata.accuracy,
                hp: enemyPokemondata.stats[0].base_stat
            }
            console.log(`===================================`)
            PokeStats2(enemyPStats)
            console.log(`===================================`)
            console.log(`Battle between ${yourPokemondata.name} and ${enemyPokemondata.name}`)
            console.log(`===================================`)
            console.log(`Your pokemon:${yourPokemondata.name}\n`)
            PokeStats1(yourPStats)
            console.log(`Your pokemon:${enemyPokemondata.name}\n`)
            PokeStats2(enemyPStats)
            console.log(`===================================`)
            console.log(`Fight!`)
            const yourPokeAttacked = yourPStats.hp - enemyPStats.dmg;
            const enemyPokeAttacked = enemyPStats.hp - yourPStats.dmg;
            if(yourPokeAttacked > 0 && enemyPokeAttacked <= 0 || yourPokeAttacked > enemyPokeAttacked){
                console.log(`Your pokemon wins.`)
                pokemonchoice()
            }
            else if(enemyPokeAttacked > 0 && yourPokeAttacked <= 0 || enemyPokeAttacked > yourPokeAttacked){
                console.log(`Enemy pokemon wins.`)
                pokemonchoice()
            }
            else if( yourPokeAttacked <= 0 && enemyPokeAttacked <= 0 || yourPokeAttacked == enemyPokeAttacked){
                console.log(`It's a draw.`)
                pokemonchoice()
            }
        })
    })
 }  
const initialPokemon = () =>{
    console.clear()
    console.log(`==============Pokemon Fight!==============`)
    rl.question('Do you want to continue? y/n\nAnswer: ', (menuanswer) => {
        let option = menuanswer
        switch(option){
            case 'y':
                console.clear()
                pokemonchoice()
                break;
            case 'n':
                console.clear()
                console.log('Goodbye.')
                process.exit(0)
                break;
            default:
                console.clear()
                console.log(`\nThe input isn't in any of the option. Pick only y/n.`)
                initialPokemon()
                break;
        }
     });
}
initialPokemon()

const pokemonchoice = () =>{
    rl.question('What choice do you want to go to?\n\t[1].Choose your pokemons to battle.\n\t[2].Exit.\n Answer: ', (option1) => {
        switch(option1){
            case '1':
                console.clear()
                PokemonB()
                break;
            case '2':
                console.clear()
                console.log(`Thank you for playing.`)
                process.exit(0)
                break;
            default:
                console.log(`Invalid input. Try again.`)
                pokemonchoice()
                break;
        }
    })
}