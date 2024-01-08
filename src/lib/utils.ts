import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const addCommas = (num: any) =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const removeNonNumeric = (num: any) =>
  num.toString().replace(/[^0-9]/g, "");

  export const obscureEmail = (email:string): string => {
    if(!email) return 'No email'
    const [localPart, domainPart] = email.split('@');
    const domain = domainPart.split('.')
    console.log(domainPart);
    
    const obscuredLocalPart = localPart.slice(0, 2) + '*'.repeat(localPart.length - 2);
    const obscuredDomainPart = domain[0].slice(0, 2) + '*'.repeat(domain[0].length - 2);

    return `${obscuredLocalPart}@${obscuredDomainPart}.${domain[1]}`;
}
