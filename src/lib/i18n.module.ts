import { HttpClient } from '@angular/common/http';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { HttpLoaderFactory } from './shared/i18n.factory';
import { I18nService } from './shared/i18n.service';
import { LocalizationService } from './shared/localization.service';
import { I18nConfig } from './models/i18n.model';

@NgModule({
  imports: [
    BrowserModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [TranslateModule],
  providers: [
    I18nService,
    LocalizationService,
  ],
})
export class I18nModule {
  static forRoot(config: I18nConfig): ModuleWithProviders {
    return {
      ngModule: I18nModule,
      providers: [
        {
          provide: 'i18nConfig',
          useValue: config,
        }
      ]
    };
  }

  constructor(public i18nService: I18nService) {}
}
