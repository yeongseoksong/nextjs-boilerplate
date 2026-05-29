const COMPANY_TOKEN = "%c";

let companyName = "UKNOWN";

export function setCompanyName(name: string) {
  companyName = name;
}

export function t(text: string): string {
  return text.replaceAll(COMPANY_TOKEN, companyName);
}
