import React, { createContext, FC, PropsWithChildren } from "react";
import classNames from "classnames";
import { v1 } from "uuid";
import { BoardContainer } from "./BoardContainer";
import * as DefaultComponets from "../components";
import { BoardData } from "../types/Board";
import { store } from "../store/store";

export const Board: FC<
	PropsWithChildren<{
		id?: string;
		className?: string;
		components: typeof DefaultComponets;
		data: BoardData;
		t?: any;
	}>
> = ({ data, children, className, components, id, t, ...rest }) => {
	const allClassNames = classNames("react-trello-board", className || "");

	return (
		<BoardContext.Provider value={store}>
			<components.GlobalStyle />
			<BoardContainer
				id={id || v1()}
				data={data}
				components={components}
				t={t}
				className={allClassNames}
				{...rest}
			/>
		</BoardContext.Provider>
	);
};

export const BoardContext = createContext(store);
