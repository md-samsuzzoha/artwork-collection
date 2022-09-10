import { of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ArtworkService } from './artwork.service';

describe('ArtworkService', () => {
    let service: ArtworkService;
    let httpclientSpy: any;

    beforeEach(() => {
        httpclientSpy = {
            get: jest.fn()
        }
        service = new ArtworkService(httpclientSpy);
    })

    it('should be created', () => {
        expect(service).toBeTruthy();
    })

    it('should test getArtworks', () => {
        const res = 'Artwork Collection';
        const pages = { current_page: 1, limit: 8, total: 8 }
        const url = `${environment.BusinessService}/?page=${pages.current_page}&limit=${pages.limit}`;
        jest.spyOn(httpclientSpy, 'get').mockReturnValue(of(res));
        service.getArtworks(pages);
        expect(httpclientSpy.get).toBeCalledTimes(1);
        expect(httpclientSpy.get).toHaveBeenCalledWith(url);
    })
})