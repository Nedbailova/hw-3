export const editLink = (url: string | null | undefined): string => {
    if (!url) return '';
    const parts = url.split('/');
    return parts[2];
  }