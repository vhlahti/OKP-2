export interface ILocation {
    about: string;
    address: {
        street_address: string;
        postal_code: string;
        city: string;
    }
    image: string;
    name: string;
    position: {
        lat: number;
        lng: number;
    }
    tags: string[];
    url: string;
}