import { getCharacterById, getAllCharacters } from "../api/charactersApi";
import { getAllPlanets} from "../api/planetsApi";

// view component
export const charactersView = async () => {
    const planetsContainer = document.getElementById('planets');
    
    const planets = await getAllPlanets();

    const select = createPlanetSelect(planets);    

    planetsContainer.appendChild(select);

    await displayCharacters();

    select.addEventListener('change', async (event) => {
        const selectedPlanetId = event.target.value;
        if(selectedPlanetId != ''){
            await displayCharacters(selectedPlanetId);
        }else{
            await displayCharacters();
        }
    });
}


async function displayCharacters(planetId = null) {
    const dragonBallContainer = document.getElementById('list-dragon-ball');
    const characters = await getAllCharacters();    
    dragonBallContainer.innerHTML = '';

    if (planetId != null) {
        characters.forEach(async item => {
            const character = await getCharacterById(item.id);
            if (character.originPlanet.id === parseInt(planetId)) {
                const characterCard = createCharacterCard(character);
                dragonBallContainer.appendChild(characterCard);
            }
        });
    }
    else{
        characters.forEach(async item => {
            const character = await getCharacterById(item.id);
            const characterCard = createCharacterCard(character);
            dragonBallContainer.appendChild(characterCard);
        });
    }
}

function createCharacterCard(characterData) {
    const characterElement = document.createElement('div');
    const transformations = characterData?.transformations.length > 0 ? 
    'Transformations: ' +characterData.transformations.map(transformation => transformation.name).join(', ') : 'No transformations';
    characterElement.innerHTML = `
        <h2>${characterData.name}</h2>
        <img src="${characterData.image}" alt="${characterData.name}" height="300px" />
        <p>Planet: ${characterData.originPlanet.name}</p>
        <p>Race: ${characterData.race}</p>
        <p>${transformations}</p>
    `;
    return characterElement;
}

function createPlanetSelect(planets) {
    const select = document.createElement('select');
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.text = 'Selecciona un planeta';
    defaultOption.selected = true;
    select.appendChild(defaultOption);

    planets.forEach(planet => {
        const option = document.createElement('option');
        option.value = planet.id;
        option.text = planet.name;
        select.appendChild(option);
    });

    return select;
}