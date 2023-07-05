// import skattekortdata from './skattekortFrikort.json'
// import skattekortdata from './skattekortMedTabelltrekk.json'
// import skattekortdata from './skattekortMedTilleggsopplysning.json'
import skattekortdata from './tomtSvar.json'
// import skattekortdata from './ikkeSkattekort.json';

export default [
  {
    url: "/skattekort-api/api/v1/hent-skattekort",
    method: "post",
    response: () => skattekortdata
  },
];
