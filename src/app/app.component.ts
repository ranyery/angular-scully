import { Component } from '@angular/core';
import { isScullyRunning } from '@scullyio/ng-lib';

@Component({
  selector: 'app-root',
  template: `
    <app-header-menu></app-header-menu>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  title = 'angular-scully';

  constructor() {
    const value = isScullyRunning();
    console.log('isScullyRunning:', value);
  }
}
