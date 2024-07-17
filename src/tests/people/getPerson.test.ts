import assert from "node:assert";
import { describe, it } from "node:test";
import { Person } from "../../domain/person.js";
import { Result } from "../../domain/result.js";
import { Swapi } from "../../api/swapi.js";
import { Message } from "../../domain/message.js";


describe('get person by id', () => {
    it('should return person by id', async () => {
        const person: Result<Person> = await Swapi.people().getById("1");
        assert.strictEqual(person.uid, '1');
        assert.strictEqual(person.description, 'A person within the Star Wars universe');
        assert.strictEqual(person.properties.name, 'Luke Skywalker');
        assert.strictEqual(person.properties.height, '172');
    });

    it('should return not found if invalid id', async () => {
        runInvalidIdTest("X");
    });

    it('should return not found if id not found', async () => {
        runInvalidIdTest("9999999999");
    });
});


async function runInvalidIdTest(id: string): Promise<void> {
        const response = await Swapi.people().tryGetById(id);
        assert.strictEqual(response.status, 404);
        const data: Message = await response.json() as Message;
        assert.strictEqual(data.message, 'not found');
}
