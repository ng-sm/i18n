import { of } from 'rxjs';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

const FAKE_TRANSLATIONS = { LOAD: 'This is a test' };

class FakeLoader implements TranslateLoader {
  getTranslation() {
    return of(FAKE_TRANSLATIONS);
  }
}

export const I18nTestingModule = TranslateModule.forRoot({
  loader: {
    provide: TranslateLoader,
    useClass: FakeLoader,
  },
});
