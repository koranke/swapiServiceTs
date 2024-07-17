import assert from "node:assert";
import { describe, it } from "node:test";
import { Person } from "../../domain/person.js";
import { Result } from "../../domain/result.js";
import { Swapi } from "../../api/swapi.js";
import { PaginatedResponse } from "../../domain/paginatedResponse.js";
import { ItemLink } from "../../domain/itemLink.js";


describe('get all people', () => {
    it('should return all people', async () => {
        const response = await Swapi.people().tryGetAll();
        if (response !== null) {
            assert.strictEqual(response.status, 200);
            const data = await response.json();
            const paginatedResponse: PaginatedResponse = JSON.parse(JSON.stringify(data)) as PaginatedResponse;
            assert.strictEqual(paginatedResponse.results.length, 10);
        }
    });

    it('should return page two when requesting page two', async () => {
        const pageOneResults: Set<string> = await getPageIds('1');

        const response = await Swapi.people()
            .withQueryParam('limit', '10')
            .withQueryParam('page', '2')
            .tryGetAll();

            if (response !== null) {
            assert.strictEqual(response.status, 200);
            const data = await response.json();
            const paginatedResponse: PaginatedResponse = JSON.parse(JSON.stringify(data)) as PaginatedResponse;
            assert.strictEqual(paginatedResponse.results.length, 10);
            assert.strictEqual(paginatedResponse.message, 'ok');
            assert.strictEqual(paginatedResponse.previous, 'https://swapi.tech/api/people?page=1&limit=10');
            assert.strictEqual(paginatedResponse.next, 'https://swapi.tech/api/people?page=3&limit=10');
            const pageTwoResults: Set<string> = new Set(paginatedResponse.results.map((itemLink: ItemLink) => itemLink.uid));
            const commonElements = new Set([...pageOneResults].filter((x) => pageTwoResults.has(x)));
            assert.strictEqual(commonElements.size, 0);
        }
    });

    it('should get custom limit and page', async () => {
        const response = await Swapi.people()
            .withQueryParam('limit', '5')
            .withQueryParam('page', '2')
            .tryGetAll();
        if (response !== null) {
            assert.strictEqual(response.status, 200);
            const data = await response.json();
            const paginatedResponse: PaginatedResponse = JSON.parse(JSON.stringify(data)) as PaginatedResponse;
            assert.strictEqual(paginatedResponse.results.length, 5);
            assert.strictEqual(paginatedResponse.message, 'ok');
            assert.strictEqual(paginatedResponse.previous, 'https://swapi.tech/api/people?page=1&limit=5');
            assert.strictEqual(paginatedResponse.next, 'https://swapi.tech/api/people?page=3&limit=5');
        }
    });

    it('should get last page when requesting last page', async () => {
        const pageOne: PaginatedResponse = await Swapi.people()
            .withQueryParam('limit', '10')
            .getAll();

        let lastPageNumber: number = Math.ceil(pageOne.total_pages);
        const priorPageResults: Set<string> = await getPageIds((lastPageNumber - 1).toString());

        const response = await Swapi.people()
            .withQueryParam('limit', '10')
            .withQueryParam('page', lastPageNumber.toString())
            .tryGetAll();
        if (response !== null) {
            assert.strictEqual(response.status, 200);
            const data = await response.json();
            const paginatedResponse: PaginatedResponse = JSON.parse(JSON.stringify(data)) as PaginatedResponse;
            assert.strictEqual(paginatedResponse.message, 'ok');
            assert.strictEqual(paginatedResponse.previous, `https://swapi.tech/api/people?page=${lastPageNumber - 1}&limit=10`);
            assert.strictEqual(paginatedResponse.next, null);

            const lastPageResults: Set<string> = new Set(paginatedResponse.results.map((itemLink: ItemLink) => itemLink.uid));
            const commonElements = new Set([...priorPageResults].filter((x) => lastPageResults.has(x)));
            assert.strictEqual(commonElements.size, 0);
        } else {
            assert.fail('response is null');
        }
    });

    it('should return single item when searching by exact match name', async () => {
        let searchName: string = 'Luke Skywalker';
        const people: Result<Person>[] = await Swapi.people()
            .getFiltered('name', searchName);

        assert.strictEqual(people.length, 1);
        assert.strictEqual(people[0].properties.name, searchName);
        assert.strictEqual(people[0].uid, '1');
    });

    it('should return empty list when no name matches', async () => {
        const people: Result<Person>[] = await Swapi.people()
            .getFiltered('name', 'The Hulk');

        assert.strictEqual(people.length, 0);
    });

    it('should return multiple results when there are multiple matches', async () => {
        let searchName: string = 'Skywalker';
        const people: Result<Person>[] = await Swapi.people()
            .getFiltered('name', searchName);

        assert.strictEqual(people.length > 1, true);
        for (let i = 0; i < people.length; i++) {
            assert.strictEqual(people[i].properties.name.includes(searchName), true);
        }
    });



});




async function getPageIds(pageNumber: string): Promise<Set<string>> {
    const response = await Swapi.people()
        .withQueryParam('page', pageNumber)
        .withQueryParam('limit', '10')
        .tryGetAll();
    const data = await response.json();
    assert.strictEqual(response.status, 200);
    const paginatedResponse: PaginatedResponse = JSON.parse(JSON.stringify(data)) as PaginatedResponse;
    return new Set(paginatedResponse.results.map((itemLink: ItemLink) => itemLink.uid));
}