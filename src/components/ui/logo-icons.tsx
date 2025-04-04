import { type SVGProps } from "react";

export function CompTIAIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fill="#FF0000" d="M60 0L120 30V90L60 120L0 90V30L60 0Z"/>
      <path fill="#FFFFFF" d="M30 45h60v30H30z"/>
    </svg>
  );
}

export function OffSecIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="60" cy="60" r="60" fill="#000000"/>
      <path fill="#FFFFFF" d="M40 40h40v40H40z"/>
    </svg>
  );
}

export function HackTheBoxIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="120" height="120" fill="#9FEF00"/>
      <path fill="#000000" d="M30 30h60v60H30z"/>
    </svg>
  );
}

export function CiscoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fill="#049FD9" d="M0 0h120v120H0z"/>
      <path fill="#FFFFFF" d="M20 50h80v20H20z"/>
    </svg>
  );
}

export function ISC2Icon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="60" cy="60" r="60" fill="#F4B51E"/>
      <path fill="#000000" d="M40 40h40v40H40z"/>
    </svg>
  );
}

export function ECCouncilIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="120" height="120" fill="#C01818"/>
      <circle cx="60" cy="60" r="30" fill="#FFFFFF"/>
    </svg>
  );
}

