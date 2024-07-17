
export class ApiBase<T> {
    baseUrl: String;
    headers: Headers;
    queryParams: URLSearchParams;
    contentType: string;

    withHeader(key: string, value: string): T {
        if (this.headers == null) {
            this.headers = new Headers();
        }
        this.headers.append(key, value);
        return this as unknown as T;
    }

    withQueryParam(key: string, value: string): T {
        if (this.queryParams == null) {
            this.queryParams = new URLSearchParams();
        }
        this.queryParams.append(key, value);
        return this as unknown as T;
    }

    getEndpointWithQueryParams(endpoint: string): string {
        if (this.queryParams == null || this.queryParams.toString() === '') {
            return `${this.baseUrl}${endpoint}`;
        }
        return `${this.baseUrl}${endpoint}?${this.queryParams.toString()}`;
    }

    async get(endpoint: string): Promise<Response> {
        this.configureRequest();
        return fetch(this.getEndpointWithQueryParams(endpoint), {
            method: 'GET',
            headers: this.headers
        });
    }

    async post(endpoint: string, body: any): Promise<Response> {
        this.configureRequest();
        return fetch(this.getEndpointWithQueryParams(endpoint), {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(body)
        });
    }

    configureRequest(): void {
        if (this.contentType) {
            this.withHeader('Content-Type', this.contentType);
        }
    }

}