import { Alert, type AlertProps } from "@navikt/ds-react";

export const AlertWithCloseButton = ({
	children,
	variant,
	role,
}: {
	children?: React.ReactNode;
	variant: AlertProps["variant"];
	role?: AlertProps["role"];
}) => {
	const [show, setShow] = React.useState(true);

	return show ? (
		<Alert
			variant={variant}
			role={role}
			closeButton
			onClose={() => setShow(false)}
		>
			{children || "Content"}
		</Alert>
	) : null;
};
