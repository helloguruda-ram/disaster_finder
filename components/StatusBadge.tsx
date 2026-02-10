
import React from 'react';
import { DisasterType } from '../types';

interface StatusBadgeProps {
  type: DisasterType;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ type }) => {
  const configs = {
    [DisasterType.FIRE]: {
      label: 'Wildfire Detected',
      bg: 'bg-red-500/10',
      text: 'text-red-400',
      border: 'border-red-500/50',
      dot: 'bg-red-500'
    },
    [DisasterType.TSUNAMI]: {
      label: 'Tsunami Detected',
      bg: 'bg-blue-500/10',
      text: 'text-blue-400',
      border: 'border-blue-500/50',
      dot: 'bg-blue-500'
    },
    [DisasterType.NORMAL]: {
      label: 'Normal Patterns',
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-400',
      border: 'border-emerald-500/50',
      dot: 'bg-emerald-500'
    },
    [DisasterType.UNKNOWN]: {
      label: 'Scan Required',
      bg: 'bg-slate-500/10',
      text: 'text-slate-400',
      border: 'border-slate-500/50',
      dot: 'bg-slate-500'
    }
  };

  const config = configs[type];

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${config.bg} ${config.text} ${config.border} text-sm font-semibold`}>
      <span className={`w-2 h-2 rounded-full animate-pulse ${config.dot}`} />
      {config.label}
    </div>
  );
};

export default StatusBadge;
