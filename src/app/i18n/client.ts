'use client';

import { useState, useEffect } from 'react';
import {
  initReactI18next,
  useTranslation as useTranslationOrg,
} from 'react-i18next';

import i18next from 'i18next';
import { useParams } from 'next/navigation';
import resourcesToBackend from 'i18next-resources-to-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import type { ReactOptions } from 'i18next';

import { Global } from 'global/client-only';

import { languages, getOptions } from './settings';

const runsOnServerSide = typeof window === 'undefined';

// on client side the normal singleton is ok
const instance = i18next.createInstance();
instance
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`./locales/${language}/${namespace}.json`),
    ),
  )
  // .use(LocizeBackend) // locize backend could be used on client side, but prefer to keep it in sync with server side
  .init(
    {
      ...getOptions(),
      lng: undefined, // let detect the language on client side
      detection: {
        order: ['path', 'htmlTag', 'cookie', 'navigator'],
      },
      preload: runsOnServerSide ? languages : [],
    },
    () => {
      if (!runsOnServerSide) {
        Global.i18n = instance;
      }
    },
  );

export function useTranslation(
  ns?: string | string[],
  options: ReactOptions = {},
) {
  const { lng } = useParams();
  const ret = useTranslationOrg(ns, options);
  const { i18n } = ret;
  if (runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {
    i18n.changeLanguage(lng as string | undefined);
  }
  const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage);
  useEffect(() => {
    if (activeLng === i18n.resolvedLanguage) return;
    setActiveLng(i18n.resolvedLanguage);
  }, [activeLng, i18n.resolvedLanguage]);

  useEffect(() => {
    if (!lng || i18n.resolvedLanguage === lng) return;
    i18n.changeLanguage(lng as string | undefined);
  }, [lng, i18n]);
  return ret;
}
