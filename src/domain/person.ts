export class Person {
    homeworld: string;
    name: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    hair_color: string;
    height: number;
    mass: number;
    skin_color: string;
    created: Date;
    edited: Date;
    url: string;
    films: string[];
    species: string[];
    starships: string[];


    withHomeWorld(homeWorld: string): Person {
        this.homeworld = homeWorld;
        return this;
    }

    withName(name: string): Person {
        this.name = name;
        return this;
    }

    withEyeColor(eyeColor: string): Person {
        this.eye_color = eyeColor;
        return this;
    }

    withBirthYear(birthYear: string): Person {
        this.birth_year = birthYear;
        return this;
    }

    withGender(gender: string): Person {
        this.gender = gender;
        return this;
    }

    withHairColor(hairColor: string): Person {
        this.hair_color = hairColor;
        return this;
    }

    withHeight(height: number): Person {
        this.height = height;
        return this;
    }

    withMass(mass: number): Person {
        this.mass = mass;
        return this;
    }

    withSkinColor(skinColor: string): Person {
        this.skin_color = skinColor;
        return this;
    }

    withCreated(created: Date): Person {
        this.created = created;
        return this;
    }

    withEdited(edited: Date): Person {
        this.edited = edited;
        return this;
    }

    withUrl(url: string): Person {
        this.url = url;
        return this;
    }





}