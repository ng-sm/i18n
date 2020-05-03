
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class LocalizationService {
  defaultLanguage: string;
  languages: string[];

  constructor(private translateService: TranslateService) {}

  detectLocalization(languages: string[]): void {
    this.languages = languages;
    this.defaultLanguage = languages[0];

    this.setLanguage();
  }

  setLanguage(): void {
    const browserLangage = this.translateService.getBrowserLang();
    this.translateService.setDefaultLang(this.defaultLanguage);
    this.translateService.use(
      this.isSupportedLanguage(browserLangage)
        ? browserLangage
        : this.defaultLanguage,
    );
  }

  isSupportedLanguage(lang: string): boolean {
    return this.languages.includes(lang);
  }
}
