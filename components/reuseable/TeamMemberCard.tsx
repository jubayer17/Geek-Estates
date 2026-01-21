import Image from 'next/image';
import { FC } from 'react';

interface TeamMemberCardProps {
  imageSrc: string;
  name: string;
  role: string;
  className?: string;
}

const TeamMemberCard: FC<TeamMemberCardProps> = ({
  imageSrc,
  name,
  role,
  className = '',
}) => {
  return (
    <div 
      className={`
        group flex flex-col overflow-hidden rounded-xl bg-white shadow-md
        transition-all duration-300 hover:shadow-xl hover:-translate-y-1
        w-full max-w-82
        ${className}
      `}
    >
      {/* Image - maintains ~328 × 397.56 ratio (≈ 0.825 aspect ratio) */}
      <div className="relative w-full pt-[121.2%] overflow-hidden bg-gray-100">
        <Image
          src={imageSrc}
          alt={name}
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, 328px"
          priority={false}
        />
      </div>

      {/* Info section */}
      <div className="flex flex-col items-start p-5 text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-1.5">
          {name}
        </h3>
        <p className="text-sm text-gray-600">
          {role}
        </p>
      </div>
    </div>
  );
};

export default TeamMemberCard;