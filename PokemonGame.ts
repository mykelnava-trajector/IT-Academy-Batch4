import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const getYourPokemon = async() => {
    rl.question('What is your pokemon? ', async(pokemonpick) => {
        const yourPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonpick}`)
        const yourPokemondata= await yourPokemon.json();
        console.log(`You picked: ${yourPokemondata.name}`)
        
    });
    
 }  
 const getEnemyPokemon = async() => {
    rl.question('What is the enemy pokemon? ', async(enemypick) => {
        console.log(`Your pokemon is: ${enemypick}`)
        const enemyPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${enemypick}`)
        const enemyPokemondata= await enemyPokemon.json();
        console.log(`You picked: ${enemyPokemondata.name}`)
    });
    
 }
 interface yourPokemonAbilities{
    hp:number;
    ability:string;
 }

    

console.log(`==============Pokemon Fight!==============`)
rl.question('Do you want to continue? y/n\nAnswer: ', (menuanswer) => {
    let option = menuanswer
    switch(option){
        case 'y':
         getYourPokemon()
         break;
        case 'n':
         console.log('Goodbye. Press ctrl + c in order to fully exit.')
         break;
        default:
         console.log(`\nThe input isn't in any of the option. Restart the game by pressing ctrl + c and running it again.`)
         break;

    }
  });