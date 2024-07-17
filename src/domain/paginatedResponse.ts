import { ItemLink } from "./itemLink";

export class PaginatedResponse {
    message: string;
    next: string;
    previous: string;
    total_records: number;
    total_pages: number;
    results: ItemLink[];
}