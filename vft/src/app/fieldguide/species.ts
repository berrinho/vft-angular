import { link } from "../fieldtrip/fieldtrip";

export interface Species {
    id:                   number;
    description:          string;
    habitat:              string;
    distribution:         string;
    keyFeatures:          string;
    usageKey:             null;
    kingdom:              string;
    phylum:               string;
    speciesClass:         string;
    speciesOrder:         string;
    family:               string;
    genus:                string;
    speciesName:          string;
    vernacularName:       string;
    thumbnail:            string;
    speciesNameLowercase: string;
    _links:               speciesLinks;
}

export interface speciesLinks {
    self:      link;
    species:   link;
    mainImage: link;
}

