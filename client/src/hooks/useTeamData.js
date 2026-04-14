import { useState, useEffect } from 'react';
import { client, urlFor } from '../sanityClient';

export const ALLOWED_NAMES = [
  'Gauri Kishore', 'Drishti Yadav', 'Shaurya Ojha', 'Pranay Jain',
  'Nilanshu Raj', 'Swarali Patil', 'Shivansh Anand Thakur',
  'Dhriti', 'Ayush Rudra', 'Chandra Pratap Singh', 'Aditya Raj Singh', 
  'Roudra Ghosal', 'Raja Abhiram', 'Mutthuram S R', 'Shrutiparna Phookan', 
  'Saalini', 'Vaishnavi Jagtap', 'Tejash Burle', 'Aanvi Gandhi',
  'Dharshini', 'Shashank Singh', 'Piyush Kumar', 
  'T Sampath Eswar', 'Ritesh Rajpal', 'M Vaishnavi Sai', 'Asrita AVL', 
  'Shiva Krishna', 'Vanshika Singh', 'Parnika Jain', 'Mridul Krishna', 
  'Charan Peddi', 'Radha Raman Panda', 'Snehil Kumar Tiwari', 'Prakhar Pandey'
];

export const useTeamData = () => {
  const [boardMembers, setBoardMembers] = useState([
    { name: 'Gauri Kishore', role: 'Secretary', domain: 'Board', bio: '', image: '', socials: {} },
    { name: 'Drishti Yadav', role: 'Joint Secretary', domain: 'Board', bio: '', image: '', socials: {} },
    { name: 'Shaurya Ojha', role: 'Technical Lead', domain: 'Board', bio: '', image: '/team/shaurya.jpeg', imageScale: 1.25, imagePosition: 'center 80%', socials: {} },
    { name: 'Pranay Jain', role: 'Corporate Lead', domain: 'Board', bio: '', image: '', socials: {} }
  ]);

  const [webDevLead, setWebDevLead] = useState({
    name: 'Nilanshu Raj', role: 'Web Dev Lead', domain: 'Web Development', bio: '', image: '/team/nilanshu.jpeg',
    socials: { linkedin: 'https://www.linkedin.com/in/nilanshu-raj-234362380', github: 'https://github.com/nilanshu489', instagram: 'https://www.instagram.com/nilanshu_srivastava16/', email: 'nilanshusinha16@gmail.com' }
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
    name: 'Swarali Patil', role: 'Events Lead', domain: 'Events', bio: '', image: '/team/swarali.jpeg', imagePosition: '80% center', socials: {}
  });

  const [sponsorshipLead, setSponsorshipLead] = useState({
    name: 'Shivansh Anand Thakur', role: 'Sponsorship Lead', domain: 'Sponsorship', bio: '', image: '/team/shivansh.jpeg', socials: {}
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
    { name: 'Mridul Krishna', role: 'Member', domain: 'Public Relations', bio: '', image: '', socials: {} },
    { name: 'Charan Peddi', role: 'Member', domain: 'Public Relations', bio: '', image: '', socials: {} },
    { name: 'Radha Raman Panda', role: 'Member', domain: 'Public Relations', bio: '', image: '', socials: {} },
    { name: 'Snehil Kumar Tiwari', role: 'Member', domain: 'Public Relations', bio: '', image: '', socials: {} },
    { name: 'Prakhar Pandey', role: 'Member', domain: 'Sponsorship', bio: '', image: '', socials: {} },
  ]);

  const [isLoading, setIsLoading] = useState(true);

  // Fetch Sanity Data
  useEffect(() => {
    client.fetch('*[_type == "teamMember"]')
      .then((data) => {
        if (!data || data.length === 0) {
          setIsLoading(false);
          return;
        }

        const formattedMembers = data.map(member => ({
          name: member.name,
          role: member.role,
          domain: member.domain,
          image: member.image ? urlFor(member.image).url() : '',
          imageScale: member.imageScale,
          imagePosition: member.imagePosition,
          socials: member.socials || {}
        }));

        setBoardMembers(prev => mergeMembers(prev, formattedMembers, 'Board'));
        setTechnicalMembers(prev => mergeMembersLists(prev, formattedMembers, ['Web Development', 'AI/ML', 'Technical'], ['Web Dev Lead', 'AI/ML Lead']));
        setCorporateMembers(prev => mergeMembersLists(prev, formattedMembers, ['Creatives', 'Sponsorship', 'Events', 'Public Relations'], ['Events Lead', 'Sponsorship Lead', 'PR Lead', 'Creatives Lead']));

        const fetchLead = (domain, exactRole) => formattedMembers.find(m => m.domain === domain && m.role === exactRole);

        const wdl = fetchLead('Web Development', 'Web Dev Lead');
        if (wdl) setWebDevLead(wdl);

        const aml = fetchLead('AI/ML', 'AI/ML Lead');
        if (aml) setAimlLead(aml);

        const evl = fetchLead('Events', 'Events Lead');
        if (evl) setEventsLead(evl);

        const spl = fetchLead('Sponsorship', 'Sponsorship Lead');
        if (spl) setSponsorshipLead(spl);

        const prl = fetchLead('Public Relations', 'PR Lead');
        if (prl) setPrLead(prl);

        const crl = fetchLead('Creatives', 'Creatives Lead');
        if (crl) setCreativesLead(crl);

        setIsLoading(false);
      })
      .catch(console.error);
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
