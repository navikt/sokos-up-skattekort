# sokos-op-skattekort

Brukes som utgangspunkt for å opprette nye mikrofrontends i Økonomiportalen.

NB! Navngi følgende: `sokos-op-appName` eg: `sokos-op-skattekort`

## Tilpass repo-et

1. Kjør `chmod 755 setupTemplate.sh`
2. Kjør:
   ```
   ./setupTemplate.sh
   ```
3. Slett `setupTemplate.sh` hvis du er ferdig med endre navn på prosjektet

4. Sett riktig namespace og team i nais manifestene, de ligger i mappen under `nais/<cluster>`
5. Velg riktig ingress til appen i nais.yaml. Ingressen bør være `https://okonomiportalen.intern.dev.nav.no/appNavn`

# Kom i gang

1. Installere [Node.js](https://nodejs.dev/en/)
2. Installer [pnpm](https://pnpm.io/)
3. Installere dependencies `pnpm intall`
4. Start appen lokalt `pnpm run dev`
5. Appen nås på http://localhost:5173

# Henvendelser

Spørsmål knyttet til koden eller prosjektet kan stilles som issues her på Github.
Interne henvendelser kan sendes via Slack i kanalen #po-utbetaling.

Request Id: bb9a5386-5706-4409-84a9-7f2305696300
Correlation Id: 75245f74-2ce6-4741-8730-2bdbe250e92e
Timestamp: 2023-11-14T08:53:33Z
Message: AADSTS50105: Your administrator has configured the application dev-gcp:okonomi:sokos-op-fasade ('2ec3a97b-c63e-4ab1-8b50-bf2987084245') to block users unless they are specifically granted ('assigned') access to the application. The signed in user 'F_Z994231.E_Z994231@trygdeetaten.no' is blocked because they are not a direct member of a group with access, nor had access directly assigned by an administrator. Please contact your administrator to assign access to this application.
