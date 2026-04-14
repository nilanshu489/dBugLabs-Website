import { useState } from 'react';
import { Shield, Upload, CheckCircle2, Loader2, Link as LinkIcon, Instagram, Github, Linkedin } from 'lucide-react';
import { writeClient } from '../sanityClient';

const Onboarding = () => {
  const [formData, setFormData] = useState({
    passcode: '',
    name: '',
    role: 'Member',
    domain: 'Web Development',
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
    
    // 1. Verify Passcode locally
    if (formData.passcode !== import.meta.env.VITE_CLUB_PASSCODE) {
      setErrorMessage('Invalid Club Passcode! Please ask a Lead for the secret code.');
      return;
    }

    if (!file) {
      setErrorMessage('Please upload a profile photo.');
      return;
    }

    try {
      setStatus('uploading');

      // 2. Upload Image to Sanity
      const imageAsset = await writeClient.assets.upload('image', file, {
        filename: file.name
      });

      // 3. Create Team Member Document
      await writeClient.create({
        _type: 'teamMember',
        name: formData.name,
        role: formData.role,
        domain: formData.domain,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset._id
          }
        },
        socials: {
          instagram: formData.instagram,
          linkedin: formData.linkedin,
          github: formData.github
        }
      });

      setStatus('success');
      setFormData({ passcode: '', name: '', role: '', domain: 'Web Development', instagram: '', linkedin: '', github: '' });
      setFile(null);
      setFilePreview(null);
      
    } catch (error) {
      console.error(error);
      setErrorMessage('Something went wrong checking the API. Did you add the token correctly?');
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
          <h2 className="text-3xl font-bold text-white">Welcome Aboard!</h2>
          <p className="text-gray-400">Your profile has been securely connected to the CMS and is now live on the website.</p>
          <button 
            onClick={() => setStatus('idle')}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity"
          >
            Add Another Member
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-black min-h-screen pt-32 pb-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-10">
          <span className="text-pink-400 text-sm font-semibold tracking-wider uppercase">Self-Service</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4 text-white">
            Join the <span className="gradient-text">Squad</span>
          </h1>
          <p className="text-gray-400">Fill out your details below to instantly link your profile to the official roster.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 md:p-8 space-y-6">
          {/* Security Gate */}
          <div className="bg-purple-900/20 border border-purple-500/30 rounded-xl p-5 mb-8">
            <label className="flex items-center gap-2 text-sm font-medium text-purple-300 mb-2">
              <Shield className="w-4 h-4" /> Secret Club Passcode
            </label>
            <input 
              required
              type="password"
              name="passcode"
              value={formData.passcode}
              onChange={handleInputChange}
              className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
              placeholder="Enter the secret passcode to upload"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Full Name</label>
              <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-colors" placeholder="John Doe" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Role</label>
              <input type="text" value="Member" readOnly className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-3 text-gray-400 cursor-not-allowed" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Domain / Department</label>
            <select name="domain" value={formData.domain} onChange={handleInputChange} className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-colors appearance-none">
              <option value="Web Development">Web Development</option>
              <option value="AI/ML">AI/ML</option>
              <option value="Creatives">Creatives</option>
              <option value="Sponsorship">Sponsorship</option>
              <option value="Events">Events</option>
              <option value="Public Relations">Public Relations</option>
              <option value="Technical">Technical</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Profile Picture</label>
            <div className="border-2 border-dashed border-gray-700 rounded-xl p-6 text-center hover:border-pink-500 transition-colors cursor-pointer relative group">
              <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
              {filePreview ? (
                <div className="flex flex-col items-center">
                  <img src={filePreview} alt="Preview" className="w-24 h-24 rounded-full object-cover border-2 border-pink-500 mb-3" />
                  <span className="text-sm text-pink-400">Click to change picture</span>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Upload className="w-8 h-8 text-gray-500 mb-2 group-hover:text-pink-400 transition-colors" />
                  <p className="text-sm text-gray-400">Drag & drop your best photo here, or click to browse</p>
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
            className="w-full h-12 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {status === 'uploading' ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Uploading securely to CMS...</>
            ) : "Connect Profile"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default Onboarding;
