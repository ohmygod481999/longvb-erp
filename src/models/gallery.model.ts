import { GraphqlAggregate } from "./global.model";

export interface gallery {
    id: number;
    path: string;
}

export interface GalleryResponse {
    gallery: gallery[];
    gallery_aggregate: GraphqlAggregate;
}
