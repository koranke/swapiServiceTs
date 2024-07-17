import { describe, it } from "node:test";
import assert from "node:assert";
import { Result } from "../../domain/result.js";
import { Planet } from "../../domain/planet.js";
import { Swapi } from "../../api/swapi.js";

describe('get planet by id', () => {
    it('should return planet by id', async () => {
        const planet: Result<Planet> = await Swapi.planets().getById("1");
        assert.strictEqual(planet.uid, '1');
        assert.strictEqual(planet.description, 'A planet.');
        assert.strictEqual(planet.properties.name, 'Tatooine');
        assert.strictEqual(planet.properties.diameter, '10465');
    });

});
