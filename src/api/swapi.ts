import { PersonApi } from "./personApi.js";
import { PlanetApi } from "./planetApi.js";

export class Swapi {

    static get people(): PersonApi {
        return new PersonApi();
    }

    static get planets(): PlanetApi {
        return new PlanetApi();
    }
}