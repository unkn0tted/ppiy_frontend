export function getEmailDomainWhitelist(domainSuffixList?: string) {
  return Array.from(
    new Set(
      (domainSuffixList || "")
        .split(/[\n,]+/)
        .map((domain) => domain.trim().replace(/^@+/, "").toLowerCase())
        .filter(Boolean)
    )
  );
}

export function isEmailDomainAllowed(email: string, whitelist: string[]) {
  const domain = email.split("@")[1]?.trim().toLowerCase();
  return !!domain && whitelist.includes(domain);
}

export function joinEmailAddress(localPart: string, domain: string) {
  const normalizedLocalPart = localPart.trim();
  const normalizedDomain = domain.trim().replace(/^@+/, "").toLowerCase();

  if (!(normalizedLocalPart && normalizedDomain)) return normalizedLocalPart;
  return `${normalizedLocalPart}@${normalizedDomain}`;
}

export function splitEmailAddress(email?: string) {
  const [localPart = "", domain = ""] = (email || "").split("@");
  return {
    localPart,
    domain: domain.trim().toLowerCase(),
  };
}
