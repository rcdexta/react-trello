import { BoardData, Card, Lane } from "./Board";
export interface EventBusHandle {
	publish: (event: EventBusEvent) => any;
}

type EventBusEvent =
	| {
			type: "ADD_CARD";
			laneId: string;
			card: Card;
			index?: number;
	  }
	| {
			type: "UPDATE_CARD";
			laneId: string;
			card: Card;
	  }
	| {
			type: "REMOVE_CARD";
			laneId: string;
			cardId: string;
	  }
	| {
			type: "REFRESH_BOARD";
			data: BoardData;
	  }
	| {
			type: "MOVE_CARD";
			fromLaneId: string;
			toLaneId: string;
			cardId: string;
			index: number;
	  }
	| {
			type: "UPDATE_CARDS";
			laneId: string;
			cards: Card[];
	  }
	| {
			type: "UPDATE_LANES";
			lanes: BoardData["lanes"];
	  }
	| {
			type: "UPDATE_LANE";
			laneId: string;
			lane: Lane;
	  };
