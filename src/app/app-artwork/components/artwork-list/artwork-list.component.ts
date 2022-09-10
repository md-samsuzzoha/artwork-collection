import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { IArtworkResponse } from '../../model/IArtworkResponse';
import { IPagination } from '../../model/IPagination';
import { ArtworkService } from '../../services/artwork.service';

@Component({
  selector: 'app-artwork-list',
  templateUrl: './artwork-list.component.html',
  styleUrls: ['./artwork-list.component.scss'],
})
export class ArtworkListComponent implements OnInit {
    
  control = new FormControl();
  title = 'ART COLLECTION';

  selectedItem: any[] = [];
  sortBy: string = '';

  artworks: IArtworkResponse[] = [];
  filteredArtworks: IArtworkResponse[] = [];
  styleTitles: any[] = [];
  pagination: IPagination = {
    current_page: 0,
    limit: 8,
    total: 100,
  };

  isLoading = false;

  private _unsubscribeAll: Subject<void> = new Subject<any>();

  constructor(private _artworkService: ArtworkService) {}

  ngOnInit(): void {
    this.getArtworkCollection(this.pagination);
    this.registerStyleFilter();
  }

  /**
     * Function to get artworks collections by api get call
     * @param pages is object contains current_page and data limit
   */
  getArtworkCollection(pages: IPagination) {
    this.isLoading = true;
    this.styleTitles = [];
    this.control.reset();
    this._artworkService
      .getArtworks(pages)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res) => {
        this.artworks = res.data;
        this.pagination = res.pagination;
        this.isLoading = false;
        this.styleTitles = this.groupByStyleTitleProp(res.data, 'styleTitles');
        if(this.sortBy) {
          this.onTriggerSortItem(this.sortBy);
        }
      });
  }

  prevPage() {
    this.pagination.current_page--;
    this.getArtworkCollection(this.pagination);
  }

  nextPage() {
    this.pagination.current_page++;
    this.getArtworkCollection(this.pagination);
  }

  goToPage(n: number) {
    this.pagination.current_page = n;
    this.getArtworkCollection(this.pagination);
  }
  /**
   * 
   * @param option 
   * @returns 
   */
  selectLabel(option: any): string {
    return option.titleName
      ? `${option.titleName} (${option.items.length})`
      : `Untitled (${option.items.length})`;
  }

  /**
     * Function to perform hello world
     * @param collection contains all artworks & @param property contains by which property it will grouped by
     * @returns a group of title by traves all current artworks
   */
  groupByStyleTitleProp(collection: any, property: string) {
    var i = 0,
      val,
      index,
      values = [],
      result = [];
    for (i; i < collection.length; i++) {
      val = collection[i][property];
      index = values.indexOf(val);
      if (index > -1) result[index].items.push(collection[i]);
      else {
        values.push(val);
        result.push({
          titleName: val,
          items: [collection[i]],
        });
      }
    }
    return result;
  }

  registerStyleFilter() {
    this.control.valueChanges
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((selectedValue) => {
        this.artworks = [];
        if (selectedValue && selectedValue.length) {
          selectedValue.forEach((element: any) => {
            this.artworks = [...this.artworks, ...element.items];
          });
        }
      });
  }

  onTriggerSortItem(value: string) {
    this.sortBy = value;
    if(value === 'endDate') {
        this.sortByYear(this.artworks);
    } else {
        this.sortByName(this.artworks, value)
    }
  }

  sortByYear(data: IArtworkResponse[]) {
    return data.sort(function(a,b) {
        return a.date_end - b.date_end;
    });
  }

  sortByName(data: any, propertyName: string) {
    data.sort(function(a: any,b: any) {
        var x = a[propertyName].toLowerCase();
        var y = b[propertyName].toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
    });
  }

  ngOnDestroy() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
