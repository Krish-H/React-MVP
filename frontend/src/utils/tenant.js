export const getTenantFromDomain = () => {
  if (typeof window === 'undefined') return null;

  const host = window.location.hostname;
  const parts = host.split('.');

  // Check if we are on a subdomain (e.g. apollohospital.lvh.me -> 3 parts)
  if (parts.length >= 3) {
    return parts[0];
  }

  return null;
};
