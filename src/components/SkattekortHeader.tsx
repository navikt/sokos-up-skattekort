type SkattekortHeaderProps = {
  ar: number;
  utstedt: string;
};

const SkattekortHeader = (props: SkattekortHeaderProps) => (
  <div>
    <h1>Skattekort {props.ar}</h1>
    <h2>Utstedt dato {props.utstedt}</h2>
  </div>
);

export default SkattekortHeader;
