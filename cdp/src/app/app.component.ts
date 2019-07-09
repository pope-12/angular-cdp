import { Component, OnInit } from '@angular/core';
import { PageFocusService } from './core/page-focus.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private pageFocusService: PageFocusService) {}

  ngOnInit(): void {
    this.pageFocusService.watchRouteChange();
  }
}
