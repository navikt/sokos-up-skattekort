import { BodyShort, HStack, Label } from "@navikt/ds-react";

interface LabelTextProps {
	label: string;
	text: string | number;
}

export default function LabelText(props: Readonly<LabelTextProps>) {
	return (
		<HStack gap="space-8">
			<Label>{props.label}:</Label>
			<BodyShort>{props.text}</BodyShort>
		</HStack>
	);
}
