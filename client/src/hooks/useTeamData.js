import { useEffect, useState } from 'react';
import { client, urlFor } from '../sanityClient';
import {
  BOARD_ROLES,
  CORP_DOMAINS,
  DEFAULT_CORPORATE_MEMBERS,
  DEFAULT_TECHNICAL_MEMBERS,
  EXCLUDED_CORP_ROLES,
  EXCLUDED_TECH_ROLES,
  POSITIONS,
  TECH_DOMAINS,
  placeholderFor,
} from '../data/roster';

export { ALLOWED_NAMES, ALLOWED_LEAD_NAMES } from '../data/roster';

const normalise = (value) => value?.toLowerCase().trim() ?? '';

const isMatch = (a, b) => normalise(a) === normalise(b) && normalise(a) !== '';

/**
 * Domains are spelled inconsistently across the two Sanity schemas and the
 * hardcoded defaults ("Web Dev" vs "Web Development", "QA" vs "QA & Testing"),
 * so they are compared on a distinctive substring rather than exactly.
 */
const DOMAIN_TOKENS = [
  ['web'],
  ['app'],
  ['qa', 'testing'],
  ['ai'],
  ['event'],
  ['sponsor'],
  ['pr', 'public relation'],
  ['creative'],
];

const isDomainMatch = (a, b) => {
  const left = normalise(a);
  const right = normalise(b);
  if (!left || !right) return false;
  if (left === right) return true;
  return DOMAIN_TOKENS.some(
    (tokens) => tokens.some((t) => left.includes(t)) && tokens.some((t) => right.includes(t)),
  );
};

/** Sanity document -> the shape the team components render. */
const formatMember = (doc) => ({
  name: doc.name,
  role: doc.role,
  domain: doc.domain,
  image: doc.image ? urlFor(doc.image).url() : '',
  imageScale: doc.imageScale,
  imagePosition: doc.imagePosition,
  socials: doc.socials || {},
});

/** CMS entries for a vertical, plus any default who has no CMS entry yet. */
const mergeMembersLists = (defaults, fetched, domains, excludedRoles) => {
  const fromCms = fetched.filter(
    (m) => domains.includes(m.domain) && !excludedRoles.includes(m.role),
  );
  // Compared against everything fetched, not just this vertical, so somebody
  // who switched domains isn't listed twice.
  const stillMissing = defaults.filter((d) => !fetched.some((f) => isMatch(f.name, d.name)));
  return [...fromCms, ...stillMissing];
};

/**
 * Everyone holding a given seat. "Lead"/"Associate" is the current shape;
 * older documents carry the domain in the role itself ("Web Dev Lead"), and
 * anything ending in the right word counts — except the two board seats,
 * which are listed separately.
 */
const findHolders = (people, { kind, domain, legacyRole }) => {
  const suffix = kind === 'lead' ? 'lead' : 'associate';
  const canonical = kind === 'lead' ? 'Lead' : 'Associate';

  return people.filter((person) => {
    if (!isDomainMatch(person.domain, domain)) return false;
    if (person.role === canonical || person.role === legacyRole) return true;
    if (person.role === 'Technical Lead' || person.role === 'Corporate Lead') return false;
    return normalise(person.role).endsWith(suffix);
  });
};

const initialPositions = () =>
  Object.fromEntries(POSITIONS.map((position) => [position.key, [placeholderFor(position)]]));

const initialBoard = () =>
  BOARD_ROLES.map((role) => ({
    name: 'To Be Announced',
    role,
    domain: 'Board',
    bio: '',
    image: '',
    socials: {},
  }));

/**
 * Team roster, merged from two Sanity schemas over a hardcoded fallback.
 *
 * Every lead/associate slot is returned as an **array**, so a domain with two
 * leads needs no special-casing at the call site.
 */
export const useTeamData = () => {
  const [boardMembers, setBoardMembers] = useState(initialBoard);
  const [positions, setPositions] = useState(initialPositions);
  const [technicalMembers, setTechnicalMembers] = useState(DEFAULT_TECHNICAL_MEMBERS);
  const [corporateMembers, setCorporateMembers] = useState(DEFAULT_CORPORATE_MEMBERS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchAll = async () => {
      try {
        const [memberDocs, leadDocs] = await Promise.all([
          client.fetch('*[_type == "teamMember"]'),
          client.fetch('*[_type == "boardAndLead"]'),
        ]);

        if (cancelled) return;

        const members = (memberDocs ?? []).map(formatMember);
        const leads = (leadDocs ?? []).map(formatMember);
        const everyone = [...members, ...leads];

        if (members.length > 0) {
          setTechnicalMembers((prev) =>
            mergeMembersLists(prev, members, TECH_DOMAINS, EXCLUDED_TECH_ROLES),
          );
          setCorporateMembers((prev) =>
            mergeMembersLists(prev, members, CORP_DOMAINS, EXCLUDED_CORP_ROLES),
          );
        }

        if (leads.length > 0) {
          setBoardMembers((prev) =>
            prev.map((seat) => leads.find((lead) => lead.role === seat.role) ?? seat),
          );
        }

        setPositions(
          Object.fromEntries(
            POSITIONS.map((position) => {
              const holders = findHolders(everyone, position);
              return [position.key, holders.length > 0 ? holders : [placeholderFor(position)]];
            }),
          ),
        );
      } catch (error) {
        console.error('Failed to load team data from Sanity:', error);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchAll();

    return () => {
      cancelled = true;
    };
  }, []);

  return { boardMembers, technicalMembers, corporateMembers, isLoading, ...positions };
};
