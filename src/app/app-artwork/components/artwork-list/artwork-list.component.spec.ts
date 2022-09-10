import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
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
import { of } from 'rxjs';
import { SharedModule } from '../../../shared/shared.module';
import { ArtworkService } from '../../services/artwork.service';
import { CardComponent } from '../card/card.component';
import { ArtworkListComponent } from './artwork-list.component';
let url = 'https://jsonplaceholder.typicode.com';
describe('ArtworkListComponent', () => {
    let component: ArtworkListComponent;
    let fixture: ComponentFixture<ArtworkListComponent>;
    let fakeServiceMock: any;
    let httpClient: any;

    beforeEach(async () => {
        fakeServiceMock = {
            getArtworks: jest.fn()
        }
        await TestBed.configureTestingModule({
            declarations: [ ArtworkListComponent, CardComponent ],
            imports: [
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
                HttpClientModule,
            ],        
            providers: [
                {
                    provide: ArtworkService,
                    //  useValue: fakeServiceMock
                }
            ]
        })
        .compileComponents();
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(ArtworkListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    })

    it('should create', () => {
        expect(component).toBeTruthy();
    })

    it('render title correctly', () => {
        expect(component.title).toEqual('ART COLLECTION');
    });

    it('should getArtworkCollection set serviceData', () => {
        const expRes: any[] = [];
        jest.spyOn(fakeServiceMock, 'getArtworks').mockReturnValue(of(expRes));
        expect(component.artworks).toEqual(expRes);
    })

    it('should set value', () => {
        const newValue = 'hey here!';
    
        component.control.patchValue({
          custom: newValue,
        });
        expect(component.control.value.custom).toBe(newValue);
    });
    it('should sort with sortByYear correctly', waitForAsync(() => {
        const fakeRings: any = [
            { dateEnd: 1900 },
            { dateEnd: 1800 },
            { dateEnd: 2000 },
            { dateEnd: 1100 },
        ];
        const ringsInOrder: any = [
            { dateEnd: 1100 },
            { dateEnd: 1800 },
            { dateEnd: 1900 },
            { dateEnd: 2000 },
        ];

        component.artworks = fakeRings;
        component.sortByYear(component.artworks);
        expect(component.artworks).toEqual(ringsInOrder);
        })
    );
    
    it('should sort sortByName correctly', waitForAsync(() => {
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

        component.artworks = fakeRings;
        component.sortByName(component.artworks, 'name');
        expect(component.artworks).toEqual(ringsInOrder);
        })
    );

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
        expect(component.pagination.current_page).toEqual(currentPage-1);
    });
    it('should set paginator nextPage', () => {
        const currentPage = 0;
        component.nextPage();
        expect(component.pagination.current_page).toEqual(currentPage+1);
    });
})