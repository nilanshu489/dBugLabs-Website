/**
 * Club roster and the vocabulary the Sanity documents are matched against.
 *
 * These lists are the fallback shown before (or instead of) CMS data, so they
 * live as plain data rather than inside the hook that renders them.
 */

const member = (name, domain) => ({
  name,
  role: 'Member',
  domain,
  bio: '',
  image: '',
  socials: {},
});

/** Names accepted by the member onboarding form at /join. */
export const ALLOWED_NAMES = [
  'Dhriti', 'Ayush Rudra', 'Chandra Pratap Singh', 'Aditya Raj Singh',
  'Roudra Ghosal', 'Raja Abhiram', 'Mutthuram S R', 'Shrutiparna Phookan',
  'Saalini', 'Vaishnavi Jagtap', 'Tejash Burle', 'Aanvi Gandhi',
  'Dharshini', 'Shashank Singh', 'Piyush Kumar',
  'T Sampath Eswar', 'Ritesh Rajpal', 'M Vaishnavi Sai', 'Asrita AVL',
  'Shiva Krishna', 'Vanshika Singh', 'Parnika Jain', 'Mridul Krishna',
  'Charan Peddi', 'Radha Raman Panda', 'Snehil Kumar Tiwari', 'Prakhar Pandey', 'Mithran G R',
];

/**
 * Position titles for board/lead onboarding.
 *
 * NOTE: /lead-onboarding currently renders the same form as /join and validates
 * against ALLOWED_NAMES, so this list is not yet consulted anywhere.
 */
export const ALLOWED_LEAD_NAMES = [
  'Secretary', 'Joint Secretary', 'Technical Lead', 'Corporate Lead',
  'Web Dev Lead', 'AI/ML Lead', 'Events Lead', 'Sponsorship Lead',
  'PR Lead', 'Creatives Lead',
  'Web Dev Associate', 'AI/ML Associate', 'Events Associate',
  'Sponsorship Associate', 'PR Associate', 'Creatives Associate',
  'Technical Associate', 'Corporate Associate',
];

/** Board seats, in the order the Team page lists them. */
export const BOARD_ROLES = ['Secretary', 'Joint Secretary', 'Technical Lead', 'Corporate Lead'];

/** Domains that roll up under each vertical, including CMS spelling variants. */
export const TECH_DOMAINS = [
  'Web Development', 'Web Dev', 'App Development', 'App Dev',
  'QA & Testing', 'QA and Testing', 'AI/ML', 'Technical',
];

export const CORP_DOMAINS = ['Creatives', 'Sponsorship', 'Events', 'Public Relations', 'PR'];

/** Roles that belong in the Leads/Associates rows, so never in "Members". */
export const EXCLUDED_TECH_ROLES = [
  'Web Dev Lead', 'App Dev Lead', 'QA Lead', 'QA & Testing Lead', 'AI/ML Lead', 'Technical Lead', 'Lead',
  'Web Dev Associate', 'App Dev Associate', 'QA Associate', 'QA & Testing Associate', 'AI/ML Associate', 'Technical Associate', 'Associate',
];

export const EXCLUDED_CORP_ROLES = [
  'Events Lead', 'Sponsorship Lead', 'PR Lead', 'Creatives Lead', 'Corporate Lead', 'Lead',
  'Events Associate', 'Sponsorship Associate', 'PR Associate', 'Creatives Associate', 'Corporate Associate', 'Associate',
];

export const DEFAULT_TECHNICAL_MEMBERS = [
  member('Dhriti', 'AI/ML'),
  member('Ayush Rudra', 'Web Development'),
  member('Chandra Pratap Singh', 'Web Development'),
  member('Aditya Raj Singh', 'Web Development'),
  member('Roudra Ghosal', 'AI/ML'),
  member('Raja Abhiram', 'AI/ML'),
  member('Mutthuram S R', 'Web Development'),
  member('Shrutiparna Phookan', 'Web Development'),
  member('Saalini', 'AI/ML'),
  member('Vaishnavi Jagtap', 'Web Development'),
  member('Aanvi Gandhi', 'Technical'),
];

export const DEFAULT_CORPORATE_MEMBERS = [
  member('Dharshini', 'Creatives'),
  member('Shashank Singh', 'Creatives'),
  member('Piyush Kumar', 'Creatives'),
  member('T Sampath Eswar', 'Sponsorship'),
  member('Ritesh Rajpal', 'Sponsorship'),
  member('M Vaishnavi Sai', 'Sponsorship'),
  member('Asrita AVL', 'Sponsorship'),
  member('Shiva Krishna', 'Sponsorship'),
  member('Vanshika Singh', 'Events'),
  member('Parnika Jain', 'Events'),
  member('Mithran G R', 'Events'),
  member('Mridul Krishna', 'Public Relations'),
  member('Charan Peddi', 'Public Relations'),
  member('Radha Raman Panda', 'Public Relations'),
  member('Snehil Kumar Tiwari', 'Public Relations'),
  member('Prakhar Pandey', 'Sponsorship'),
];

/**
 * Every lead/associate slot the Team page renders, in display order.
 *
 * `legacyRole` is the pre-2026 role string still present on older Sanity
 * documents, kept so those entries keep matching alongside the current
 * "Lead"/"Associate" + domain shape.
 */
export const POSITIONS = [
  { key: 'webDevLead', group: 'technical', kind: 'lead', domain: 'Web Development', legacyRole: 'Web Dev Lead' },
  { key: 'appDevLead', group: 'technical', kind: 'lead', domain: 'App Development', legacyRole: 'App Dev Lead' },
  { key: 'qaLead', group: 'technical', kind: 'lead', domain: 'QA & Testing', legacyRole: 'QA & Testing Lead' },
  { key: 'aimlLead', group: 'technical', kind: 'lead', domain: 'AI/ML', legacyRole: 'AI/ML Lead' },

  { key: 'webDevAssociate', group: 'technical', kind: 'associate', domain: 'Web Development', legacyRole: 'Web Dev Associate' },
  { key: 'appDevAssociate', group: 'technical', kind: 'associate', domain: 'App Development', legacyRole: 'App Dev Associate' },
  { key: 'qaAssociate', group: 'technical', kind: 'associate', domain: 'QA & Testing', legacyRole: 'QA & Testing Associate' },
  { key: 'aimlAssociate', group: 'technical', kind: 'associate', domain: 'AI/ML', legacyRole: 'AI/ML Associate' },

  { key: 'eventsLead', group: 'corporate', kind: 'lead', domain: 'Events', legacyRole: 'Events Lead' },
  { key: 'sponsorshipLead', group: 'corporate', kind: 'lead', domain: 'Sponsorship', legacyRole: 'Sponsorship Lead' },
  { key: 'prLead', group: 'corporate', kind: 'lead', domain: 'Public Relations', legacyRole: 'PR Lead' },
  { key: 'creativesLead', group: 'corporate', kind: 'lead', domain: 'Creatives', legacyRole: 'Creatives Lead' },

  { key: 'eventsAssociate', group: 'corporate', kind: 'associate', domain: 'Events', legacyRole: 'Events Associate' },
  { key: 'sponsorshipAssociate', group: 'corporate', kind: 'associate', domain: 'Sponsorship', legacyRole: 'Sponsorship Associate' },
  { key: 'prAssociate', group: 'corporate', kind: 'associate', domain: 'Public Relations', legacyRole: 'PR Associate' },
  { key: 'creativesAssociate', group: 'corporate', kind: 'associate', domain: 'Creatives', legacyRole: 'Creatives Associate' },
];

/** The "To Be Announced" card shown while a seat is empty. */
export const placeholderFor = ({ legacyRole, domain }) => ({
  name: 'To Be Announced',
  role: legacyRole,
  domain,
  bio: '',
  image: '',
  socials: {},
});
