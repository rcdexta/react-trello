import React, {
	FC,
	HTMLAttributes,
	PropsWithChildren,
	useRef,
	useState,
} from "react";
import { LaneTitle, NewLaneButtons, Section } from "../styles/Base";
import { AddButton, CancelButton } from "../styles/Elements";
import { NewLaneTitleEditor } from "../widgets/NewLaneTitleEditor";
import { v1 } from "uuid";
import { ThemedStyledFunction } from "styled-components";
import createTranslate from "../helpers/createTranslate";

interface NewLaneFormProps
	extends HTMLAttributes<ThemedStyledFunction<"section", any, {}, never>> {
	onCancel: () => void;
	onAdd: ({ id, title }: { id: string; title: string }) => void;
	t: typeof createTranslate;
}
export const NewLaneForm: FC<PropsWithChildren<NewLaneFormProps>> = ({
	onAdd,
	onCancel,
	t,
}) => {
	const titleRef = useRef<HTMLTextAreaElement>();
	const handleSubmit = () => {
		onAdd({
			id: v1(),
			title: titleRef.current.value,
		});
	};

	return (
		<Section>
			<LaneTitle>
				<NewLaneTitleEditor
					inputRef={titleRef}
					placeholder={t("placeholder.title") as unknown as string}
					onCancel={onCancel}
					onSave={handleSubmit}
					resize="vertical"
					border={true}
					autoFocus={true}
				/>
			</LaneTitle>
			<NewLaneButtons>
				<AddButton onClick={handleSubmit}>{t("button.Add lane")}</AddButton>
				<CancelButton onClick={onCancel}>{t("button.Cancel")}</CancelButton>
			</NewLaneButtons>
		</Section>
	);
};
