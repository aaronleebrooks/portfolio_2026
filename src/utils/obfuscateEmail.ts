/** Decodes the contact email at interaction time (not stored as plain text in markup). */
export function getEmailAddress(): string {
  const user = atob("VGhlQWFyb25MZWVCcm9va3M=");
  const domain = atob("Z21haWwuY29t");
  return `${user}@${domain}`;
}
