
import axios from "axios";
const citiesUrl = "https://gist.githubusercontent.com/VasilyMur/8b679b5482499a97c08cca9b6dffef03/raw/4dfd59daa4ac0a6ebd7d2f144b860d62054b4576/uscities.json"

const getCities = () => {
   return axios.get(citiesUrl).then(res => {
      return res.data; // библиотека преобразует адрес в объект
   });
}
export default getCities;


export function mapCities(cities) {
   return cities.map(res => {
      const { city, population } = res; // деструкторизацией выбераем из данных только город и его население
      return { city, population };
   });
}









