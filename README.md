# sokos-up-skattekort

Brukes som utgangspunkt for å opprette nye server-side mikrofrontends i Utbetalingsportalen.

NB! Navngi følgende: `sokos-up-appNavn`, f.eks: `sokos-up-venteregister`

## Tilpass repo-et

1. Kjør `chmod 755 setupTemplate.sh`
2. Kjør:

   ```bash
   ./setupTemplate.sh
   ```

3. Kun spesifiser navnet på applikasjonen som skal stå etter sokos-up-`appNavn`. Hvis du ønsker `sokos-up-venteregister` så skriv inn bare `venteregister`.
4. Slett `setupTemplate.sh` hvis du er ferdig med endre navn på prosjektet
5. Templaten kommer med [Playwright](https://playwright.dev/) installert. Endre følgende filer: [playwright.config.ts](playwright.config.ts) og [accessibility.spec.ts](playwright-tests/accessibility.spec.ts). Playwright testene kan kjøres med kommandoen `pnpm exec playwright test`
6. Sett riktig namespace og team i nais manifestene, de ligger i mappen under `nais/<cluster>`
7. Sett riktig `accessPolicy`
   ```
   accessPolicy:
     inbound:
       rules:
         - application: sokos-utbetalingsportalen
   ```
8. Repoet må legges til i [Nais Console](https://console.nav.cloud.nais.io/). Det finner du ved å gå inn på team Økonomi og repositories nest nederst til venstre.

## Kom i gang

1. Installere [Node.js](https://nodejs.dev/en/)
2. Installer [pnpm](https://pnpm.io/)
3. Installere dependencies `pnpm install`
4. Start appen med to følgende måter:

- Mot [hono.dev](https://hono.dev/) mock server -> `pnpm run mock` så deretter starte frontend `pnpm run dev`
- Mot en backend ????

5. Appen nås på [http://localhost:4321](http://localhost:4321)

## Design

Det finnes et utkast til en designguide kan man basere seg på: [Kjerneoppsett Utbetalingsportalen](https://navno-my.sharepoint.com/:o:/g/personal/julie_utgard_nav_no/EtV6P-sYimZNsACTYqZmSbsBLeSlsvc6PP2svso_H09dZA?e=KSY5SO)
