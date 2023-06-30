import { Heading } from "@navikt/ds-react";
import styles from "../pages/Skattekort.module.css";

type SkattekortTitleProps = {
  ar: number;
  utstedt: string;
};

const SkattekortTitle = (props: SkattekortTitleProps) => (
  <div className={styles.rightTitle}>
    <Heading level="3" size="xlarge">
      Skattekort {props.ar}
    </Heading>
    <Heading size={"medium"} spacing>
      Utstedt dato {props.utstedt}
    </Heading>
  </div>
);

export default SkattekortTitle;
