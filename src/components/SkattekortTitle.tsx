import { Heading } from "@navikt/ds-react";

type SkattekortTitleProps = {
  ar: number;
  utstedt?: string;
};

const SkattekortTitle = ({ ar, utstedt }: SkattekortTitleProps) => {
  const underTitle = utstedt ? `Utstedt dato ${utstedt}` : "Ingen skattekort utstedt";
  return (
    <div>
      <Heading level="3" size="xlarge">
        Skattekort {ar}
      </Heading>
      <Heading size={"medium"} spacing>
        {underTitle}
      </Heading>
    </div>
  );
};

export default SkattekortTitle;
