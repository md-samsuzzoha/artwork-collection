import { IArtworkResponse } from './IArtworkResponse';
import { IPagination } from './IPagination';

export interface IArtworkAPIResponse {
    config: IConfig;
    data: IArtworkResponse[];
    pagination: IPagination;
}

interface IConfig {
    iiif_url: string;
}