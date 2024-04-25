import { HelpText } from "@navikt/ds-react";

const SearchHelp = () => (
  <HelpText title="a11y-title" placement="left" strategy="fixed">
    <p>
      <strong>Informasjon om Skattekort:</strong>
    </p>
    <p>
      Skattekort viser skattekortet slik det er mottatt fra Skatteetaten. For å se hvilken del av skattekortet som vil
      bli, eller er, brukt i en beregning må menypunktet "Skatt og trekk" og undermenypunkt "eSkattekort - Søk" i
      Økonomiportal benyttes.
    </p>
  </HelpText>
);

export default SearchHelp;
