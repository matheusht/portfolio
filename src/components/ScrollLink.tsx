import * as React from 'react';
import { scroller } from 'react-scroll';

interface ScrollLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
}

const ScrollLink = React.forwardRef<HTMLAnchorElement, ScrollLinkProps>(
  ({ to, children, ...props }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      scroller.scrollTo(to, {
        duration: 800,
        smooth: 'easeInOutQuart',
        offset: -80,
      });
    };

    return (
      <a
        href={`#${to}`}
        onClick={handleClick}
        ref={ref}
        {...props}
      >
        {children}
      </a>
    );
  }
);

ScrollLink.displayName = 'ScrollLink';
export default ScrollLink;