import { CSSProperties } from "react";

export interface BoardData {
	lanes: Lane[];
}

export interface Lane {
	id: string;
	title?: string;
	label?: string;
	style?: CSSProperties;
	cards?: Card[];
	currentPage?: number;
	droppable?: boolean;
	labelStyle?: CSSProperties;
	cardStyle?: CSSProperties;
	disallowAddingCard?: boolean;
	[key: string]: any;
}

export interface Card {
	id: string;
	title?: string;
	label?: string;
	description?: string;
	laneId?: string;
	style?: CSSProperties;
	draggable?: boolean;
	[key: string]: any;
}
