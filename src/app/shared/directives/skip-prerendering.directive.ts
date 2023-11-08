import {
  Directive,
  inject,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { isScullyRunning } from '@scullyio/ng-lib';

@Directive({
  selector: '[skipPrerendering]',
  standalone: true,
})
export class SkipPrerenderingDirective {
  private readonly _templateRef = inject(TemplateRef);
  private readonly _viewContainerRef = inject(ViewContainerRef);

  constructor() {
    /**
     * No futuro, se for implementado uma solução SSG/SSR com Angular Universal,
     * a validação deve ser substituída para isPlatformServer() utilizando o PlatformService
     */
    if (isScullyRunning()) {
      this._viewContainerRef.clear();
    } else {
      this._viewContainerRef.createEmbeddedView(this._templateRef);
    }
  }
}
