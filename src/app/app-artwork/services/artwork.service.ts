import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IArtworkAPIResponse } from '../model/IArtworkAPIResponse';
import { IArtworkResponse } from '../model/IArtworkResponse';
import { IPagination } from '../model/IPagination';

@Injectable()
export class ArtworkService {
  backupImage = 'https://upload.wikimedia.org/wikipedia/commons/3/32/Art_Institute_of_Chicago_logo.svg';

  constructor(private http: HttpClient) {}

  getArtworks(pages: IPagination) {
    return this.http
      .get<IArtworkAPIResponse>(`${environment.BusinessService}/?page=${pages.current_page}&limit=${pages.limit}`)
      .pipe(
        map((result) => ({
          pagination: result.pagination,
          data: result.data.map((res: IArtworkResponse) => ({
            itemId: res.id,
            image: res.image_id ? `${result.config.iiif_url}/${res.image_id}/full/843,/0/default.jpg` : this.backupImage,
            artworkName: res.title,
            artistTitle: res.artist_title,
            originYear: `${res.place_of_origin} (${res.date_start == res.date_end ? res.date_start : `${res.date_start} - ${res.date_end}`})`,
            materialsTitle: res.material_titles,
            styleTitles: res.style_title,
            dateEnd: res.date_end,
          })),
        }))
      );
  }
}
