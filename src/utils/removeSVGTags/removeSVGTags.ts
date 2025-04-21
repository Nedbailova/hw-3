export const removeSVGTags = (html: string): string => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    doc.querySelectorAll('svg').forEach((svg) => svg.remove());
    return doc.body.innerHTML;
  };