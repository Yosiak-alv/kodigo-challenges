import http from "../utils/axiosHttp";

const fetchAllPlanets = async () => {
    try {
        const response = await http.get("/planets?limit=20");
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const getAllPlanets = async () => {
    const planets = await fetchAllPlanets();
    return planets.items;
}