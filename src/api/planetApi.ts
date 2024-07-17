import { Planet } from "../domain/planet.js";
import { SwapiApi } from "./swapiApi.js";

export class PlanetApi extends SwapiApi<Planet> {
    constructor() {
        super('planets');
    }
}