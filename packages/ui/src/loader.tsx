'use client';

import { ProgressProvider } from '@bprogress/next/app';

type TopLoaderProps = {
  children: React.ReactNode;
  height?: string;
};

const TopLoader = ({
  children,
  height = '4px',
}: TopLoaderProps) => {
  return (
    <ProgressProvider
      height={height}
      color="var(--navigation-progress-color, var(--primary))"
      options={{ showSpinner: false }}
      shallowRouting
    >
      {children}
    </ProgressProvider>
  );
};
 
export default TopLoader;
