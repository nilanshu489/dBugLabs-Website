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

// Allowed names for board/lead onboarding (/lead-onboarding)
export const ALLOWED_LEAD_NAMES = [
  'Secretary', 'Joint Secretary', 'Technical Lead', 'Corporate Lead',
  'Web Dev Lead', 'AI/ML Lead', 'Events Lead', 'Sponsorship Lead',
  'PR Lead', 'Creatives Lead'
];

export const useTeamData = () => {
  // Board members — placeholder defaults, overridden by Sanity boardAndLead data
  const [boardMembers, setBoardMembers] = useState([
    { name: 'To Be Announced', role: 'Secretary', domain: 'Board', bio: '', image: '', socials: {} },
    { name: 'To Be Announced', role: 'Joint Secretary', domain: 'Board', bio: '', image: '', socials: {} },
    { name: 'To Be Announced', role: 'Technical Lead', domain: 'Board', bio: '', image: '', socials: {} },
    { name: 'To Be Announced', role: 'Corporate Lead', domain: 'Board', bio: '', image: '', socials: {} }
  ]);

  // Lead positions — placeholder defaults, overridden by Sanity boardAndLead data
  const [webDevLead, setWebDevLead] = useState({
    name: 'To Be Announced', role: 'Web Dev Lead', domain: 'Web Development', bio: '', image: '', socials: {}
  });

  const [aimlLead, setAimlLead] = useState({
    name: 'To Be Announced', role: 'AI/ML Lead', domain: 'AI/ML', bio: '', image: '', socials: {}
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

  // Fetch Sanity Data — regular members
  useEffect(() => {
    const fetchAll = async () => {
      try {
        // Fetch regular team members
        const memberData = await client.fetch('*[_type == "teamMember"]');
        if (memberData && memberData.length > 0) {
          const formattedMembers = memberData.map(member => ({
            name: member.name,
            role: member.role,
            domain: member.domain,
            image: member.image ? urlFor(member.image).url() : '',
            imageScale: member.imageScale,
            imagePosition: member.imagePosition,
            socials: member.socials || {}
          }));

          setTechnicalMembers(prev => mergeMembersLists(prev, formattedMembers, ['Web Development', 'AI/ML', 'Technical'], ['Web Dev Lead', 'AI/ML Lead']));
          setCorporateMembers(prev => mergeMembersLists(prev, formattedMembers, ['Creatives', 'Sponsorship', 'Events', 'Public Relations'], ['Events Lead', 'Sponsorship Lead', 'PR Lead', 'Creatives Lead']));
        }

        // Fetch board & lead data from new schema
        const leadData = await client.fetch('*[_type == "boardAndLead"]');
        if (leadData && leadData.length > 0) {
          const formattedLeads = leadData.map(member => ({
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

          // Update leads
          const findLead = (role) => formattedLeads.find(m => m.role === role);

          const wdl = findLead('Web Dev Lead');
          if (wdl) setWebDevLead(wdl);

          const aml = findLead('AI/ML Lead');
          if (aml) setAimlLead(aml);

          const evl = findLead('Events Lead');
          if (evl) setEventsLead(evl);

          const spl = findLead('Sponsorship Lead');
          if (spl) setSponsorshipLead(spl);

          const prl = findLead('PR Lead');
          if (prl) setPrLead(prl);

          const crl = findLead('Creatives Lead');
          if (crl) setCreativesLead(crl);
        }

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

  const mergeMembers = (defaults, fetched, domain) => {
    const fetchedDomainMembers = fetched.filter(m => m.domain === domain);
    // Find defaults that aren't fetched anywhere (by name, ignoring case)
    const unmatchedDefaults = defaults.filter(d => !fetched.find(f => isMatch(f.name, d.name)));
    return [...fetchedDomainMembers, ...unmatchedDefaults];
  };

  const mergeMembersLists = (defaults, fetched, domains, excludedRoles) => {
    const fetchedDomainMembers = fetched.filter(m => domains.includes(m.domain) && !excludedRoles.includes(m.role));
    // Check against global fetched to avoid duplicating someone who changed domains
    const unmatchedDefaults = defaults.filter(d => !fetched.find(f => isMatch(f.name, d.name)));
    return [...fetchedDomainMembers, ...unmatchedDefaults];
  };

  return { boardMembers, webDevLead, aimlLead, technicalMembers, eventsLead, sponsorshipLead, prLead, creativesLead, corporateMembers, isLoading };
};
