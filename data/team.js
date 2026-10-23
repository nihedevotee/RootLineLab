// Rootline Lab leadership — single source of truth for /team, the About teaser and JSON-LD.
//
// Editing rules (see docs/design/TEAM_EXPERIENCE_AUDIT.md):
// - Only publish facts the company has supplied or that were verified on the member's own pages.
// - Links with `verified: false` stay here for the record but are never rendered.
// - To add a portrait later, drop the file in /public/team/ and set `portrait`.

/**
 * @typedef {Object} TeamLink
 * @property {'linkedin' | 'portfolio' | 'github' | 'email'} kind
 * @property {string} href
 * @property {string} label    Visible text for the link
 * @property {boolean} verified  false → kept in data, hidden from the UI
 * @property {string} [note]   Why a link is unverified / what needs confirming
 */

/**
 * @typedef {Object} TeamMember
 * @property {string} slug        URL-safe id, used for ?member= deep links
 * @property {string} index       Display order "01"–"06"
 * @property {string} name        Full display name as confirmed by the company
 * @property {string} [shortName] Name used in compact labels (defaults to `name`)
 * @property {string} role        Exact organisational title
 * @property {'founders' | 'directors'} tier
 * @property {string} discipline  Short discipline label for annotations
 * @property {string} code        Drawing-sheet discipline code
 * @property {string | null} portrait  Path under /public, or null
 * @property {string | null} bio  Approved biography, or null
 * @property {TeamLink[]} links
 */

/** @type {TeamMember[]} */
export const team = [
  {
    slug: 'maysha',
    index: '01',
    name: 'Maysha Kaosar',
    shortName: 'Maysha',
    role: 'Founder & Chief Executive Officer (CEO)',
    tier: 'founders',
    discipline: 'Leadership',
    code: 'CEO',
    portrait: '/team/maysha.jpg',
    bio: null,
    links: [],
  },
  {
    slug: 'afnan',
    index: '02',
    name: 'Md. Afnan Uddin',
    shortName: 'Afnan',
    role: 'Co-Founder & Managing Director',
    tier: 'founders',
    discipline: 'Management',
    code: 'MD',
    portrait: '/team/afnan.jpg',
    bio: null,
    links: [
      { kind: 'email', href: 'mailto:md.afnan.uddin67@gmail.com', label: 'md.afnan.uddin67@gmail.com', verified: true },
    ],
  },
  {
    slug: 'rupesh-saha',
    index: '03',
    name: 'Rupesh Saha',
    role: 'Director of Software Engineering',
    tier: 'directors',
    discipline: 'Software Engineering',
    code: 'SWE',
    portrait: '/team/rupesh-saha.jpg',
    bio: null,
    links: [
      { kind: 'email', href: 'mailto:saharupesh291@gmail.com', label: 'saharupesh291@gmail.com', verified: true },
      { kind: 'email', href: 'mailto:rupesh.saha@g.bracu.ac.bd', label: 'rupesh.saha@g.bracu.ac.bd', verified: true },
      {
        kind: 'linkedin',
        href: 'https://www.linkedin.com/in/rupesh-saha',
        label: 'LinkedIn',
        verified: true,
        note: 'Supplied by the company. Profile is login-walled, so identity could not be cross-checked publicly.',
      },
    ],
  },
  {
    slug: 'kazi-salman',
    index: '04',
    name: 'Kazi Salman',
    shortName: 'Salman',
    role: 'Director of Application Development',
    tier: 'directors',
    discipline: 'Application Development',
    code: 'APP',
    portrait: '/team/kazi-salman.jpg',
    bio: null,
    links: [
      { kind: 'email', href: 'mailto:kazisalman840@gmail.com', label: 'kazisalman840@gmail.com', verified: true },
      { kind: 'portfolio', href: 'https://kazisalman.dev', label: 'Portfolio', verified: true },
    ],
  },
  {
    slug: 'khalid-al-galib',
    index: '05',
    name: 'Khalid Al Galib',
    shortName: 'Galib',
    role: 'Director of Product Engineering & Design',
    tier: 'directors',
    discipline: 'Product Engineering & Design',
    code: 'PED',
    portrait: '/team/khalid-al-galib.jpg',
    bio: null,
    links: [
      { kind: 'email', href: 'mailto:galibhassan705@gmail.com', label: 'galibhassan705@gmail.com', verified: true },
      {
        kind: 'portfolio',
        href: 'https://khalid-portfolio-al6.pages.dev',
        label: 'Portfolio',
        verified: true,
        note: 'Ownership confirmed by the company: Galib is Khalid Al Galib.',
      },
    ],
  },
  {
    slug: 'younus-mohammad-maheer',
    index: '06',
    name: 'Younus Mohammad Maheer',
    shortName: 'Maheer',
    role: 'Director of Quality Assurance & DevOps',
    tier: 'directors',
    discipline: 'Quality Assurance & DevOps',
    code: 'QAO',
    portrait: '/team/younus-mohammad-maheer.jpg',
    bio: null,
    links: [
      { kind: 'email', href: 'mailto:younusmohammadmaheer123@gmail.com', label: 'younusmohammadmaheer123@gmail.com', verified: true },
      { kind: 'portfolio', href: 'https://maheer-portfolio-three.vercel.app/', label: 'Portfolio', verified: true },
      {
        kind: 'linkedin',
        href: 'https://www.linkedin.com/in/younus-mohammad-maheer-a78a08348/',
        label: 'LinkedIn',
        verified: true,
        note: 'Supplied by the company. His portfolio links to /in/younus-mohammadmaheer instead — confirm which slug is current.',
      },
    ],
  },
];

export const founders = team.filter((m) => m.tier === 'founders');
export const directors = team.filter((m) => m.tier === 'directors');

export const shortNameOf = (member) => member.shortName || member.name;

/** Links that are safe to render. */
export const publicLinks = (member) => member.links.filter((l) => l.verified);

export const getMember = (slug) => team.find((m) => m.slug === slug) || null;
