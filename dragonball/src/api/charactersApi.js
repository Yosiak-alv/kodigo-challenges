import http from "../utils/axiosHttp";

const fetchAllCharacters = async () => {
    try {
        const response = await http.get("/characters?limit=58");
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const getAllCharacters = async () => {
    const characters = await fetchAllCharacters();
    return characters.items;
}

const fetchCharacterById = async (id) => {
    try {
        const response = await http.get(`/characters/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const getCharacterById = async (id) => {
    const character = await fetchCharacterById(id);
    return character;
}