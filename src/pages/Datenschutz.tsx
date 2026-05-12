import { Nav } from "@/components/lumonova/Nav";
import { Footer } from "@/components/lumonova/Footer";
import { SectionHeading } from "@/components/lumonova/SectionHeading";

const Datenschutz = () => {
  return (
    <div className="bg-base min-h-screen">
      <Nav />

      <section className="bg-base" style={{ padding: "5rem 0" }}>
        <div className="mx-auto max-w-3xl px-6">
          <SectionHeading
            eyebrow="Rechtliches"
            title="Datenschutzerklärung"
            withAccent
          />

          <div
            className="mt-12 flex flex-col gap-10 text-[15px]"
            style={{ color: "rgba(242,242,242,0.75)", lineHeight: 1.7 }}
          >
            <section
              className="rounded-2xl"
              style={{
                background: "rgba(232,160,96,0.06)",
                border: "1px solid rgba(232,160,96,0.15)",
                padding: "1.5rem",
              }}
            >
              <p
                className="text-[13px]"
                style={{ color: "rgba(232,160,96,0.85)", lineHeight: 1.6 }}
              >
                <strong>Hinweis:</strong> Diese Datenschutzerklärung dient
                der Konzept-Phase. Vor dem Live-Gang muss sie durch eine
                juristisch geprüfte Version ersetzt werden, die alle
                tatsächlich eingesetzten Tools und Verarbeitungen exakt
                abbildet (z.B. konkrete Tracking-Tools, Newsletter,
                Shop-System, Zahlungsdienstleister).
              </p>
            </section>

            <section>
              <h2
                className="font-bold mb-3 fg-primary"
                style={{ fontSize: 18, letterSpacing: "-0.01em" }}
              >
                1. Verantwortlicher
              </h2>
              <p>
                Verantwortlich für die Datenverarbeitung auf dieser Website
                im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
              </p>
              <p style={{ marginTop: "0.75rem" }}>
                C&amp;L Handels GmbH
                <br />
                Formerweg 12
                <br />
                47877 Willich
                <br />
                Deutschland
                <br />
                <br />
                Geschäftsführer: Leon Chen
                <br />
                Telefon: +49 (0) 2154 95365-30
                <br />
                E-Mail:{" "}
                <a
                  href="mailto:support@lumo-nova.de"
                  className="text-amber hover:underline"
                >
                  support@lumo-nova.de
                </a>
              </p>
            </section>

            <section>
              <h2
                className="font-bold mb-3 fg-primary"
                style={{ fontSize: 18, letterSpacing: "-0.01em" }}
              >
                2. Erhebung und Speicherung personenbezogener Daten
              </h2>
              <p>
                Beim Aufruf dieser Website werden durch unseren Hosting-Anbieter
                automatisch Informationen in einer sogenannten Server-Log-Datei
                gespeichert. Dies sind:
              </p>
              <ul
                className="list-disc pl-6 mt-3 flex flex-col gap-1"
                style={{ color: "rgba(242,242,242,0.65)" }}
              >
                <li>Browsertyp und Browserversion</li>
                <li>Verwendetes Betriebssystem</li>
                <li>Referrer-URL</li>
                <li>Hostname des zugreifenden Rechners</li>
                <li>Uhrzeit der Serveranfrage</li>
                <li>IP-Adresse (gekürzt / anonymisiert)</li>
              </ul>
              <p style={{ marginTop: "0.75rem" }}>
                Eine Zusammenführung dieser Daten mit anderen Datenquellen
                erfolgt nicht. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO
                (berechtigtes Interesse an der technischen Bereitstellung der
                Seite und an der Sicherheit unserer IT-Systeme).
              </p>
            </section>

            <section>
              <h2
                className="font-bold mb-3 fg-primary"
                style={{ fontSize: 18, letterSpacing: "-0.01em" }}
              >
                3. Hosting (Vercel)
              </h2>
              <p>
                Diese Website wird bei der Vercel Inc., 340 S Lemon Ave #4133,
                Walnut, CA 91789, USA gehostet. Beim Aufruf der Seite werden
                technisch notwendige Daten an Vercel übermittelt. Die
                Verarbeitung erfolgt auf Grundlage unseres berechtigten
                Interesses an einer technisch fehlerfreien Darstellung (Art. 6
                Abs. 1 lit. f DSGVO). Mit Vercel besteht ein
                Auftragsverarbeitungsvertrag.
              </p>
            </section>

            <section>
              <h2
                className="font-bold mb-3 fg-primary"
                style={{ fontSize: 18, letterSpacing: "-0.01em" }}
              >
                4. Externe Schriften (Google Fonts)
              </h2>
              <p>
                Zur einheitlichen Darstellung von Schriftarten verwendet diese
                Seite die Web-Schriften „Inter" sowie „Material Symbols
                Outlined", die von Google LLC (1600 Amphitheatre Parkway,
                Mountain View, CA 94043, USA) bereitgestellt werden. Beim
                Aufruf einer Seite lädt Ihr Browser die benötigten Schriften
                in den Browsercache, um Texte korrekt anzuzeigen. Hierbei wird
                Ihre IP-Adresse an Google übertragen.
              </p>
              <p style={{ marginTop: "0.75rem" }}>
                Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
                Interesse an einer einheitlichen Darstellung). Weitere
                Informationen:{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber hover:underline"
                >
                  https://policies.google.com/privacy
                </a>
                .
              </p>
            </section>

            <section>
              <h2
                className="font-bold mb-3 fg-primary"
                style={{ fontSize: 18, letterSpacing: "-0.01em" }}
              >
                5. Cookies
              </h2>
              <p>
                Diese Website setzt aktuell keine Tracking- oder
                Marketing-Cookies. Es können technisch notwendige Cookies zum
                Einsatz kommen, um die Funktionsfähigkeit der Seite
                sicherzustellen.
              </p>
            </section>

            <section>
              <h2
                className="font-bold mb-3 fg-primary"
                style={{ fontSize: 18, letterSpacing: "-0.01em" }}
              >
                6. Kontaktaufnahme
              </h2>
              <p>
                Wenn Sie uns per E-Mail kontaktieren, werden Ihre Angaben zur
                Bearbeitung Ihrer Anfrage und für den Fall von Anschlussfragen
                bei uns gespeichert. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b
                DSGVO (Vertragsanbahnung) bzw. Art. 6 Abs. 1 lit. f DSGVO
                (berechtigtes Interesse an der Beantwortung Ihrer Anfrage).
              </p>
            </section>

            <section>
              <h2
                className="font-bold mb-3 fg-primary"
                style={{ fontSize: 18, letterSpacing: "-0.01em" }}
              >
                7. Ihre Rechte
              </h2>
              <p>Sie haben jederzeit das Recht auf:</p>
              <ul
                className="list-disc pl-6 mt-3 flex flex-col gap-1"
                style={{ color: "rgba(242,242,242,0.65)" }}
              >
                <li>Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO)</li>
                <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
                <li>Löschung Ihrer Daten (Art. 17 DSGVO)</li>
                <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
                <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
              </ul>
              <p style={{ marginTop: "0.75rem" }}>
                Bitte wenden Sie sich für die Wahrnehmung Ihrer Rechte an die
                oben unter Punkt 1 genannten Kontaktdaten. Außerdem haben Sie
                das Recht auf Beschwerde bei einer Datenschutz-Aufsichtsbehörde.
              </p>
            </section>

            <section>
              <h2
                className="font-bold mb-3 fg-primary"
                style={{ fontSize: 18, letterSpacing: "-0.01em" }}
              >
                8. Änderungen dieser Datenschutzerklärung
              </h2>
              <p>
                Wir behalten uns vor, diese Datenschutzerklärung anzupassen,
                wenn sich die Rechtslage oder unsere Verarbeitung ändert. Es
                gilt die jeweils auf dieser Seite veröffentlichte Fassung.
              </p>
              <p
                style={{
                  marginTop: "1rem",
                  color: "rgba(242,242,242,0.45)",
                  fontSize: 13,
                }}
              >
                Stand: Mai 2026
              </p>
            </section>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Datenschutz;
