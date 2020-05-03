import { TestBed } from '@angular/core/testing';

import { I18nService } from './i18n.service';
import { LocalizationService } from './localization.service';
import { I18nTestingModule } from './i18n-testing.module';

describe('Service: Language', () => {
  let languageService: I18nService;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      providers: [I18nService, LocalizationService],
    }),
  );

  beforeEach(() => {
    languageService = TestBed.inject(I18nService);
  });

  it('should be created', () => {
    expect(I18nService).toBeTruthy();
    expect(LocalizationService).toBeTruthy();
  });

  it('should set initial language', () => {
    languageService.init();
    expect(localStorage.getItem('lang')).toBeTruthy();
  });

  it('should set language', () => {
    languageService.setLanguage('en');
    expect(localStorage.getItem('lang')).toBe('en');
  });

  it('should set value in localStorage', () => {
    languageService.setLanguageInLocalStorage('en');
    expect(localStorage.getItem('lang')).toBe('en');
  });

  it('should get value from localStorage', () => {
    localStorage.setItem('lang', 'en');
    expect(languageService.getLanguageFromLocalStorage()).toBe('en');
  });
});
