import { useState } from 'react';
import { Shield, Upload, CheckCircle2, Loader2, Crown, Instagram, Github, Linkedin } from 'lucide-react';
import { writeClient } from '../sanityClient';
import { ALLOWED_LEAD_NAMES } from '../hooks/useTeamData';

// Maps each role to its domain
const ROLE_DOMAIN_MAP = {
  'Secretary': 'Board',
  'Joint Secretary': 'Board',
  'Technical Lead': 'Board',
  'Corporate Lead': 'Board',
  'Web Dev Lead': 'Web Development',
  'AI/ML Lead': 'AI/ML',
  'Events Lead': 'Events',
  'Sponsorship Lead': 'Sponsorship',
  'PR Lead': 'Public Relations',
  'Creatives Lead': 'Creatives',
};

const LeadOnboarding = () => {
  const [formData, setFormData] = useState({
    passcode: '',
    name: '',
    role: 'Secretary',
    instagram: '',
    linkedin: '',
    github: ''
  });
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  
  const [status, setStatus] = useState('idle'); // idle, uploading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    
    // 1. Verify Passcode
    const validPasscode = (import.meta.env.VITE_CLUB_PASSCODE || 'DBUGLABS').trim();
    if (formData.passcode.trim() !== validPasscode) {
      setErrorMessage('Invalid passcode! Please contact the admin for the correct code.');
      return;
    }

    // 2. Verify role is in allowed list
    if (!ALLOWED_LEAD_NAMES.includes(formData.role)) {
      setErrorMessage('Invalid role selected.');
      return;
    }

    if (!formData.name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    try {
      setStatus('uploading');

      const domain = ROLE_DOMAIN_MAP[formData.role] || 'Board';

      // Check if someone already exists for this role
      const existingEntry = await writeClient.fetch(
        '*[_type == "boardAndLead" && role == $role][0]', 
        { role: formData.role }
      );

      if (!existingEntry && !file) {
        setErrorMessage('Please upload a profile photo for your first submission.');
        setStatus('idle');
        return;
      }

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
        instagram: formData.instagram || undefined,
        linkedin: formData.linkedin || undefined,
        github: formData.github || undefined
      };

      if (existingEntry) {
        // Update existing entry for this role
        const patch = writeClient.patch(existingEntry._id)
          .set({
            name: formData.name.trim(),
            domain: domain,
            socials: socials
          });
          
        if (imageRef) {
          patch.set({ image: imageRef });
        }
        
        await patch.commit();
      } else {
        // Create new entry
        await writeClient.create({
          _type: 'boardAndLead',
          name: formData.name.trim(),
          role: formData.role,
          domain: domain,
          image: imageRef,
          socials: socials
        });
      }

      setStatus('success');
      setFormData({ passcode: '', name: '', role: 'Secretary', instagram: '', linkedin: '', github: '' });
      setFile(null);
      setFilePreview(null);
      
    } catch (error) {
      console.error(error);
      setErrorMessage('Something went wrong. Please check the API token and try again.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <main className="bg-black min-h-screen pt-32 pb-16 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-gray-900 border border-gray-800 rounded-2xl p-8 text-center space-y-6">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10 text-green-400" />
          </div>
          <h2 className="text-3xl font-bold text-white">Profile Updated!</h2>
          <p className="text-gray-400">Your board/lead profile has been securely uploaded to the CMS and will appear on the Team page shortly.</p>
          <button 
            onClick={() => setStatus('idle')}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity"
          >
            Upload Another Profile
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-black min-h-screen pt-32 pb-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-10">
          <span className="text-purple-400 text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-2">
            <Crown className="w-4 h-4" /> Leadership Portal
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4 text-white">
            Board & <span className="gradient-text">Lead</span> Onboarding
          </h1>
          <p className="text-gray-400">Upload your details to claim your position on the official Team page.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 md:p-8 space-y-6">
          {/* Security Gate */}
          <div className="bg-purple-900/20 border border-purple-500/30 rounded-xl p-5 mb-8">
            <label className="flex items-center gap-2 text-sm font-medium text-purple-300 mb-2">
              <Shield className="w-4 h-4" /> Club Passcode
            </label>
            <input 
              required
              type="password"
              name="passcode"
              value={formData.passcode}
              onChange={handleInputChange}
              className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
              placeholder="Enter the secret passcode"
            />
          </div>

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
                placeholder="Your Full Name" 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Position / Role</label>
              <select 
                name="role" 
                value={formData.role} 
                onChange={handleInputChange} 
                className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-colors appearance-none"
              >
                <optgroup label="Board Members">
                  <option value="Secretary">Secretary</option>
                  <option value="Joint Secretary">Joint Secretary</option>
                  <option value="Technical Lead">Technical Lead</option>
                  <option value="Corporate Lead">Corporate Lead</option>
                </optgroup>
                <optgroup label="Domain Leads">
                  <option value="Web Dev Lead">Web Dev Lead</option>
                  <option value="AI/ML Lead">AI/ML Lead</option>
                  <option value="Events Lead">Events Lead</option>
                  <option value="Sponsorship Lead">Sponsorship Lead</option>
                  <option value="PR Lead">PR Lead</option>
                  <option value="Creatives Lead">Creatives Lead</option>
                </optgroup>
              </select>
            </div>
          </div>

          {/* Auto-derived domain display */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Domain (auto-assigned)</label>
            <input 
              type="text" 
              value={ROLE_DOMAIN_MAP[formData.role] || 'Board'} 
              readOnly 
              className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-3 text-gray-400 cursor-not-allowed" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Profile Picture</label>
            <div className="border-2 border-dashed border-gray-700 rounded-xl p-6 text-center hover:border-purple-500 transition-colors cursor-pointer relative group">
              <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
              {filePreview ? (
                <div className="flex flex-col items-center">
                  <img src={filePreview} alt="Preview" className="w-24 h-24 rounded-full object-cover border-2 border-purple-500 mb-3" />
                  <span className="text-sm text-purple-400">Click to change picture</span>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Upload className="w-8 h-8 text-gray-500 mb-2 group-hover:text-purple-400 transition-colors" />
                  <p className="text-sm text-gray-400">Drag & drop your photo here, or click to browse</p>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-800">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300"><Instagram className="w-4 h-4 text-pink-500"/> Instagram</label>
              <input type="url" name="instagram" value={formData.instagram} onChange={handleInputChange} className="w-full bg-black/50 border border-gray-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-pink-500" placeholder="https://..." />
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300"><Linkedin className="w-4 h-4 text-blue-500"/> LinkedIn</label>
              <input type="url" name="linkedin" value={formData.linkedin} onChange={handleInputChange} className="w-full bg-black/50 border border-gray-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500" placeholder="https://..." />
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300"><Github className="w-4 h-4 text-gray-400"/> GitHub</label>
              <input type="url" name="github" value={formData.github} onChange={handleInputChange} className="w-full bg-black/50 border border-gray-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gray-500" placeholder="https://..." />
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
            className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {status === 'uploading' ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Uploading to CMS...</>
            ) : "Upload Profile"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default LeadOnboarding;
