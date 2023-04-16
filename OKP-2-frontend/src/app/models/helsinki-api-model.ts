export interface Activity {
    id: string;
    name: Name;
    sourceType: SourceType;
    infoUrl?: string;
    modifiedAt: string;
    location: {
        lat: number;
        lon: number;
        address: Address;
    };
    description: DescriptionTranslated;
    tags: Tag[];
    whereWhenDuration: WhereWhenDurationTranslated;
}

export interface ActivityV2 {
    id: string;
    updated: string;
    descriptions: { [key: string]: Description };
    company: Company;
    open: { [key: string]: boolean };
    media: Image[];
    companyAddress: Address;
    tags: Tag[];
    siteUrl?: string;
    storeUrl?: string;
    priceEUR: Price;
    availableMonths: string[];
    meantFor: string[];
    duration: string;
    durationType: string;
    address: { location: {
        lat: number;
        long: number;}
    };
}

export interface Address {
    streetAddress: string;
    postalCode: string;
    locality: string;
    neighbourhood: string;
    location: Location;
}

export interface AllItemsResponse {
    offset: number;
    count: number;
    rows: ActivityV2[];
}

export interface Company {
    name: string;
    businessId: string;
    email?: string;
    phone?: string;
}

export interface Coordinate {
    latitude: number;
    longitude: number;
}

export interface Description {
    name: string;
    description?: string;
    siteUrl?: string;
    storeUrl?: string;
}

export interface DescriptionTranslated {
    intro: string;
    body: string;
    images: Image[];
}

export interface Event {
    id: string;
    name: Name;
    sourceType: SourceType;
    infoUrl: string;
    modifiedAt: string;
    location: {
        address: {
            locality: string;
            neighbourhood: string;
            postal_code: string;
            street_address: string;
        }
        lat: number;
        lon: number;
    }
    description: DescriptionTranslated;
    tags: Tag[];
    eventDates: EventDates;
}

export interface EventDates {
    startingDay: string;
    endingDay: string;
    additionalDescription: Description[];
}

export interface Image {
    url: string;
    copyrightHolder: string;
    licenseType: License_type;
    media_id: string;
}

export interface License_type { }

export interface Location {
    position: {
        lat: number;
        lng: number;
    }
}

export interface Media {
    id: string;
    kind: string;
    copyright?: string;
    name: string;
    alt?: string;
    smallUrl?: string;
    originalUrl?: string;
    largeUrl?: string;
}

export interface Name {
    fi: string;
    en: string;
    sv: string;
    zh: string;
}

export interface SourceType {
    // Define properties here
}

export interface Tag {
    id: string;
    name: string;
}

export interface TranslatedString {
    langCode: string;
    text: string;
}

export interface WhereWhenDurationTranslated {
    whereAndWhen: string;
    duration: string;
}

export interface OpeningHour {
    weekdayId: number;
    opens: OpeningHourTime;
    closes: OpeningHourTime;
    open24h?: boolean;
}

export interface OpeningHours {
    open: boolean;
    from?: string;
    to?: string;
}

export interface OpeningHourTime {
    hours: number;
    minutes: number;
    seconds: number;
}

export interface OpeningHoursTranslated {
    hours: string[];
    openinghoursException?: string;
}

export interface Place {
    id: string;
    name: Name;
    sourceType: SourceType;
    infoUrl?: string;
    modifiedAt: string;
    location: Location;
    description: DescriptionTranslated;
    tags?: string[];
    openingHours?: OpeningHoursTranslated;
    extra_searchwords?: string[];
}

export interface PlaceV2 {
    id: string;
    name: Name;
    sourceType: SourceType;
    infoUrl?: string;
    modifiedAt: string;
    description: DescriptionTranslated;
    tags?: string[]; // type of the tags array is unspecified in the mockup
    extra_searchwords?: string[]; // type of the extra_searchwords array is unspecified in the mockup
    openingHoursUrl?: string;
    location: {
        address: {
            locality: string;
            neighbourhood: string;
            postal_code: string;
            street_address: string;
        }
        lat: number;
        lon: number;
    };
}

export interface Price {
    from: number; // type of from is unspecified in the mockup
    to: number; // type of to is unspecified in the mockup
    pricingType?: string;
}
