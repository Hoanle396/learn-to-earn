declare module 'lenis/react' {
  import { ReactNode } from 'react';
  export interface ReactLenisProps {
    root?: boolean;
    children: ReactNode;
  }
  export function ReactLenis(props: ReactLenisProps): JSX.Element;
}
