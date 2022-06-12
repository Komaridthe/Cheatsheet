import { random, uniq } from "lodash";
import getCities, { mapCities } from "./src/constants";


getCities().then(cities=>{
   const citiesMapped = mapCities(cities); // выделяем данные по городам
   console.log(citiesMapped);
})









