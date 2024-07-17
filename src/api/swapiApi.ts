import { ApiBase } from "./apiBase.js";
import { BASE_SWAPI_URL } from "../core/constants.js";
import { Result } from "../domain/result.js";
import { PaginatedResponse } from '../domain/paginatedResponse.js';
import assert from 'assert';

export class SwapiApi<T> extends ApiBase<SwapiApi<T>> {
    constructor(endpoint: string) {
        super();
        this.baseUrl = BASE_SWAPI_URL + endpoint + '/';
        this.contentType = 'application/json';
    }

    async tryGetAll(): Promise<Response> {
        return this.get('');
    }

    async getAll(): Promise<PaginatedResponse> {
        try {
            const response = await this.tryGetAll();
            if (response.ok) {
                const data = await response.json();
                return data as PaginatedResponse;
            }
            assert.fail('Response not ok');
        } catch (error) {
            assert.fail('Error occurred' + error);
        }
    }

    async getFiltered(filterName: string, filterValue: string): Promise<Result<T>[]> {
        try {
            this.withQueryParam(filterName, filterValue);
            const response = await this.tryGetAll();
            if (response.ok) {
                const data = await response.json();
                let result: string = JSON.stringify(data.result);
                return JSON.parse(result) as Result<T>[];
            }
            assert.fail('Response not ok');
        } catch (error) {
            assert.fail('Error occurred' + error);
        }
    }

    async tryGetById(id: string): Promise<Response> {
        return this.get(id);
    }

    async getById(id: string): Promise<Result<T>> {
        try {
            const response = await this.tryGetById(id);
            if (response.ok) {
                const data = await response.json();
                let result: string = JSON.stringify(data.result);
                return JSON.parse(result) as Result<T>;
            }
            assert.fail('Response not ok');
        } catch (error) {
            assert.fail('Error occurred' + error);
        }
    }
}
