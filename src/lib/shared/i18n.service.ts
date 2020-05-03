import { values } from 'lodash';
import { Injectable, Inject, Optional } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { LocalizationService } from './localization.service';
import { RtlLanguage, I18nConfig } from '../models/i18n.model';

@Injectable()
export class I18nService {
  config: I18nConfig;

  constructor(
    @Optional() @Inject('i18nConfig') private i18nConfig: I18nConfig,
    private translateService: TranslateService,
    private localizationService: LocalizationService,
  ) {
    this.setConfigInitialValue();
    this.init();
  }

  setConfigInitialValue(): void {
    this.config = this.i18nConfig || {
      languages: [],
      checkLocalication: false,
    };
  }

  init(): void {
    const languages = this.config.languages || ['en'];
    const checkLocalication = this.config.checkLocalication || false;
    const storedLanguage = this.getLanguageFromLocalStorage() || languages[0];

    this.translateService.addLangs(languages);
    this.translateService.setDefaultLang(languages[0] || 'en');

    if (checkLocalication) {
      this.localizationService.detectLocalization(languages);
      return;
    }

    this.setLanguage(storedLanguage);

    this.translateService.onLangChange
      .subscribe((event: LangChangeEvent) => this.setDOMLanguage(event.lang));
  }

  setLanguageInLocalStorage(language: string): void {
    localStorage.setItem('lang', language);
  }

  setLanguage(language: string): void {
    this.translateService.use(language);
    this.setLanguageInLocalStorage(language);
  }

  getLanguageFromLocalStorage(): string {
    return localStorage.getItem('lang');
  }

  setDOMLanguage(lang: string): void {
    document.getElementsByTagName('html')[0].setAttribute('lang', lang);
    document.body.classList.add(this.isRTL(lang) ? 'rtl' : 'ltr');
    document.body.classList.remove(this.isRTL(lang) ? 'ltr' : 'rtl');
  }

  isRTL(lang: string): boolean {
    const rtlLanguages = values(RtlLanguage) as string[];
    return rtlLanguages.includes(lang);
  }
}
