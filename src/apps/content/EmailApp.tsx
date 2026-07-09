import { useState } from "react";
import { useTranslation } from "react-i18next";
import { getEmailAddress } from "../../utils/obfuscateEmail";

export function EmailApp() {
  const { t } = useTranslation();
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  const reveal = () => setRevealed(true);

  const copy = async () => {
    const email = getEmailAddress();
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const email = revealed ? getEmailAddress() : null;

  return (
    <div className="space-y-3 text-sm leading-relaxed">
      <p>{t("apps.email.intro")}</p>
      {!revealed ? (
        <button type="button" className="default" onClick={reveal}>
          {t("apps.email.reveal")}
        </button>
      ) : (
        <div className="space-y-2" aria-live="polite">
          <p>
            <a href={`mailto:${email}`}>{email}</a>
          </p>
          <button type="button" className="default" onClick={copy}>
            {copied ? t("apps.email.copied") : t("apps.email.copy")}
          </button>
        </div>
      )}
    </div>
  );
}
