import type { i18n } from 'i18next';
import type { Config, USER_LEVEL, UserSettings } from 'interfaces';
import type {
  SymbolData,
  UnitSetting,
  BankListData,
  BoardSettings,
} from 'interfaces/market';

import { LANG } from './common';

import type { THEME } from './common';

interface IGlobal {
  i18n?: i18n;
  lang?: LANG;
  theme?: THEME;
  defaultUnitSetting: UnitSetting;
  config: Config;
  userSettings?: UserSettings;
  isMobile?: boolean;
}

export const Global: IGlobal = {
  lang: LANG.VI,
  defaultUnitSetting: {
    volume: 1000,
    value: 1000000,
    drVolume: 1,
  },
  config: {
    defaultTimeZone:
      process.env.NEXT_PUBLIC_DEFAULT_TIME_ZONE || 'Asia/Ho_Chi_Minh',
    basePath: process.env.BASE_PATH || '',
    cashSubNumber: '00',
  },
};
