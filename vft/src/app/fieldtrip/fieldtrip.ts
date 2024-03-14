import { Fieldsite } from "../fieldsite/fieldsite";

export interface Fieldtrip {
    id:               number;
    mapImage:         string;
    name:             string;
    shortDescription: string;
    overview:         string;
    locationName:     string;
    longitude:        number;
    latitude:        number;
    sortedSites:      Fieldsite[];
    _links:           Links;
}

export interface Links {
    self:      link;
    fieldTrip: link;
    sites:     link;
}

export interface link {
    href: string;
}


