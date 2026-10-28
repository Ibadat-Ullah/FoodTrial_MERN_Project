const iconPaths = {
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="18" cy="6" r="0.75" fill="currentColor" stroke="none" />
    </>
  ),
  facebook: <path d="M14 8h3V4h-3a5 5 0 0 0-5 5v3H6v4h3v4h4v-4h3l1-4h-4V9a1 1 0 0 1 1-1Z" />,
  tiktok: <path d="M15 4v10.5a3.5 3.5 0 1 1-3.5-3.5c.35 0 .69.05 1 .15V7.04c-.33-.05-.66-.08-1-.08a7.04 7.04 0 1 0 7.04 7.04V9.7c1.26.9 2.8 1.43 4.46 1.43V7.6A5.6 5.6 0 0 1 17.4 4H15Z" />,
  youtube: <path d="M21.58 7.19a2.98 2.98 0 0 0-2.1-2.1C17.63 4.58 12 4.58 12 4.58s-5.63 0-7.48.5a2.98 2.98 0 0 0-2.1 2.1A31 31 0 0 0 1.92 12s0 2.92.5 4.81a2.98 2.98 0 0 0 2.1 2.1c1.85.51 7.48.51 7.48.51s5.63 0 7.48-.51a2.98 2.98 0 0 0 2.1-2.1c.5-1.89.5-4.81.5-4.81s0-2.92-.5-4.81ZM10 15.3V8.7l5.7 3.3-5.7 3.3Z" />,
  whatsapp: <path d="M12 2a9.9 9.9 0 0 0-8.5 15l-1.1 4.1 4.2-1.1A10 10 0 1 0 12 2Zm0 18.1a8.1 8.1 0 0 1-4.1-1.1l-.3-.2-2.5.7.7-2.4-.2-.3A8.1 8.1 0 1 1 12 20.1Zm4.4-6.1c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7.8c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.2-2.8c-.2-.3.2-.3.6-1 .1-.2 0-.3 0-.5l-.7-1.7c-.2-.4-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3a2.4 2.4 0 0 0-.8 1.8c0 1.1.8 2.2.9 2.4.1.2 1.6 2.5 3.9 3.4 1.4.6 2 .6 2.7.5.4-.1 1.4-.6 1.6-1.2.2-.6.2-1.1.1-1.2-.1-.1-.2-.2-.4-.3Z" />
};

export default function SocialIcon({ name, className = '' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill={name === 'facebook' || name === 'tiktok' || name === 'youtube' || name === 'whatsapp' ? 'currentColor' : 'none'}
      stroke={name === 'instagram' ? 'currentColor' : 'none'}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {iconPaths[name]}
    </svg>
  );
}
