export class ItemLink {
    uid: string;
    name: string;
    url: string;

    withUid(uid: string): ItemLink {
        this.uid = uid;
        return this;
    }

    withName(name: string): ItemLink {
        this.name = name;
        return this;
    }

    withUrl(url: string): ItemLink {
        this.url = url;
        return this;
    }
}