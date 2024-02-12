// import skattekortdata from './ikkeSkattekort.json'
// import skattekortdata from './navnUtenSkattekort.json'
// import skattekortdata from './skattekortFrikort.json'
import skattekortdata from './skattekortMedTabelltrekk.json'
// import skattekortdata from './skattekortMedTilleggsopplysning.json'
// import skattekortdata from './skattekortUtenNavn.json'
// import skattekortdata from './tomtSvar.json'
export default [
  {
    url: "/skattekort-api/api/v1/hent-skattekort",
    response: () => skattekortdata
  },
];
