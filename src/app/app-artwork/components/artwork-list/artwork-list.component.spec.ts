import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxCardModule } from '@aposin/ng-aquila/card';
import { NxCheckboxModule } from '@aposin/ng-aquila/checkbox';
import { NxDropdownModule } from '@aposin/ng-aquila/dropdown';
import { NxFormfieldModule } from '@aposin/ng-aquila/formfield';
import { NxGridModule } from '@aposin/ng-aquila/grid';
import { NxHeadlineModule } from '@aposin/ng-aquila/headline';
import { NxInputModule } from '@aposin/ng-aquila/input';
import { NxModalModule } from '@aposin/ng-aquila/modal';
import { NxPaginationModule } from '@aposin/ng-aquila/pagination';
import { NxSpinnerModule } from '@aposin/ng-aquila/spinner';
import { of, take } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { SharedModule } from '../../../shared/shared.module';
import { IArtworkAPIResponse } from '../../model/IArtworkAPIResponse';
import { ArtworkService } from '../../services/artwork.service';
import { CardComponent } from '../card/card.component';
import { ArtworkListComponent } from './artwork-list.component';

const mockArtworks: IArtworkAPIResponse = {
    data: [
        {
            id: 1,
            image: '',
            title: 'artwork title3',
            artist_title: 'title',
            date_end: 1990,
            material_titles: ['test1', 'test2'],
            originYear: '',
            image_id: '',
            artwork_type_title: '',
            place_of_origin: '',
            date_start: 1980,
            style_title: ''
        }
    ],
    config: {
        iiif_url: ''
    },
    pagination: {
        current_page: 1,
        limit: 8,
        next_url: '',
        offset: 0,
        total: 100,
        total_pages: 100,
    }
}

describe('ArtworkListComponent', () => {
    let component: ArtworkListComponent;
    let fixture: ComponentFixture<ArtworkListComponent>;
    let artworkServiceMock: ArtworkService;
    let httpClient: any;
    let element: any;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            /*
             * All components need to be declared in declaration
             */
            declarations: [ArtworkListComponent, CardComponent],

            /*
             * Every module that has been used in this component or the dependent component needs to be declared in imports.
             */
            imports: [
                HttpClientModule,
                NxButtonModule,
                NxCheckboxModule,
                NxDropdownModule,
                NxFormfieldModule,
                NxGridModule,
                NxHeadlineModule,
                NxInputModule,
                NxModalModule,
                NxPaginationModule,
                NxSpinnerModule,
                NxCardModule,
                SharedModule,
                FormsModule,
                ReactiveFormsModule,
            ],

            /*
             * All services need to be declared in provider
             */
            providers: [ArtworkService],
        }).compileComponents();

        fixture = TestBed.createComponent(ArtworkListComponent);
        component = fixture.componentInstance;
        element = fixture.debugElement.nativeElement;
        fixture.detectChanges();

        /*
         * Initialize the httpClient for using the service method with http/https.
         */
        httpClient = {
            get: jest.fn(),
        };
        artworkServiceMock = new ArtworkService(httpClient);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Should fetch the artwork collection using http call', () => {
        const artworks = mockArtworks;
        const getUserUrl = `${environment.BusinessService}/?page=${mockArtworks.pagination.current_page}&limit=${mockArtworks.pagination.limit}`;
        jest.spyOn(httpClient, 'get').mockReturnValue(of(artworks));
        artworkServiceMock.getArtworks(mockArtworks.pagination)
            .pipe(take(1))
            .subscribe((data) => {
                expect(httpClient.get).toHaveBeenCalledWith(getUserUrl);
                expect(data).toBe(artworks);
            });
    });

    it('render title correctly', () => {
        expect(component.title).toEqual('ART COLLECTION');
    });

    it('should set value', () => {
        const newValue = 'hey here!';

        component.control.patchValue({
            custom: newValue,
        });
        expect(component.control.value.custom).toBe(newValue);
    });
    it('should sort with sortByYear correctly', () => {
        const fakeRings: any = [
            { date_end: 1900 },
            { date_end: 1800 },
            { date_end: 2000 },
            { date_end: 1100 },
        ];
        const ringsInOrder: any = [
            { date_end: 1100 },
            { date_end: 1800 },
            { date_end: 1900 },
            { date_end: 2000 },
        ];

        const sort = component.sortByYear(fakeRings);
        expect(sort).toEqual(ringsInOrder);
    });

    it('should sort sortByName correctly', () => {
        const fakeRings: any = [
            { name: 'bbb' },
            { name: 'aaa' },
            { name: 'ddd' },
            { name: 'ccc' },
        ];
        const ringsInOrder: any = [
            { name: 'aaa' },
            { name: 'bbb' },
            { name: 'ccc' },
            { name: 'ddd' },
        ];

        const sort = fakeRings;
        component.sortByName(sort, 'name');
        expect(sort).toEqual(ringsInOrder);
    });

    it('should set sort value', () => {
        const sortBy = 'name';
        component.onTriggerSortItem(sortBy);
        expect(component.sortBy).toEqual(sortBy);
    });

    it('should set paginator by goToPage', () => {
        const currentPage = 5;
        component.goToPage(currentPage);
        expect(component.pagination.current_page).toEqual(currentPage);
    });
    it('should set paginator prevPage', () => {
        const currentPage = 2;
        component.pagination.current_page = 2;
        component.prevPage();
        expect(component.pagination.current_page).toEqual(currentPage - 1);
    });
    it('should set paginator nextPage', () => {
        const currentPage = 0;
        component.nextPage();
        expect(component.pagination.current_page).toEqual(currentPage + 1);
    });

});
