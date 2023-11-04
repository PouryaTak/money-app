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
} from "lucide-react"

interface Props {
    name: string | null
    color?: string
    size?: number
}

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
    PieChart: <PieChart/>,
}
const Icon = ({ name, color, size }: Props) => {
    if (!name) {
        name = "CircleDollarSign"
    }
    // const LucideIcon = icons[name as keyof typeof icons]
    // return <LucideIcon color={color} size={size} />
    return icons[name as keyof typeof icons]
}

export default Icon
