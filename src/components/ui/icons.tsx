// import { icons } from "lucide-react";

import {
    BadgePercent,
    BadgePlus,
    Banknote,
    Home,
    Landmark,
    PieChart,
    Receipt,
    ShoppingCart,
    Tags,
    Users,
    Utensils,
    Wrench,
    Gavel,
    CarTaxiFront,
    HeartPulse,
    GraduationCap,
    Gift,
    Gem,
    RollerCoaster,
    User,
    CircleDotDashed,
} from "lucide-react"

const icons = {
    ShoppingCart: <ShoppingCart />,
    Utensils: <Utensils />,
    Receipt: <Receipt />,
    Users: <Users />,
    Wrench: <Wrench />,
    Home: <Home />,
    Banknote: <Banknote />,
    Landmark: <Landmark />,
    Tags: <Tags />,
    BadgePercent: <BadgePercent />,
    BadgePlus: <BadgePlus />,
    PieChart: <PieChart />,
    Gavel: <Gavel />,
    CarTaxiFront: <CarTaxiFront />,
    HeartPulse: <HeartPulse />,
    GraduationCap: <GraduationCap />,
    Gift: <Gift />,
    Gem: <Gem />,
    RollerCoaster: <RollerCoaster />,
    User: <User />,
    CircleDotDashed: <CircleDotDashed />,
}
interface Props {
    name: string | null
    color?: string
    size?: number
}

const Icon = ({ name, color, size }: Props) => {
    // const LucideIcon = icons[name as keyof typeof icons]
    // return <LucideIcon color={color} size={size} />
    return icons[name as keyof typeof icons]
}

export default Icon
