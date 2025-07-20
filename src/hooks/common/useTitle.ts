import { useEffect } from 'react';

export function useTitle(title: string) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = `${title
      .replace('Page', '')
      .replace(/([A-Z])/g, ' $1')
      .trim()} - Admin ECDD`;

    return () => {
      document.title = prevTitle;
    };
  });
}
