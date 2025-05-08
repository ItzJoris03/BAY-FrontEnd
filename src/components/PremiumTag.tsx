import { Star } from "lucide-react";
import React from "react";

const PremiumTag: React.FC<{ text?: string }> = ({ text = 'Premium' }) => (
    <div className="absolute top-2 left-2 flex gap-2 bg-yellow-500 text-white text-xs font-semibold px-2 py-1 z-10 rounded shadow">
        <Star size={16} />
        <span>{text}</span>
    </div>
);

export default PremiumTag;