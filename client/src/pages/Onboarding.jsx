import { useState } from 'react';
import { Shield, Upload, CheckCircle2, Loader2, Crown, User, Instagram, Github, Linkedin, Twitter } from 'lucide-react';
import { writeClient } from '../sanityClient';
import { ALLOWED_NAMES } from '../hooks/useTeamData';

const LEAD_ROLES = [
  { role: 'Secretary', domain: 'Board' },
  { role: 'Joint Secretary', domain: 'Board' },
  { role: 'Technical Lead', domain: 'Board' },
  { role: 'Corporate Lead', domain: 'Board' },
  { role: 'Web Dev Lead', domain: 'Web Development' },
  { role: 'AI/ML Lead', domain: 'AI/ML' },
  { role: 'Events Lead', domain: 'Events' },
  { role: 'Sponsorship Lead', domain: 'Sponsorship' },
  { role: 'PR Lead', domain: 'Public Relations' },
  { role: 'Creatives Lead', domain: 'Creatives' },
];

const MEMBER_DOMAINS = [
  'Web Development',
  'AI/ML',
  'Creatives',
  'Sponsorship',
  'Events',
  'Public Relations',
  'Technical'
];

const Onboarding = () => {
  const [positionType, setPositionType] = useState('member'); // 'member' or 'lead'
  const [formData, setFormData] = useState({
    passcode: '',
    name: '',
    role: 'Member',
    leadRole: 'Secretary',
    domain: 'Web Development',
    instagram: '',
    linkedin: '',
    github: '',
    twitter: ''
  });
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  
  const [status, setStatus] = useState('idle'); // idle, uploading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'leadRole') {
      const match = LEAD_ROLES.find(r => r.role === value);
      setFormData(prev => ({
        ...prev,
        leadRole: value,
        domain: match ? match.domain : prev.domain
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handlePositionTypeChange = (type) => {
    setPositionType(type);
    setErrorMessage('');
    if (type === 'lead') {
      const match = LEAD_ROLES.find(r => r.role === formData.leadRole) || LEAD_ROLES[0];
      setFormData(prev => ({
        ...prev,
        role: match.role,
        domain: match.domain
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        role: 'Member',
        domain: 'Web Development'
      }));
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFilePreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    
    // 1. Verify Secret Club Passcode
    const validPasscode = (import.meta.env.VITE_CLUB_PASSCODE || 'DBUGLABS').trim();
    if (formData.passcode.trim() !== validPasscode) {
      setErrorMessage('Invalid Club Passcode! Please ask a Lead or Admin for the secret code.');
      return;
    }

    const inputName = formData.name.trim();
    if (!inputName) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    try {
      setStatus('uploading');

      // Upload image to Sanity asset pipeline if a file was selected
      let imageRef = null;
      if (file) {
        const imageAsset = await writeClient.assets.upload('image', file, {
          filename: file.name
        });
        imageRef = {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset._id
          }
        };
      }

      const socials = {
        instagram: formData.instagram ? formData.instagram.trim() : '',
        linkedin: formData.linkedin ? formData.linkedin.trim() : '',
        github: formData.github ? formData.github.trim() : '',
        twitter: formData.twitter ? formData.twitter.trim() : ''
      };

      if (positionType === 'lead') {
        // --- LEAD / BOARD ONBOARDING ---
        const activeRole = formData.leadRole;
        const activeDomain = LEAD_ROLES.find(r => r.role === activeRole)?.domain || formData.domain;

        // Check if document already exists by role or name
        const existingLead = await writeClient.fetch(
          '*[_type == "boardAndLead" && (role == $role || name == $name)][0]',
          { role: activeRole, name: inputName }
        );

        if (!existingLead && !imageRef) {
          setErrorMessage('Please upload a profile photo for your lead profile.');
          setStatus('idle');
          return;
        }

        if (existingLead) {
          const patch = writeClient.patch(existingLead._id).set({
            name: inputName,
            role: activeRole,
            domain: activeDomain,
            socials: socials
          });
          if (imageRef) {
            patch.set({ image: imageRef });
          }
          await patch.commit();
        } else {
          await writeClient.create({
            _type: 'boardAndLead',
            name: inputName,
            role: activeRole,
            domain: activeDomain,
            image: imageRef,
            socials: socials
          });
        }
      } else {
        // --- MEMBER ONBOARDING ---
        const exactName = ALLOWED_NAMES.find(n => n.toLowerCase() === inputName.toLowerCase()) || inputName;

        const existingMember = await writeClient.fetch(
          '*[_type == "teamMember" && name == $name][0]',
          { name: exactName }
        );

        if (!existingMember && !imageRef) {
          setErrorMessage('Please upload a profile photo for your member profile.');
          setStatus('idle');
          return;
        }

        if (existingMember) {
          const patch = writeClient.patch(existingMember._id).set({
            name: exactName,
            role: 'Member',
            domain: formData.domain,
            socials: socials
          });
          if (imageRef) {
            patch.set({ image: imageRef });
          }
          await patch.commit();
        } else {
          await writeClient.create({
            _type: 'teamMember',
            name: exactName,
            role: 'Member',
            domain: formData.domain,
            image: imageRef,
            socials: socials
          });
        }
      }

      setStatus('success');
      setFormData({
        passcode: '',
        name: '',
        role: 'Member',
        leadRole: 'Secretary',
        domain: 'Web Development',
        instagram: '',
        linkedin: '',
        github: '',
        twitter: ''
      });
      setFile(null);
      setFilePreview(null);
      
    } catch (error) {
      console.error('Submission error:', error);
      setErrorMessage('Failed to connect to Sanity CMS. Please verify your internet connection or passcode.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <main className="bg-black min-h-screen pt-32 pb-16 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-gray-900 border border-purple-500/30 rounded-2xl p-8 text-center space-y-6 shadow-2xl shadow-purple-500/10">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto border border-green-500/40">
            <CheckCircle2 className="w-10 h-10 text-green-400" />
          </div>
          <h2 className="text-3xl font-bold text-white">Profile Connected!</h2>
          <p className="text-gray-400">
            Your profile has been saved directly to Sanity CMS and is now live on the website roster!
          </p>
          <button 
            onClick={() => setStatus('idle')}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-pink-500/25"
          >
            Add / Update Another Profile
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-black min-h-screen pt-32 pb-16">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-pink-400 text-sm font-semibold tracking-wider uppercase">Official Roster</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4 text-white">
            Team <span className="gradient-text">Onboarding</span>
          </h1>
          <p className="text-gray-400">
            Connect or update your official dBug Labs profile directly in the CMS.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-900/90 border border-purple-500/20 rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl">
          {/* Position Type Selector Toggle */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 block mb-2">I am registering as:</label>
            <div className="grid grid-cols-2 gap-3 p-1.5 bg-black/60 border border-gray-800 rounded-xl">
              <button
                type="button"
                onClick={() => handlePositionTypeChange('member')}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium text-sm transition-all ${
                  positionType === 'member'
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <User className="w-4 h-4" /> Team Member
              </button>
              <button
                type="button"
                onClick={() => handlePositionTypeChange('lead')}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium text-sm transition-all ${
                  positionType === 'lead'
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Crown className="w-4 h-4 text-amber-400" /> Board / Lead
              </button>
            </div>
          </div>

          {/* Passcode Security Field */}
          <div className="bg-purple-900/20 border border-purple-500/30 rounded-xl p-5">
            <label className="flex items-center gap-2 text-sm font-medium text-purple-300 mb-2">
              <Shield className="w-4 h-4" /> Secret Club Passcode
            </label>
            <input 
              required
              type="password"
              name="passcode"
              value={formData.passcode}
              onChange={handleInputChange}
              className="w-full bg-black/60 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
              placeholder="Enter passcode (ask a lead if you need it)"
            />
          </div>

          {/* Name & Role Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Full Name</label>
              <input 
                required 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleInputChange} 
                className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-colors" 
                placeholder="e.g. John Doe" 
              />
            </div>
            
            {positionType === 'lead' ? (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 flex items-center gap-1.5">
                  <Crown className="w-4 h-4 text-amber-400" /> Lead Position
                </label>
                <select
                  name="leadRole"
                  value={formData.leadRole}
                  onChange={handleInputChange}
                  className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-colors appearance-none"
                >
                  {LEAD_ROLES.map(r => (
                    <option key={r.role} value={r.role}>{r.role}</option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Role</label>
                <input 
                  type="text" 
                  value="Member" 
                  readOnly 
                  className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-3 text-gray-400 cursor-not-allowed" 
                />
              </div>
            )}
          </div>

          {/* Domain Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Domain / Department</label>
            {positionType === 'lead' ? (
              <input
                type="text"
                value={formData.domain}
                readOnly
                className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-3 text-gray-400 cursor-not-allowed"
              />
            ) : (
              <select 
                name="domain" 
                value={formData.domain} 
                onChange={handleInputChange} 
                className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-colors appearance-none"
              >
                {MEMBER_DOMAINS.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            )}
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Profile Picture (Optional if updating)</label>
            <div className="border-2 border-dashed border-gray-700 rounded-xl p-6 text-center hover:border-pink-500 transition-colors cursor-pointer relative group">
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
              />
              {filePreview ? (
                <div className="flex flex-col items-center">
                  <img src={filePreview} alt="Preview" className="w-24 h-24 rounded-full object-cover border-2 border-pink-500 mb-3 shadow-lg shadow-pink-500/20" />
                  <span className="text-sm text-pink-400">Click or drag to change picture</span>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Upload className="w-8 h-8 text-gray-500 mb-2 group-hover:text-pink-400 transition-colors" />
                  <p className="text-sm text-gray-400">Drag & drop your best photo here, or click to browse</p>
                </div>
              )}
            </div>
          </div>

          {/* Social Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-800">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                <Instagram className="w-4 h-4 text-pink-500"/> Instagram
              </label>
              <input 
                type="url" 
                name="instagram" 
                value={formData.instagram} 
                onChange={handleInputChange} 
                className="w-full bg-black/50 border border-gray-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-pink-500" 
                placeholder="https://..." 
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                <Linkedin className="w-4 h-4 text-blue-500"/> LinkedIn
              </label>
              <input 
                type="url" 
                name="linkedin" 
                value={formData.linkedin} 
                onChange={handleInputChange} 
                className="w-full bg-black/50 border border-gray-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500" 
                placeholder="https://..." 
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                <Github className="w-4 h-4 text-gray-400"/> GitHub
              </label>
              <input 
                type="url" 
                name="github" 
                value={formData.github} 
                onChange={handleInputChange} 
                className="w-full bg-black/50 border border-gray-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gray-500" 
                placeholder="https://..." 
              />
            </div>
          </div>

          {errorMessage && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm">
              {errorMessage}
            </div>
          )}

          <button 
            disabled={status === 'uploading'}
            type="submit" 
            className="w-full h-12 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-pink-500/25"
          >
            {status === 'uploading' ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Connecting Profile to Sanity CMS...</>
            ) : (
              positionType === 'lead' ? "Connect Lead Profile" : "Connect Member Profile"
            )}
          </button>
        </form>
      </div>
    </main>
  );
};

export default Onboarding;
