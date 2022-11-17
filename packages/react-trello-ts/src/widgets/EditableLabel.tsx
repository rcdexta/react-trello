import React, {
	createRef,
	FC,
	PropsWithChildren,
	useEffect,
	useState,
} from "react";
import createTranslate from "../helpers/createTranslate";

interface EditableLabelProps {
	onChange?: (labelText: string) => void;
	placeholder?: string;
	autoFocus?: boolean;
	inline?: boolean;
	value?: string;
}
export const EditableLabel: FC<PropsWithChildren<EditableLabelProps>> = ({
	autoFocus = false,
	inline = false,
	onChange = () => {},
	placeholder = "",
	value = "",
	children,
}) => {
	const [labelText, setLabelText] = useState("");
	const divRef = createRef<HTMLDivElement>();
	useEffect(() => {
		if (autoFocus) {
			divRef.current.focus();
		}
	});

	const getClassName = () => {
		const placeholder =
			labelText === "" ? "comPlainTextContentEditable--has-placeholder" : "";
		return `comPlainTextContentEditable ${placeholder}`;
	};
	const onPaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
		event.preventDefault();
		navigator.clipboard.writeText(event.clipboardData.getData("text"));
	};
	const onBlur = () => {
		onChange(labelText);
	};
	const onKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === "Enter") {
			event.preventDefault();
			onChange(labelText);
			divRef.current.blur();
		}
		if (event.key === "Escape") {
			divRef.current.textContent = labelText;
			event.preventDefault();
			event.stopPropagation();
		}
	};
	const onTextChange = (event: React.FormEvent<HTMLDivElement>) => {
		const value = event.currentTarget.innerText;
		setLabelText(value);
	};

	return (
		<div
			ref={divRef}
			contentEditable="true"
			className={getClassName()}
			onPaste={onPaste}
			onBlur={onBlur}
			onInput={onTextChange}
			onKeyDown={onKeyDown}
			placeholder={placeholder}
		/>
	);
};
