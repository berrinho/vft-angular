import { link } from "../fieldtrip/fieldtrip";

export interface Fieldsite {
    id:                  number;
    siteOrder:           number;
    description:         string;
    name:                string;
    virtualTour:         string;
    localMap:            string;
    localMapDescription: string;
    droneFlightUrl:      string;
    homepageImage:       string;
    latitude:           number;
    longitude:           number;
    _links:              SiteLinks;
}

export interface SiteLinks {
    self:      link;
    site:      link;
    fieldTrip: link;
}


