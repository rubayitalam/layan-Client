import React from 'react';

interface DevBadgeProps {
  label?: string;
}

export const DevBadge: React.FC<DevBadgeProps> = ({ label = 'DEV MOCK' }) => {
  if (process.env.NODE_ENV === 'production') return null;

  return (
    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-amber-500/10 text-amber-600 border border-amber-500/20 uppercase tracking-widest ml-2 pointer-events-none select-none">
      {label}
    </span>
  );
};
