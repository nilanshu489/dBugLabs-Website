import { useState, useEffect } from 'react';
import { client, urlFor } from '../sanityClient';

// Allowed names for regular member onboarding (/join)
export const ALLOWED_NAMES = [
  'Dhriti', 'Ayush Rudra', 'Chandra Pratap Singh', 'Aditya Raj Singh',
  'Roudra Ghosal', 'Raja Abhiram', 'Mutthuram S R', 'Shrutiparna Phookan',
  'Saalini', 'Vaishnavi Jagtap', 'Tejash Burle', 'Aanvi Gandhi',
  'Dharshini', 'Shashank Singh', 'Piyush Kumar',
  'T Sampath Eswar', 'Ritesh Rajpal', 'M Vaishnavi Sai', 'Asrita AVL',
  'Shiva Krishna', 'Vanshika Singh', 'Parnika Jain', 'Mridul Krishna',
  'Charan Peddi', 'Radha Raman Panda', 'Snehil Kumar Tiwari', 'Prakhar Pandey', 'Mithran G R'
];

// Allowed names for board/lead/associate onboarding (/lead-onboarding)
export const ALLOWED_LEAD_NAMES = [
  'Secretary', 'Joint Secretary', 'Technical Lead', 'Corporate Lead',
  'Web Dev Lead', 'AI/ML Lead', 'Events Lead', 'Sponsorship Lead',
  'PR Lead', 'Creatives Lead',
  'Web Dev Associate', 'AI/ML Associate', 'Events Associate',
  'Sponsorship Associate', 'PR Associate', 'Creatives Associate',
  'Technical Associate', 'Corporate Associate'
];

const EXCLUDED_TECH_ROLES = [
  'Web Dev Lead', 'App Dev Lead', 'QA Lead', 'QA & Testing Lead', 'AI/ML Lead', 'Technical Lead', 'Lead',
  'Web Dev Associate', 'App Dev Associate', 'QA Associate', 'QA & Testing Associate', 'AI/ML Associate', 'Technical Associate', 'Associate'
];

const EXCLUDED_CORP_ROLES = [
  'Events Lead', 'Sponsorship Lead', 'PR Lead', 'Creatives Lead', 'Corporate Lead', 'Lead',
  'Events Associate', 'Sponsorship Associate', 'PR Associate', 'Creatives Associate', 'Corporate Associate', 'Associate'
];

export const useTeamData = () => {
  // Board members — placeholder defaults, overridden by Sanity boardAndLead data
  const [boardMembers, setBoardMembers] = useState([
    { name: 'To Be Announced', role: 'Secretary', domain: 'Board', bio: '', image: '', socials: {} },
    { name: 'To Be Announced', role: 'Joint Secretary', domain: 'Board', bio: '', image: '', socials: {} },
    { name: 'To Be Announced', role: 'Technical Lead', domain: 'Board', bio: '', image: '', socials: {} },
    { name: 'To Be Announced', role: 'Corporate Lead', domain: 'Board', bio: '', image: '', socials: {} }
  ]);

  // Technical Lead & Associate positions
  const [webDevLead, setWebDevLead] = useState({
    name: 'To Be Announced', role: 'Web Dev Lead', domain: 'Web Development', bio: '', image: '', socials: {}
  });

  const [appDevLead, setAppDevLead] = useState({
    name: 'To Be Announced', role: 'App Dev Lead', domain: 'App Development', bio: '', image: '', socials: {}
  });

  const [qaLead, setQaLead] = useState({
    name: 'To Be Announced', role: 'QA & Testing Lead', domain: 'QA & Testing', bio: '', image: '', socials: {}
  });

  const [aimlLead, setAimlLead] = useState({
    name: 'To Be Announced', role: 'AI/ML Lead', domain: 'AI/ML', bio: '', image: '', socials: {}
  });

  const [webDevAssociate, setWebDevAssociate] = useState({
    name: 'To Be Announced', role: 'Web Dev Associate', domain: 'Web Development', bio: '', image: '', socials: {}
  });

  const [appDevAssociate, setAppDevAssociate] = useState({
    name: 'To Be Announced', role: 'App Dev Associate', domain: 'App Development', bio: '', image: '', socials: {}
  });

  const [qaAssociate, setQaAssociate] = useState({
    name: 'To Be Announced', role: 'QA & Testing Associate', domain: 'QA & Testing', bio: '', image: '', socials: {}
  });

  const [aimlAssociate, setAimlAssociate] = useState({
    name: 'To Be Announced', role: 'AI/ML Associate', domain: 'AI/ML', bio: '', image: '', socials: {}
  });

  const [technicalMembers, setTechnicalMembers] = useState([
    { name: 'Dhriti', role: 'Member', domain: 'AI/ML', bio: '', image: '', socials: {} },
    { name: 'Ayush Rudra', role: 'Member', domain: 'Web Development', bio: '', image: '', socials: {} },
    { name: 'Chandra Pratap Singh', role: 'Member', domain: 'Web Development', bio: '', image: '', socials: {} },
    { name: 'Aditya Raj Singh', role: 'Member', domain: 'Web Development', bio: '', image: '', socials: {} },
    { name: 'Roudra Ghosal', role: 'Member', domain: 'AI/ML', bio: '', image: '', socials: {} },
    { name: 'Raja Abhiram', role: 'Member', domain: 'AI/ML', bio: '', image: '', socials: {} },
    { name: 'Mutthuram S R', role: 'Member', domain: 'Web Development', bio: '', image: '', socials: {} },
    { name: 'Shrutiparna Phookan', role: 'Member', domain: 'Web Development', bio: '', image: '', socials: {} },
    { name: 'Saalini', role: 'Member', domain: 'AI/ML', bio: '', image: '', socials: {} },
    { name: 'Vaishnavi Jagtap', role: 'Member', domain: 'Web Development', bio: '', image: '', socials: {} },
    { name: 'Tejash Burle', role: 'Member', domain: 'AI/ML', bio: '', image: '', socials: {} },
    { name: 'Aanvi Gandhi', role: 'Member', domain: 'Technical', bio: '', image: '', socials: {} },
  ]);

  // Corporate Lead & Associate positions
  const [eventsLead, setEventsLead] = useState({
    name: 'To Be Announced', role: 'Events Lead', domain: 'Events', bio: '', image: '', socials: {}
  });

  const [sponsorshipLead, setSponsorshipLead] = useState({
    name: 'To Be Announced', role: 'Sponsorship Lead', domain: 'Sponsorship', bio: '', image: '', socials: {}
  });

  const [prLead, setPrLead] = useState({
    name: 'To Be Announced', role: 'PR Lead', domain: 'Public Relations', bio: '', image: '', socials: {}
  });

  const [creativesLead, setCreativesLead] = useState({
    name: 'To Be Announced', role: 'Creatives Lead', domain: 'Creatives', bio: '', image: '', socials: {}
  });

  const [eventsAssociate, setEventsAssociate] = useState({
    name: 'To Be Announced', role: 'Events Associate', domain: 'Events', bio: '', image: '', socials: {}
  });

  const [sponsorshipAssociate, setSponsorshipAssociate] = useState({
    name: 'To Be Announced', role: 'Sponsorship Associate', domain: 'Sponsorship', bio: '', image: '', socials: {}
  });

  const [prAssociate, setPrAssociate] = useState({
    name: 'To Be Announced', role: 'PR Associate', domain: 'Public Relations', bio: '', image: '', socials: {}
  });

  const [creativesAssociate, setCreativesAssociate] = useState({
    name: 'To Be Announced', role: 'Creatives Associate', domain: 'Creatives', bio: '', image: '', socials: {}
  });

  const [corporateMembers, setCorporateMembers] = useState([
    { name: 'Dharshini', role: 'Member', domain: 'Creatives', bio: '', image: '', socials: {} },
    { name: 'Shashank Singh', role: 'Member', domain: 'Creatives', bio: '', image: '', socials: {} },
    { name: 'Piyush Kumar', role: 'Member', domain: 'Creatives', bio: '', image: '', socials: {} },
    { name: 'T Sampath Eswar', role: 'Member', domain: 'Sponsorship', bio: '', image: '', socials: {} },
    { name: 'Ritesh Rajpal', role: 'Member', domain: 'Sponsorship', bio: '', image: '', socials: {} },
    { name: 'M Vaishnavi Sai', role: 'Member', domain: 'Sponsorship', bio: '', image: '', socials: {} },
    { name: 'Asrita AVL', role: 'Member', domain: 'Sponsorship', bio: '', image: '', socials: {} },
    { name: 'Shiva Krishna', role: 'Member', domain: 'Sponsorship', bio: '', image: '', socials: {} },
    { name: 'Vanshika Singh', role: 'Member', domain: 'Events', bio: '', image: '', socials: {} },
    { name: 'Parnika Jain', role: 'Member', domain: 'Events', bio: '', image: '', socials: {} },
    { name: 'Mithran G R', role: 'Member', domain: 'Events', bio: '', image: '', socials: {} },
    { name: 'Mridul Krishna', role: 'Member', domain: 'Public Relations', bio: '', image: '', socials: {} },
    { name: 'Charan Peddi', role: 'Member', domain: 'Public Relations', bio: '', image: '', socials: {} },
    { name: 'Radha Raman Panda', role: 'Member', domain: 'Public Relations', bio: '', image: '', socials: {} },
    { name: 'Snehil Kumar Tiwari', role: 'Member', domain: 'Public Relations', bio: '', image: '', socials: {} },
    { name: 'Prakhar Pandey', role: 'Member', domain: 'Sponsorship', bio: '', image: '', socials: {} },
  ]);

  const [isLoading, setIsLoading] = useState(true);

  // Fetch Sanity Data — regular members & leads/associates
  useEffect(() => {
    const fetchAll = async () => {
      try {
        let formattedMembers = [];
        let formattedLeads = [];

        // Fetch regular team members
        const memberData = await client.fetch('*[_type == "teamMember"]');
        if (memberData && memberData.length > 0) {
          formattedMembers = memberData.map(member => ({
            name: member.name,
            role: member.role,
            domain: member.domain,
            image: member.image ? urlFor(member.image).url() : '',
            imageScale: member.imageScale,
            imagePosition: member.imagePosition,
            socials: member.socials || {}
          }));

          setTechnicalMembers(prev => mergeMembersLists(prev, formattedMembers, ['Web Development', 'Web Dev', 'App Development', 'App Dev', 'QA & Testing', 'QA and Testing', 'AI/ML', 'Technical'], EXCLUDED_TECH_ROLES));
          setCorporateMembers(prev => mergeMembersLists(prev, formattedMembers, ['Creatives', 'Sponsorship', 'Events', 'Public Relations', 'PR'], EXCLUDED_CORP_ROLES));
        }

        // Fetch board & lead data
        const leadData = await client.fetch('*[_type == "boardAndLead"]');
        if (leadData && leadData.length > 0) {
          formattedLeads = leadData.map(member => ({
            name: member.name,
            role: member.role,
            domain: member.domain,
            image: member.image ? urlFor(member.image).url() : '',
            imageScale: member.imageScale,
            imagePosition: member.imagePosition,
            socials: member.socials || {}
          }));

          // Update board members
          setBoardMembers(prev => {
            return prev.map(placeholder => {
              const match = formattedLeads.find(l => l.role === placeholder.role);
              return match || placeholder;
            });
          });
        }

        // Combine fetched entries from both schemas to find leads and associates
        const allFetched = [...formattedMembers, ...formattedLeads];

        const isDomainMatch = (d1, d2) => {
          if (!d1 || !d2) return false;
          const s1 = d1.toLowerCase().trim();
          const s2 = d2.toLowerCase().trim();
          if (s1 === s2) return true;
          if (s1.includes('web') && s2.includes('web')) return true;
          if (s1.includes('app') && s2.includes('app')) return true;
          if ((s1.includes('qa') || s1.includes('testing')) && (s2.includes('qa') || s2.includes('testing'))) return true;
          if (s1.includes('ai') && s2.includes('ai')) return true;
          if (s1.includes('event') && s2.includes('event')) return true;
          if (s1.includes('sponsor') && s2.includes('sponsor')) return true;
          if ((s1.includes('pr') || s1.includes('public relation')) && (s2.includes('pr') || s2.includes('public relation'))) return true;
          if (s1.includes('creative') && s2.includes('creative')) return true;
          return false;
        };

        const findLead = (domainName, legacyRoleName) => {
          return allFetched.find(m => {
            if (!isDomainMatch(m.domain, domainName)) return false;
            const r = m.role?.toLowerCase() || '';
            if (m.role === 'Lead' || m.role === legacyRoleName || (r.endsWith('lead') && m.role !== 'Technical Lead' && m.role !== 'Corporate Lead')) {
              return true;
            }
            return false;
          });
        };

        const findAssociate = (domainName, legacyRoleName) => {
          return allFetched.find(m => {
            if (!isDomainMatch(m.domain, domainName)) return false;
            const r = m.role?.toLowerCase() || '';
            if (m.role === 'Associate' || m.role === legacyRoleName || r.endsWith('associate')) {
              return true;
            }
            return false;
          });
        };

        const wdl = findLead('Web Development', 'Web Dev Lead');
        if (wdl) setWebDevLead(wdl);

        const adl = findLead('App Development', 'App Dev Lead');
        if (adl) setAppDevLead(adl);

        const qal = findLead('QA & Testing', 'QA & Testing Lead');
        if (qal) setQaLead(qal);

        const aml = findLead('AI/ML', 'AI/ML Lead');
        if (aml) setAimlLead(aml);

        const wda = findAssociate('Web Development', 'Web Dev Associate');
        if (wda) setWebDevAssociate(wda);

        const ada = findAssociate('App Development', 'App Dev Associate');
        if (ada) setAppDevAssociate(ada);

        const qaa = findAssociate('QA & Testing', 'QA & Testing Associate');
        if (qaa) setQaAssociate(qaa);

        const ama = findAssociate('AI/ML', 'AI/ML Associate');
        if (ama) setAimlAssociate(ama);

        const evl = findLead('Events', 'Events Lead');
        if (evl) setEventsLead(evl);

        const spl = findLead('Sponsorship', 'Sponsorship Lead');
        if (spl) setSponsorshipLead(spl);

        const prl = findLead('Public Relations', 'PR Lead');
        if (prl) setPrLead(prl);

        const crl = findLead('Creatives', 'Creatives Lead');
        if (crl) setCreativesLead(crl);

        const eva = findAssociate('Events', 'Events Associate');
        if (eva) setEventsAssociate(eva);

        const spa = findAssociate('Sponsorship', 'Sponsorship Associate');
        if (spa) setSponsorshipAssociate(spa);

        const pra = findAssociate('Public Relations', 'PR Associate');
        if (pra) setPrAssociate(pra);

        const cra = findAssociate('Creatives', 'Creatives Associate');
        if (cra) setCreativesAssociate(cra);

        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };

    fetchAll();
  }, []);

  // Helper functions to merge hardcoded defaults with Sanity data
  const isMatch = (str1, str2) => {
    return str1?.toLowerCase().trim() === str2?.toLowerCase().trim();
  };

  const mergeMembersLists = (defaults, fetched, domains, excludedRoles) => {
    const fetchedDomainMembers = fetched.filter(m => domains.includes(m.domain) && !excludedRoles.includes(m.role));
    // Check against global fetched to avoid duplicating someone who changed domains
    const unmatchedDefaults = defaults.filter(d => !fetched.find(f => isMatch(f.name, d.name)));
    return [...fetchedDomainMembers, ...unmatchedDefaults];
  };

  return {
    boardMembers,
    webDevLead,
    appDevLead,
    qaLead,
    aimlLead,
    webDevAssociate,
    appDevAssociate,
    qaAssociate,
    aimlAssociate,
    technicalMembers,
    eventsLead,
    sponsorshipLead,
    prLead,
    creativesLead,
    eventsAssociate,
    sponsorshipAssociate,
    prAssociate,
    creativesAssociate,
    corporateMembers,
    isLoading
  };
};

