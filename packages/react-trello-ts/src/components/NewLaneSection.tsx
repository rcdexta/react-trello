import React, { FC, PropsWithChildren } from "react";
import { NewLaneSection as _NewLaneSection } from "../styles/Base";
import { AddLaneLink } from "../styles/Elements";
import { createTranslate } from "..";

export const NewLaneSection: FC<
	PropsWithChildren<{ t: typeof createTranslate; onClick: () => void }>
> = ({ t, onClick }) => (
	<_NewLaneSection>
		<AddLaneLink onClick={onClick}>{t("Add another lane")}</AddLaneLink>
	</_NewLaneSection>
);
