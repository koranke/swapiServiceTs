import { Person } from "../domain/person.js";
import { SwapiApi } from "./swapiApi.js";

export class PersonApi extends SwapiApi<Person> {
    constructor() {
        super('people');
    }
}