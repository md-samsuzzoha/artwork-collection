export interface IArtworkResponse {
    id: number;
    image_id: string;
    title: string,
    artist_title: string;
    artwork_type_title: string;
    place_of_origin: string;
    date_start: number;
    date_end: number;
    material_titles: string[];
    style_title: string;
}
