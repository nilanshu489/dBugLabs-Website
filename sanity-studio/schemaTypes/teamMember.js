export const teamMemberType = {
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'role',
      title: 'Role',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'domain',
      title: 'Domain',
      type: 'string',
      options: {
        list: [
          { title: 'Board', value: 'Board' },
          { title: 'Web Development', value: 'Web Development' },
          { title: 'AI/ML', value: 'AI/ML' },
          { title: 'Events', value: 'Events' },
          { title: 'Sponsorship', value: 'Sponsorship' },
          { title: 'Public Relations', value: 'Public Relations' },
          { title: 'Creatives', value: 'Creatives' },
          { title: 'Technical', value: 'Technical' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true, // Allows user to adjust crop
      },
    },
    {
      name: 'imageScale',
      title: 'Image Zoom Scale (Optional)',
      type: 'number',
      description: 'Enter a number (like 1.25) to zoom the image locally inside the circle, or leave blank.',
    },
    {
      name: 'imagePosition',
      title: 'Image Focus Position (Optional)',
      type: 'string',
      description: 'Enter a value like "center 80%" or "object-left" to adjust framing, or leave blank.',
    },
    {
      name: 'socials',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        { name: 'linkedin', title: 'LinkedIn URL', type: 'url' },
        { name: 'github', title: 'GitHub URL', type: 'url' },
        { name: 'twitter', title: 'Twitter URL', type: 'url' },
        { name: 'instagram', title: 'Instagram URL', type: 'url' },
        { name: 'email', title: 'Email Address', type: 'string' },
      ],
    },
  ],
};
