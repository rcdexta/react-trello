import React, { CSSProperties, FC, PropsWithChildren } from "react";
import { TagSpan } from "../../styles/Base";

export interface TagProps {
	title: string;
	color?: string;
	bgcolor?: string;
	tagStyle?: CSSProperties;
}
export const Tag: FC<PropsWithChildren<TagProps>> = ({
	title,
	color,
	bgcolor,
	tagStyle,
	...otherProps
}) => {
	const style = {
		color: color || "white",
		backgroundColor: bgcolor || "orange",
		...tagStyle,
	};
	return (
		<TagSpan style={style} {...otherProps}>
			{title}
		</TagSpan>
	);
};
