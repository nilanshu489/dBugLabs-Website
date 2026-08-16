import { useEffect, useState } from 'react';
import { Shield, Upload, CheckCircle2, Loader2, UserCheck } from 'lucide-react';
import { Instagram, Github, Linkedin } from '../components/common/BrandIcons';
import { writeClient } from '../sanityClient';
import { ALLOWED_NAMES, BOARD_ROLES } from '../data/roster';
import { domains } from '../data/domains';
import { shortDomain } from '../data/domainTheme';
import { Button, Card, Container, PageHeader } from '../components/ui';
import cx from '../lib/cx';

const ROLE_OPTIONS = [...BOARD_ROLES, 'Mentor', 'Lead', 'Associate', 'Member'];

/** Derived from the shared domain data so the CMS values can never drift. */
const DOMAIN_GROUPS = Object.values(domains).map((vertical) => ({
  label: vertical.title,
  options: vertical.subdomains.map((subdomain) => ({
    value: subdomain.name,
    label: shortDomain(subdomain.name),
  })),
}));

const SOCIAL_FIELDS = [
  { name: 'instagram', label: 'Instagram', icon: Instagram, tone: 'text-pink-500' },
  { name: 'linkedin', label: 'LinkedIn', icon: Linkedin, tone: 'text-blue-500' },
  { name: 'github', label: 'GitHub', icon: Github, tone: 'text-gray-400' },
];

const EMPTY_FORM = {
  passcode: '',
  name: '',
  role: 'Member',
  domain: 'Web Development',
  instagram: '',
  linkedin: '',
  github: '',
  twitter: '',
};

const Onboarding = () => {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [status, setStatus] = useState('idle'); // idle | uploading | success | error
  const [errorMessage, setErrorMessage] = useState('');

  const isBoardRole = BOARD_ROLES.includes(formData.role) || formData.role === 'Mentor';

  // Object URLs are held by the browser until explicitly released.
  useEffect(
    () => () => {
      if (filePreview) URL.revokeObjectURL(filePreview);
    },
    [filePreview],
  );

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name !== 'role') {
      setFormData((prev) => ({ ...prev, [name]: value }));
      return;
    }

    // Board seats and Mentor have no specific domain; leaving/entering one fixes it up.
    setFormData((prev) => ({
      ...prev,
      role: value,
      domain: BOARD_ROLES.includes(value)
        ? 'Board'
        : value === 'Mentor'
          ? 'Mentor'
          : prev.domain === 'Board' || prev.domain === 'Mentor'
            ? 'Web Development'
            : prev.domain,
    }));
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setFilePreview(URL.createObjectURL(selectedFile));
  };

  const resetForm = () => {
    setFormData(EMPTY_FORM);
    setFile(null);
    setFilePreview(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');

    const cleanCode = (value) => (value || '').replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    const validPasscodes = ['DBUGLABS', 'DBUG', 'DBUGLAB', cleanCode(import.meta.env.VITE_CLUB_PASSCODE)].filter(Boolean);

    if (!validPasscodes.includes(cleanCode(formData.passcode))) {
      setErrorMessage('Invalid Club Passcode! Please ask a Lead or Admin for the secret code.');
      return;
    }

    const inputName = formData.name.trim();
    if (!inputName) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    const { role } = formData;
    const isBoardOrLead = BOARD_ROLES.includes(role) || role === 'Mentor' || role === 'Lead' || role === 'Associate';

    try {
      setStatus('uploading');

      let imageRef = null;
      if (file) {
        try {
          const asset = await writeClient.assets.upload('image', file, { filename: file.name });
          imageRef = { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
        } catch (uploadError) {
          console.error('Sanity image upload error:', uploadError);
          setErrorMessage(
            'Photo upload failed. Please ensure https://dbug-labs.vercel.app is added to CORS Origins in the Sanity Dashboard (sanity.io/manage → Project ueahhip3 → API → CORS Origins, with "Allow Credentials" checked).',
          );
          setStatus('idle');
          return;
        }
      }

      const socials = {
        instagram: formData.instagram.trim(),
        linkedin: formData.linkedin.trim(),
        github: formData.github.trim(),
        twitter: formData.twitter.trim(),
      };

      const docType = isBoardOrLead ? 'boardAndLead' : 'teamMember';

      // Board seats are matched on the seat itself as well as the name, so a
      // handover replaces the previous holder instead of creating a duplicate.
      const existing = BOARD_ROLES.includes(role)
        ? await writeClient.fetch(
            '*[_type == "boardAndLead" && (role == $role || lower(name) == lower($name))][0]',
            { role, name: inputName },
          )
        : await writeClient.fetch(`*[_type == "${docType}" && lower(name) == lower($name)][0]`, {
            name: inputName,
          });

      if (!existing && !imageRef) {
        setErrorMessage('Please upload a profile photo for your profile.');
        setStatus('idle');
        return;
      }

      // Match the canonical spelling of a known member so repeat submissions
      // update one document rather than accumulating near-duplicates.
      const name = isBoardOrLead
        ? inputName
        : (ALLOWED_NAMES.find((n) => n.toLowerCase() === inputName.toLowerCase()) ?? inputName);

      const domain = BOARD_ROLES.includes(role) ? 'Board' : role === 'Mentor' ? 'Mentor' : formData.domain;

      if (existing) {
        const patch = writeClient.patch(existing._id).set({ name, role, domain, socials });
        if (imageRef) patch.set({ image: imageRef });
        await patch.commit();
      } else {
        await writeClient.create({ _type: docType, name, role, domain, image: imageRef, socials });
      }

      setStatus('success');
      resetForm();
    } catch (error) {
      console.error('Submission error:', error);
      setErrorMessage(
        error?.message
          ? `Sanity Error: ${error.message}`
          : 'Failed to connect to Sanity CMS. Please verify your internet connection or passcode.',
      );
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <main className="flex min-h-screen items-center justify-center px-4 pt-32 pb-16">
        <Card className="w-full max-w-md space-y-6 p-8 text-center shadow-2xl shadow-purple-500/10">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-green-500/40 bg-green-500/20">
            <CheckCircle2 className="h-10 w-10 text-green-400" />
          </div>
          <h1 className="text-3xl font-bold text-white">Profile Connected!</h1>
          <p className="text-gray-400">
            Your profile has been saved to Sanity CMS and is now live on the website roster.
          </p>
          <Button fullWidth onClick={() => setStatus('idle')}>
            Add / Update Another Profile
          </Button>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-32 pb-16">
      <Container width="narrow">
        <PageHeader
          eyebrow="Official Roster"
          title={
            <>
              Team <span className="gradient-text">Onboarding</span>
            </>
          }
          description="Connect or update your official dBug Labs profile directly in the CMS."
          className="mb-10"
        />

        <Card as="form" onSubmit={handleSubmit} className="space-y-6 p-6 md:p-8">
          {/* Passcode */}
          <div className="rounded-xl border border-purple-500/30 bg-purple-900/20 p-5">
            <label
              htmlFor="passcode"
              className="mb-2 flex items-center gap-2 text-sm font-medium text-purple-300"
            >
              <Shield className="h-4 w-4" /> Secret Club Passcode
            </label>
            <input
              id="passcode"
              name="passcode"
              type="password"
              required
              value={formData.passcode}
              onChange={handleInputChange}
              placeholder="Enter passcode (ask a lead if you need it)"
              className="input-field"
            />
          </div>

          {/* Identity */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-300">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g. John Doe"
                className="input-field"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="role"
                className="flex items-center gap-1.5 text-sm font-medium text-gray-300"
              >
                <UserCheck className="h-4 w-4 text-pink-400" /> Position / Role
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="input-field cursor-pointer"
              >
                {ROLE_OPTIONS.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Domain */}
          <div className="space-y-2">
            <label htmlFor="domain" className="text-sm font-medium text-gray-300">
              Domain / Department
            </label>
            <select
              id="domain"
              name="domain"
              value={formData.domain}
              onChange={handleInputChange}
              disabled={isBoardRole}
              className={cx('input-field', isBoardRole ? 'cursor-not-allowed opacity-60' : 'cursor-pointer')}
            >
              {isBoardRole ? (
                <option value="Board">Board</option>
              ) : (
                DOMAIN_GROUPS.map((group) => (
                  <optgroup key={group.label} label={group.label}>
                    {group.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </optgroup>
                ))
              )}
            </select>
          </div>

          {/* Photo */}
          <div className="space-y-2">
            <label htmlFor="photo" className="text-sm font-medium text-gray-300">
              Profile Picture (optional if updating)
            </label>
            <div className="group relative rounded-xl border-2 border-dashed border-gray-700 p-6 text-center transition-colors hover:border-pink-500">
              <input
                id="photo"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
              />
              {filePreview ? (
                <div className="flex flex-col items-center">
                  <img
                    src={filePreview}
                    alt="Selected profile preview"
                    className="mb-3 h-24 w-24 rounded-full border-2 border-pink-500 object-cover shadow-lg shadow-pink-500/20"
                  />
                  <span className="text-sm text-pink-400">Click or drag to change picture</span>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Upload className="mb-2 h-8 w-8 text-gray-500 transition-colors group-hover:text-pink-400" />
                  <p className="text-sm text-gray-400">
                    Drag &amp; drop your best photo here, or click to browse
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Socials */}
          <div className="grid grid-cols-1 gap-4 border-t border-gray-800 pt-4 md:grid-cols-3">
            {SOCIAL_FIELDS.map(({ name, label, icon: Icon, tone }) => (
              <div key={name} className="space-y-2">
                <label
                  htmlFor={name}
                  className="flex items-center gap-2 text-sm font-medium text-gray-300"
                >
                  <Icon className={cx('h-4 w-4', tone)} /> {label}
                </label>
                <input
                  id={name}
                  name={name}
                  type="url"
                  value={formData[name]}
                  onChange={handleInputChange}
                  placeholder="https://..."
                  className="input-field text-sm"
                />
              </div>
            ))}
          </div>

          {errorMessage && (
            <p
              role="alert"
              className="rounded-lg border border-red-500/50 bg-red-500/10 px-4 py-3 text-sm text-red-400"
            >
              {errorMessage}
            </p>
          )}

          <Button
            type="submit"
            fullWidth
            disabled={status === 'uploading'}
            icon={status === 'uploading' ? Loader2 : undefined}
            className={status === 'uploading' ? '[&_svg]:animate-spin' : undefined}
          >
            {status === 'uploading' ? 'Connecting Profile to Sanity CMS…' : 'Connect Profile'}
          </Button>
        </Card>
      </Container>
    </main>
  );
};

export default Onboarding;
