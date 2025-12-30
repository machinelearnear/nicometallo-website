export interface NavLink {
  name: string;
  url: string;
}

export interface SocialMedia {
  name: string;
  url: string;
}

export interface SrConfig {
  origin?: 'top' | 'right' | 'bottom' | 'left';
  distance?: string;
  duration?: number;
  delay?: number;
  rotate?: { x: number; y: number; z: number };
  opacity?: number;
  scale?: number;
  easing?: string;
  mobile?: boolean;
  reset?: boolean;
  useDelay?: 'always' | 'onload' | 'never';
  viewFactor?: number;
  viewOffset?: { top: number; right: number; bottom: number; left: number };
}

export const config = {
  email: 'hello@nicometallo.com',

  socialMedia: [
    {
      name: 'GitHub',
      url: 'https://github.com/nicometallo',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/nicometallo',
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/nicometallo',
    },
    {
      name: 'Linkedin',
      url: 'https://linkedin.com/in/nicometallo',
    },
    {
      name: 'Codepen',
      url: 'https://codepen.io/nicometallo',
    },
  ] as SocialMedia[],

  navLinks: [
    {
      name: 'About',
      url: '/#about',
    },
    {
      name: 'Experience',
      url: '/#jobs',
    },
    {
      name: 'Work',
      url: '/#projects',
    },
    {
      name: 'Contact',
      url: '/#contact',
    },
  ] as NavLink[],

  colors: {
    green: '#64ffda',
    navy: '#0a192f',
    darkNavy: '#020c1b',
  },

  srConfig: (delay = 200, viewFactor = 0.25): SrConfig => ({
    origin: 'bottom',
    distance: '20px',
    duration: 500,
    delay,
    rotate: { x: 0, y: 0, z: 0 },
    opacity: 0,
    scale: 1,
    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    mobile: true,
    reset: false,
    useDelay: 'always',
    viewFactor,
    viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
  }),
};
