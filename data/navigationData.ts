/**
 * Navigation configurations for SiteHeader and Navbar
 */

import type { NavLink, NavItem, NavGroup } from '@/types';
export type { NavLink, NavItem, NavGroup };

export const LOGIN_URL =
  process.env.NEXT_PUBLIC_LOGIN_URL ||
  'https://medical-tourism-7tbv.onrender.com/login';

export const DEFAULT_PRIMARY_NAV: NavItem[] = [
  {
    label: 'Treatments',
    href: '/treatments',
    sectionId: 'treatments',
    children: [
      { label: 'Orthopaedics & Joint Care', href: '/treatments?specialty=orthopaedics' },
      { label: 'Cosmetic Surgery', href: '/treatments?specialty=cosmetic' },
      { label: 'Dental Implants & Smile Design', href: '/treatments?specialty=dental' },
      { label: 'Eye Care & Refractive Surgery', href: '/treatments?specialty=eye' },
      { label: 'Fertility & IVF', href: '/treatments?specialty=fertility' },
      { label: 'Cardiology & Cardiac Surgery', href: '/treatments?specialty=cardiac' },
    ],
  },
  { label: 'Hospitals', href: '/hospitals' },
  { label: 'Doctors', href: '/doctors' },
  {
    label: 'Care Services',
    href: '/care-services',
    sectionId: 'care-services',
    children: [
      { label: 'How It Works', href: '/how-it-works', description: 'Your journey, step by step' },
      { label: 'Care Coordination', href: '/care-services', description: 'One care manager throughout' },
      { label: 'Travel & Accommodation', href: '/destination', description: 'Visa letters, pickup and stay' },
      { label: 'Recovery & Aftercare', href: '/aftercare', description: "In India and once you're home" },
    ],
  },
  {
    label: 'Login',
    href: LOGIN_URL,
    target: '_blank',
    rel: 'noopener noreferrer',
  },
];

export const DEFAULT_MENU_GROUPS: NavGroup[] = [
  {
    title: 'Explore',
    links: [
      { label: 'Treatments', href: '/treatments' },
      { label: 'Treatment Costs', href: '/treatment-costs' },
      { label: 'Hospitals', href: '/hospitals' },
      { label: 'Doctors', href: '/doctors' },
    ],
  },
  {
    title: 'Your Care Journey',
    links: [
      { label: 'How It Works', href: '/how-it-works' },
      { label: 'Care Coordination', href: '/care-services' },
      { label: 'Destination & Stay', href: '/destination' },
      { label: 'Patient Journeys', href: '/#stories' },
    ],
  },
  {
    title: 'Help & Support',
    links: [
      { label: 'Frequently Asked Questions', href: '/faqs' },
      { label: 'Patient guides', href: '/guides' },
      { label: 'Contact Us', href: '#', isConsultation: true },
      { label: 'Why Choose Us', href: '/why-choose-us' },
      {
        label: 'Login',
        href: LOGIN_URL,
        target: '_blank',
        rel: 'noopener noreferrer',
      },
    ],
  },
];

