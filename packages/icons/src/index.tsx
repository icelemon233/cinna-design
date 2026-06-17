import type { SVGProps } from 'react';

export type CinnaIconProps = SVGProps<SVGSVGElement> & {
  size?: number | string;
};

const resolveSize = (size: number | string | undefined) => size ?? 24;

export function CloudIcon({ size, ...props }: CinnaIconProps) {
  const resolved = resolveSize(size);
  return (
    <svg width={resolved} height={resolved} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7.3 18.2c-2.4 0-4.3-1.7-4.3-3.8 0-1.9 1.5-3.5 3.6-3.8.6-2.8 3-4.8 5.9-4.8 2.8 0 5.2 1.9 5.8 4.6 1.8.4 3.1 1.9 3.1 3.7 0 2.2-2 4-4.5 4H7.3Z"
        fill="currentColor"
      />
      <path
        d="M8.2 12.1c.9-1.3 2.3-2.1 3.9-2.1 1.1 0 2.1.4 2.9 1.1"
        stroke="rgba(255,255,255,.72)"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SparkleIcon({ size, ...props }: CinnaIconProps) {
  const resolved = resolveSize(size);
  return (
    <svg width={resolved} height={resolved} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M12 2.8 14.3 9l6.4 2.3-6.4 2.3L12 20l-2.3-6.4-6.4-2.3L9.7 9 12 2.8Z" fill="currentColor" />
      <path d="M18.7 4.3 19.6 7l2.6.9-2.6 1-.9 2.6-1-2.6-2.6-1 2.6-.9 1-2.7Z" fill="currentColor" opacity=".62" />
    </svg>
  );
}

export function CupcakeIcon({ size, ...props }: CinnaIconProps) {
  const resolved = resolveSize(size);
  return (
    <svg width={resolved} height={resolved} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6 10.4c0-2.5 2.4-4.6 5.8-4.6 3.6 0 6.2 2.1 6.2 4.6 1.3.4 2.1 1.5 2.1 2.8 0 1.7-1.4 3-3.2 3H7.1c-1.8 0-3.2-1.3-3.2-3 0-1.3.8-2.4 2.1-2.8Z"
        fill="currentColor"
      />
      <path d="M7.4 15.7h9.2l-1.1 5H8.5l-1.1-5Z" fill="currentColor" opacity=".72" />
      <path d="M9.2 17.1 9.7 20M12 17.1v2.9M14.8 17.1l-.5 2.9" stroke="rgba(255,255,255,.6)" strokeLinecap="round" />
    </svg>
  );
}

export const CINNA_ICON_LIST = ['cloud', 'sparkle', 'cupcake'] as const;
export type CinnaIconName = (typeof CINNA_ICON_LIST)[number];
