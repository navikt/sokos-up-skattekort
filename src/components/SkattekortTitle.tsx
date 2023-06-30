import { Heading } from "@navikt/ds-react";

type SkattekortTitleProps = {
  ar: number;
  utstedt: string;
};

const SkattekortTitle = (props: SkattekortTitleProps) => (
  <div>
    <Heading level="3" size="xlarge">
      Skattekort {props.ar}
    </Heading>
    <Heading size={"medium"} spacing>
      Utstedt dato {props.utstedt}
    </Heading>
  </div>
);

export default SkattekortTitle;
