import { PersonApi } from "./personApi.js";
import { PlanetApi } from "./planetApi.js";

export class Swapi {

    static people(): PersonApi {
        return new PersonApi();
    }

    static planets(): PlanetApi {
        return new PlanetApi();
    }
}