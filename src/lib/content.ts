import { getCollection } from 'astro:content';
import type { Lang } from './i18n';
import { splitId } from './i18n';

import esSite from '../content/es/site.json';
import enSite from '../content/en/site.json';
import esHome from '../content/es/home.json';
import enHome from '../content/en/home.json';
import esCareer from '../content/es/career.json';
import enCareer from '../content/en/career.json';
import esConsulting from '../content/es/consulting.json';
import enConsulting from '../content/en/consulting.json';
import esCourse from '../content/es/course.json';
import enCourse from '../content/en/course.json';
import esProjects from '../content/es/projects.json';
import enProjects from '../content/en/projects.json';

import contact from '../content/contact.json';
import teaching from '../content/teaching.json';
export { contact, teaching };

// Typing EN as the ES shape makes `astro check` complain if a key is missing in one language.
type Pair<T> = Record<Lang, T>;
export const site: Pair<typeof esSite> = { es: esSite, en: enSite };
export const home: Pair<typeof esHome> = { es: esHome, en: enHome };
export const career: Pair<typeof esCareer> = { es: esCareer, en: enCareer };
export const consulting: Pair<typeof esConsulting> = { es: esConsulting, en: enConsulting };
export const course: Pair<typeof esCourse> = { es: esCourse, en: enCourse };
export const projectsPage: Pair<typeof esProjects> = { es: esProjects, en: enProjects };

const inLang = (lang: Lang) => (entry: { id: string }) => splitId(entry.id).lang === lang;

export async function getCases(lang: Lang) {
  return (await getCollection('cases', inLang(lang))).sort((a, b) => a.data.order - b.data.order);
}

export async function getProjects(lang: Lang) {
  return (await getCollection('projects', inLang(lang))).sort((a, b) => a.data.order - b.data.order);
}

export async function getNow(lang: Lang) {
  return (await getCollection('now', inLang(lang)))[0];
}

export function whatsappUrl(message: string) {
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function mailtoUrl(subject?: string) {
  return `mailto:${contact.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;
}
