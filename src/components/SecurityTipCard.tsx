
import { ShieldCheck } from 'lucide-react';

interface SecurityTipCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
}

const SecurityTipCard = ({
  title,
  description,
  icon = <ShieldCheck className="h-8 w-8 text-brand-blue" />,
  className = "",
}: SecurityTipCardProps) => {
  return (
    <div className={`security-card ${className}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {icon}
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <p className="mt-1 text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default SecurityTipCard;
