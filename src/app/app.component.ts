import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { LoaderService } from './loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ehrApp';
  loading$ = this.loaderService.loading$;

  constructor(public loaderService : LoaderService ){

  }
}
