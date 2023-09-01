import { icons } from "lucide-react";

interface Props {
  name: string | null;
  color?: string;
  size?: number;
}
const Icon = ({ name, color, size }: Props) => {
    if(!name) {
        name = 'CircleDollarSign'
    }
  const LucideIcon = icons[name as keyof typeof icons];
  return <LucideIcon color={color} size={size} />;
};

export default Icon;
