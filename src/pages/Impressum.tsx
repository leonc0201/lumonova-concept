import { Nav } from "@/components/lumonova/Nav";
import { Footer } from "@/components/lumonova/Footer";
import { SectionHeading } from "@/components/lumonova/SectionHeading";

const Impressum = () => {
  return (
    <div className="bg-base min-h-screen">
      <Nav />

      <section className="bg-base" style={{ padding: "5rem 0" }}>
        <div className="mx-auto max-w-3xl px-6">
          <SectionHeading
            eyebrow="Rechtliches"
            title="Impressum"
            withAccent
          />

          <div
            className="mt-12 flex flex-col gap-10 text-[15px]"
            style={{ color: "rgba(242,242,242,0.75)", lineHeight: 1.7 }}
          >
            <section>
              <h2
                className="font-bold mb-3 fg-primary"
                style={{ fontSize: 18, letterSpacing: "-0.01em" }}
              >
                Angaben gemäß § 5 TMG
              </h2>
              <p>
                C&amp;L Handels GmbH
                <br />
                Formerweg 12
                <br />
                47877 Willich
                <br />
                Deutschland
              </p>
            </section>

            <section>
              <h2
                className="font-bold mb-3 fg-primary"
                style={{ fontSize: 18, letterSpacing: "-0.01em" }}
              >
                Vertreten durch
              </h2>
              <p>Geschäftsführer: Leon Chen</p>
            </section>

            <section>
              <h2
                className="font-bold mb-3 fg-primary"
                style={{ fontSize: 18, letterSpacing: "-0.01em" }}
              >
                Kontakt
              </h2>
              <p>
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
                Registereintrag
              </h2>
              <p>
                Eintragung im Handelsregister
                <br />
                Registergericht: Amtsgericht Krefeld
                <br />
                Registernummer: HRB 21652
              </p>
            </section>

            <section>
              <h2
                className="font-bold mb-3 fg-primary"
                style={{ fontSize: 18, letterSpacing: "-0.01em" }}
              >
                Umsatzsteuer-ID
              </h2>
              <p>
                Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:
                <br />
                DE 186 039 316
              </p>
            </section>

            <section>
              <h2
                className="font-bold mb-3 fg-primary"
                style={{ fontSize: 18, letterSpacing: "-0.01em" }}
              >
                Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
              </h2>
              <p>
                Leon Chen
                <br />
                Formerweg 12
                <br />
                47877 Willich
              </p>
            </section>

            <section>
              <h2
                className="font-bold mb-3 fg-primary"
                style={{ fontSize: 18, letterSpacing: "-0.01em" }}
              >
                EU-Streitschlichtung
              </h2>
              <p>
                Die Europäische Kommission stellt eine Plattform zur
                Online-Streitbeilegung (OS) bereit:{" "}
                <a
                  href="https://ec.europa.eu/consumers/odr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber hover:underline"
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
                . Unsere E-Mail-Adresse finden Sie oben im Impressum.
              </p>
            </section>

            <section>
              <h2
                className="font-bold mb-3 fg-primary"
                style={{ fontSize: 18, letterSpacing: "-0.01em" }}
              >
                Verbraucherstreitbeilegung
              </h2>
              <p>
                Wir sind nicht bereit oder verpflichtet, an
                Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
                teilzunehmen.
              </p>
            </section>

            <section
              className="rounded-2xl"
              style={{
                background: "rgba(232,160,96,0.06)",
                border: "1px solid rgba(232,160,96,0.15)",
                padding: "1.5rem",
                marginTop: "1rem",
              }}
            >
              <p
                className="text-[13px]"
                style={{ color: "rgba(232,160,96,0.85)", lineHeight: 1.6 }}
              >
                <strong>Hinweis:</strong> Dieses Impressum dient der
                Konzept-Phase. Vor dem Live-Gang muss es durch eine
                juristisch geprüfte Version ersetzt werden.
              </p>
            </section>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Impressum;
