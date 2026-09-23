'use client';

import { ProgressProvider } from '@bprogress/next/app';

type TopLoaderProps = {
  children: React.ReactNode;
  height?: string;
};

export function TopLoader({
  children,
  height,
}: TopLoaderProps) {
  return (
    <ProgressProvider
      height={height}
      color="var(--jelly-body-mid)"
      options={{ showSpinner: false }}
      shallowRouting
    >
      {children}
    </ProgressProvider>
  );
}
