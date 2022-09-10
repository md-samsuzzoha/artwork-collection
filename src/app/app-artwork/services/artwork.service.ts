import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IArtworkAPIResponse } from '../model/IArtworkAPIResponse';
import { IArtworkResponse } from '../model/IArtworkResponse';
import { IPagination } from '../model/IPagination';

@Injectable()
export class ArtworkService {

  constructor(private http: HttpClient) {}

  /**
   * Function to get artworks collections by api get call
   * @param pages is object contains current_page and data limit
   * @returns the json contain list of artworks collection
   */
  getArtworks(pages: IPagination) {
    return this.http
      .get<IArtworkAPIResponse>(`${environment.BusinessService}/?page=${pages?.current_page}&limit=${pages?.limit}`)
      .pipe(
        map((result) => ({
          pagination: result.pagination,
          data: result.data.map((res: IArtworkResponse) => ({
            id: res.id,
            image: res.image_id ? `${result.config.iiif_url}/${res.image_id}/full/843,/0/default.jpg` : environment.backupImage,
            title: res.title,
            artist_title: res.artist_title,
            originYear: `${res.place_of_origin} (${res.date_start == res.date_end ? res.date_start : `${res.date_start} - ${res.date_end}`})`,
            material_titles: res.material_titles,
            style_title: res.style_title,
            date_end: res.date_end,
            image_id: res.image_id, 
            artwork_type_title: res.artwork_type_title, 
            place_of_origin: res.place_of_origin, 
            date_start: res.date_start,
          })),
        }))
      );
  }
}
