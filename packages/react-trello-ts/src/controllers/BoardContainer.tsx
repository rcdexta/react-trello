import React, {
	CSSProperties,
	FC,
	PropsWithChildren,
	useEffect,
	useState,
} from "react";
import Container from "../dnd/Container";
import { Draggable } from "../dnd/Draggable";
import { Lane } from "./Lane";
import { PopoverWrapper } from "react-popopo";

import { createTranslate } from "..";
import { BoardData, Card, Lane as ILane } from "../types/Board";
import { FormState as NewCardFormState } from "../components/NewCardForm";
import * as DefaultComponents from "./../components";
import { EventBusHandle } from "../types/EventBus";
import { useBoard } from "../store/useBoard";
import { isEqual } from "lodash";
export interface BoardContainerProps {
	id?: string;
	components?: Partial<typeof DefaultComponents>;
	className?: string;
	data: BoardData;
	reducerData?: BoardData;
	onDataChange?: (reducerData: BoardData) => void;
	eventBusHandle?: (handle: EventBusHandle) => void;
	onLaneScroll?: (requestedPage: any, laneId: any) => Promise<unknown>;
	onCardClick?: (
		cardId: Card["id"],
		metadata: { id: string },
		card: Card,
	) => void;
	onBeforeCardDelete?: () => void;
	onCardDelete?: (cardId: string, laneId: string) => void;
	onCardAdd?: (card: Card, laneId: string) => void;
	onCardUpdate?: (cardId: string, data: Card) => void;
	onLaneAdd?: (laneAddParams: NewCardFormState) => void;
	onLaneDelete?: () => void;
	onLaneClick?: (laneId: string) => void;
	onLaneUpdate?: (laneId: string, data: ILane) => void;
	laneSortFunction?: (cardA: Card, cardB: Card) => number;
	draggable?: boolean;
	collapsibleLanes?: boolean;
	editable?: boolean;
	canAddLanes?: boolean;
	hideCardDeleteAction?: boolean;
	hideCardDeleteIcon?: boolean;
	handleDragStart?: (cardId: string, laneId: string) => void;
	handleDragEnd?: (
		cardId: Card["id"],
		sourceLandId: ILane["id"],
		targetLaneId: ILane["id"],
		position: number,
		card: Card,
	) => void;
	handleLaneDragStart?: (payloadId: string) => void;
	handleLaneDragEnd?: (
		removedIndex: string,
		addedIndex: string,
		payload: ILane,
	) => void;
	style?: CSSProperties;
	tagStyle?: CSSProperties;
	laneStyle?: CSSProperties;
	cardStyle?: CSSProperties;
	laneDraggable?: boolean;
	cardDraggable?: boolean;
	cardDragClass?: string;
	laneDragClass?: string;
	laneDropClass?: string;
	editLaneTitle?: boolean;
	onCardMoveAcrossLanes?: (
		fromLaneId: string,
		toLaneId: string,
		cardId: string,
		addedIndex: string,
	) => void;
	t?: typeof createTranslate;
}

export const BoardContainer: FC<PropsWithChildren<BoardContainerProps>> = ({
	components,
	handleDragStart = () => {},
	handleDragEnd = () => {},
	handleLaneDragStart = () => {},
	className,
	style,
	id,
	draggable = false,
	laneDraggable = true,
	data,
	cardDragClass = "react_trello_dragClass",
	collapsibleLanes = false,
	laneDragClass = "react_trello_dragLaneClass",
	laneDropClass = "",
	onDataChange = () => {},
	cardDraggable = true,
	onCardAdd,
	onCardUpdate = () => {},
	onCardClick,
	onBeforeCardDelete,
	handleLaneDragEnd = () => {},
	onCardDelete,
	cardStyle,
	hideCardDeleteIcon = false,
	onLaneScroll,
	onLaneClick,
	onLaneAdd = () => {},
	onLaneDelete = () => {},
	onLaneUpdate = () => {},
	editable = false,
	canAddLanes = false,
	eventBusHandle,
	tagStyle,
	editLaneTitle,
	laneStyle,
	laneSortFunction,
	onCardMoveAcrossLanes = () => {},
	t,
	...otherProps
}) => {
	const [addLaneMode, setAddLaneMode] = useState(false);
	const board = useBoard();
	useEffect(() => {
		board.initializeLanes(data.lanes);
		if (eventBusHandle) {
			wireEventBus();
		}
		return () => {
			board.refreshBoard([]);
		};
	}, []);

	/** TODO handle this shit */
	// UNSAFE_componentWillReceiveProps(nextProps) {
	//     // nextProps.data changes when external Board input props change and nextProps.reducerData changes due to event bus or UI changes
	//     const {data, reducerData, onDataChange} = this.props
	//     if (nextProps.reducerData && !isEqual(reducerData, nextProps.reducerData)) {
	//       onDataChange(nextProps.reducerData)
	//     }
	//     if (nextProps.data && !isEqual(nextProps.data, data)) {
	//       loadBoard(nextProps.data)
	//       onDataChange(nextProps.data)
	//     }
	//   }

	useEffect(() => {
		if (!isEqual(board.data, data)) {
			onDataChange(data);
			board.initializeLanes(data.lanes);
		}
	}, [data]);
	const wireEventBus = () => {
		const eventBus: EventBusHandle = {
			publish: (event) => {
				switch (event.type) {
					case "ADD_CARD":
						return board.addCard(event.card, event.laneId, event.index);
					case "UPDATE_CARD":
						return board.updateCard(event.laneId, event.card);
					case "REMOVE_CARD":
						return board.removeCard(event.laneId, event.cardId);
					case "REFRESH_BOARD":
						return board.refreshBoard(event.data.lanes);
					case "MOVE_CARD":
						return board.moveCard(
							event.fromLaneId,
							event.toLaneId,
							event.cardId,
							event.index,
						);
					case "UPDATE_CARDS":
						return board.updateCards(event.laneId, event.cards);
					case "UPDATE_LANES":
						return board.updateLanes(event.lanes);
					case "UPDATE_LANE":
						return board.updateLane(event.lane);
				}
			},
		};
		eventBusHandle(eventBus);
	};
	const getLaneDetails = (index) => {
		return board.data.lanes[index];
	};
	const getCardDetails = (laneId, cardIndex) => {
		return board.data.lanes.find((lane) => lane.id === laneId).cards[cardIndex];
	};
	const groupName = `TrelloBoard${id}`;
	return (
		<components.BoardWrapper style={style} {...otherProps} draggable={false}>
			<PopoverWrapper>
				<Container
					orientation="horizontal"
					className={className}
					onDragStart={({ payload }) => {
						handleLaneDragStart(payload.id);
					}}
					dragClass={laneDragClass}
					dropClass={laneDropClass}
					onDrop={({ removedIndex, addedIndex, payload }) => {
						if (removedIndex !== addedIndex) {
							board.moveLane(removedIndex, addedIndex);
							handleLaneDragEnd(removedIndex, addedIndex, payload);
						}
					}}
					lockAxis="x"
					getChildPayload={(index) => getLaneDetails(index)}
					groupName={groupName}
				>
					{board.data.lanes.map((lane, index) => {
						const { id, droppable, ...otherProps } = lane;

						const laneToRender = (
							<Lane
								key={id}
								boardId={groupName}
								components={components}
								id={id}
								getCardDetails={getCardDetails}
								index={index}
								droppable={droppable === undefined ? true : droppable}
								style={laneStyle || lane.style || {}}
								labelStyle={lane.labelStyle || {}}
								cardStyle={cardStyle || lane.cardStyle}
								editable={editable && !lane.disallowAddingCard}
								draggable={laneDraggable}
								cardDraggable={cardDraggable}
								onCardMoveAcrossLanes={onCardMoveAcrossLanes}
								onLaneScroll={onLaneScroll}
								onLaneDelete={onLaneDelete}
								onLaneUpdate={onLaneUpdate}
								onCardClick={onCardClick}
								onBeforeCardDelete={onBeforeCardDelete}
								onCardDelete={onCardDelete}
								onCardAdd={onCardAdd}
								onCardUpdate={onCardUpdate}
								onLaneClick={onLaneClick}
								laneSortFunction={laneSortFunction}
								collapsibleLanes={collapsibleLanes}
								canAddLanes={canAddLanes}
								hideCardDeleteIcon={hideCardDeleteIcon}
								tagStyle={tagStyle}
								title={lane.title}
								handleDragStart={handleDragStart}
								handleDragEnd={handleDragEnd}
								cardDragClass={cardDragClass}
								t={t}
								{...otherProps}
							/>
						);
						return draggable && laneDraggable ? (
							<Draggable key={lane.id}>{laneToRender}</Draggable>
						) : (
							laneToRender
						);
					})}
				</Container>
			</PopoverWrapper>
			{canAddLanes && (
				<Container orientation="horizontal">
					{editable && !addLaneMode ? (
						<components.NewLaneSection
							t={t}
							onClick={() => setAddLaneMode(true)}
						/>
					) : (
						addLaneMode && (
							<components.NewLaneForm
								onCancel={() => setAddLaneMode(false)}
								onAdd={({ id, title }) => {
									setAddLaneMode(false);
									board.addLane({ id, title, cards: [] });
									onLaneAdd({
										laneId: id,
										title,
										description: "",
										label: "",
									});
								}}
								t={t}
							/>
						)
					)}
				</Container>
			)}
		</components.BoardWrapper>
	);
};
