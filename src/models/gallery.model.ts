import { GraphqlAggregate } from "./global.model";

export interface gallery {
    id: number;
    path: string;
    created_at: string;
}

export interface GalleryResponse {
    gallery: gallery[];
    gallery_aggregate: GraphqlAggregate;
}
