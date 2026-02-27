import styles from "./LabelText.module.css";

interface LabelTextProps {
	label: string;
	text: string | number;
	nowrap?: boolean;
}

export default function LabelText(props: Readonly<LabelTextProps>) {
	return (
		<div className={styles["flex-row-gap-sm"]}>
			<div className={styles["text-bold"]}>{props.label}:</div>
			{props.nowrap ? (
				<div className={styles["text-nowrap"]}>{props.text}</div>
			) : (
				props.text
			)}
		</div>
	);
}
