import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
interface PokemonAbilities1{
    hp:number;
    ability:string;
 }
 interface PokemonAbilities2{
    hp:number;
    ability: string;
 }
const getPokemon = async() => {
    rl.question('What is your pokemon? ', async(pokemonpick) => {
        const yourPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonpick}`)
        const yourPokemondata = await yourPokemon.json();
        console.log(`You picked:  ${yourPokemondata.name}`)
        const yourPokemonsMove = await fetch(yourPokemondata.moves[0].move.url)
        const yourPokemonMovedata = await yourPokemonsMove.json()
        console.log(`===================================`)
        console.log(`The move of your pokemon is: ${yourPokemondata.moves[0].move.name}`)
        console.log(`Power of the move: ${yourPokemonMovedata.accuracy}`)
        console.log(`Your pokemon's health is: ${yourPokemondata.stats[0].base_stat}`)
        console.log(`===================================`)
    rl.question('What is the enemy pokemon? ', async(enemypick) => {
            const enemyPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${enemypick}`)
            const enemyPokemondata= await enemyPokemon.json();
            console.log(`Enemy picked: ${enemyPokemondata.name}`)
            const enemyPokemonsMove = await fetch(enemyPokemondata.moves[0].move.url)
            const enemyPokemonsMovedata = await enemyPokemonsMove.json()
            console.log(`===================================`)
            console.log(`The move of your pokemon is: ${enemyPokemondata.moves[0].move.name}`)
            console.log(`Power of the move: ${enemyPokemonsMovedata.accuracy}`)
            console.log(`Your pokemon's health is: ${enemyPokemondata.stats[0].base_stat}`)
        });
        
    });
    
 }  


console.log(`==============Pokemon Fight!==============`)
rl.question('Do you want to continue? y/n\nAnswer: ', (menuanswer) => {
    let option = menuanswer
    switch(option){
        case 'y':
        getPokemon()
         break;
        case 'n':
         console.log('Goodbye. Press ctrl + c in order to fully exit.')
         break;
        default:
         console.log(`\nThe input isn't in any of the option. Restart the game by pressing ctrl + c and running it again.`)
         break;

    }
  });