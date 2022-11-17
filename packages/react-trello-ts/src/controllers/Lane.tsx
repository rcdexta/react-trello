import React, { CSSProperties, FC, PropsWithChildren, useEffect } from "react";
import classNames from "classnames";
import cloneDeep from "lodash/cloneDeep";
import uuidv1 from "uuid/v1";

import Container from "../dnd/Container";
import { Draggable } from "../dnd/Draggable";

import { Card, Lane as ILane } from "../types/Board";
import { components, createTranslate } from "..";
import { useBoard } from "../store/useBoard";

interface LaneProps {
	id: string;
	index?: number;
	boardId?: string;
	title?: string;
	label?: string;
	cards?: any[];
	style?: any;
	collapsibleLanes?: boolean;
	className?: string;
	titleStyle?: any;
	titleClassName?: string;
	labelStyle?: any;
	labelClassName?: string;
	cardStyle?: any;
	cardClassName?: string;
	currentPage?: number;
	draggable?: boolean;
	droppable?: boolean;
	editable?: boolean;
	canAddLanes?: boolean;
	laneSortFunction?: (cardA: Card, cardB: Card) => number;
	hideCardDeleteIcon?: boolean;
	cardDraggable?: boolean;
	cardDragClass?: string;
	cardDropClass?: string;
	tagStyle?: CSSProperties;
	components?: Partial<typeof components>;
	onLaneScroll?: (page: number, laneId: string) => Promise<unknown>;
	onLaneAdd?: (params: any) => void;
	onLaneDelete?: (laneId: string) => void;
	onLaneUpdate?: (laneId: string, data: ILane) => void;
	onCardClick?: (cardId: string, metadata: { id: string }, card: Card) => void;
	onCardAdd?: (card: any, laneId: string) => void;
	onCardDelete?: (cardId: string, laneId: string) => void;
	onCardUpdate?: (laneId: string, card: any) => void;
	onBeforeCardDelete?: (callback: () => void) => void;
	onCardMoveAcrossLanes?: (
		fromLaneId: string,
		toLaneId: string,
		cardId: string,
		index: string,
	) => void;
	onLaneClick?: (laneId: string) => void;
	handleDragStart?: (cardId: string, laneId: string) => void;
	handleDragEnd?: (
		cardId: string,
		payloadLaneId: string,
		laneId: string,
		addedIndex: number,
		newCard: Card,
	) => void;
	getCardDetails?: (laneId: string, cardIndex: number) => any;
	t?: typeof createTranslate;
}
export const Lane: FC<PropsWithChildren<LaneProps>> = ({
	id,
	index,
	boardId,
	title,
	label,
	cards,
	style,
	collapsibleLanes,
	className,
	titleStyle,
	titleClassName,
	labelStyle,
	labelClassName,
	cardStyle,
	cardClassName,
	currentPage,
	draggable,
	droppable,
	editable,
	canAddLanes,
	laneSortFunction,
	hideCardDeleteIcon,
	cardDraggable,
	cardDragClass,
	cardDropClass,
	tagStyle,
	components,
	onLaneScroll,
	onLaneAdd,
	onLaneDelete,
	onLaneUpdate,
	onCardClick,
	onCardAdd,
	onCardDelete,
	onCardUpdate,
	onBeforeCardDelete,
	onCardMoveAcrossLanes,
	onLaneClick,
	handleDragStart,
	handleDragEnd,
	getCardDetails,
	t,
	children,
	...otherProps
}) => {
	const board = useBoard();
	const [loading, setLoading] = React.useState(false);
	const [currentPageState, setCurrentPageState] = React.useState(currentPage);
	const [collapsed, setCollapsed] = React.useState(false);
	const [addCardMode, setAddCardMode] = React.useState(false);
	const [isDraggingOver, setIsDraggingOver] = React.useState(false);

	// HANDLE THIS
	// UNSAFE_componentWillReceiveProps(nextProps) {
	//   if (!isEqual(this.props.cards, nextProps.cards)) {
	//     this.setState({
	//       currentPage: nextProps.currentPage
	//     })
	//   }
	// }
	useEffect(() => {
		setCurrentPageState(currentPage);
	}, [cards]);

	// useEffect(
	//   () => {

	//     if (!isEqual(cards, board.data.lanes[index].cards)) {
	//       setCurrentPageState(currentPage)
	//     }
	//   },
	//   [cards, currentPage, index, board.data.lanes]
	// )

	const sortCards = (cards: Card[], sortFunction: typeof laneSortFunction) => {
		if (!cards) {
			return [];
		}
		if (!sortFunction) {
			return cards;
		}
		return cards.concat().sort(function (card1, card2) {
			return sortFunction(card1, card2);
		});
	};
	const addNewCard = (params: {
		title?: string;
		laneId?: string;
		description?: string;
		label?: string;
	}) => {
		const laneId = params.laneId || id;
		const _id = uuidv1();
		setAddCardMode(false);
		const card = { id: _id, ...params };
		board.addCard(card, laneId);
		onCardAdd(card, laneId);
	};
	const updateCard = (updatedCard: Card) => {
		board.updateCard(id, updatedCard);
		onCardUpdate(id, updatedCard);
	};
	const updateTitle = (value) => {
		board.updateLane({ id, title: value });
		onLaneUpdate(id, { id, title: value });
		onLaneUpdate(id, {
			title: value,
			id: id,
		});
	};
	const laneDidMount = (node: HTMLDivElement) => {
		if (node) {
			node.addEventListener("scroll", handleScroll);
		}
	};
	const removeLane = () => {
		board.removeLane(id);
		onLaneDelete(id);
	};
	const handleScroll = (evt) => {
		const node = evt.target;
		const elemScrollPosition =
			node.scrollHeight - node.scrollTop - node.clientHeight;
		// In some browsers and/or screen sizes a decimal rest value between 0 and 1 exists, so it should be checked on < 1 instead of < 0
		if (elemScrollPosition < 1 && onLaneScroll && !loading) {
			setLoading(true);
			const nextPage = currentPageState + 1;
			onLaneScroll(nextPage, id).then((moreCards: Card[]) => {
				if ((moreCards || []).length > 0) {
					board.paginateLane(id, moreCards, nextPage);
				}
				setLoading(false);
			});
		}
	};
	const groupName = `TrelloBoard${boardId}Lane`;
	const handleCardClick = (e, card) => {
		onCardClick?.(card.id, card.metadata, card.laneId);
		e.stopPropagation();
	};
	const toggleLaneCollapsed = () => {
		collapsibleLanes && setCollapsed(!collapsed);
	};
	const removeCard = (cardId: Card["id"]) => {
		if (onBeforeCardDelete && typeof onBeforeCardDelete === "function") {
			onBeforeCardDelete(() => {
				onCardDelete?.(cardId, id);
				board.removeCard(id, cardId);
			});
		} else {
			onCardDelete?.(cardId, id);
			board.removeCard(id, cardId);
		}
	};
	const onDragStart = ({ payload }) => {
		handleDragStart?.(payload.id, id);
	};
	const onDragEnd = (
		laneId: string,
		result: { addedIndex: any; payload: any },
	) => {
		const { addedIndex, payload } = result;

		if (isDraggingOver) {
			setIsDraggingOver(false);
		}

		if (addedIndex != null) {
			const newCard = { ...cloneDeep(payload), laneId };
			handleDragEnd?.(payload.id, laneId, id, addedIndex, newCard);

			const response = handleDragEnd
				? handleDragEnd(payload.id, payload.laneId, laneId, addedIndex, newCard)
				: true;
			if (response === undefined || !!response) {
				board.moveCard(payload.laneId, laneId, payload.id, addedIndex);
				onCardMoveAcrossLanes(payload.laneId, laneId, payload.id, addedIndex);
			}
			return response;
		}
	};

	const renderDragContainer = (isDraggingOver: boolean) => {
		const showableCards = collapsed ? [] : cards;
		const cardList = sortCards(showableCards, laneSortFunction).map(
			(card, idx) => {
				const onDeleteCard = () => removeCard(card.id);
				const cardToRender = (
					<components.Card
						key={card.id}
						index={idx}
						style={card.style || cardStyle}
						className="react-trello-card"
						onDelete={onDeleteCard}
						onClick={(e) => handleCardClick(e, card)}
						onChange={(updatedCard) => updateCard(updatedCard)}
						showDeleteButton={!hideCardDeleteIcon}
						tagStyle={tagStyle}
						cardDraggable={cardDraggable}
						editable={editable}
						title={card.title}
						description={card.description}
						label={card.label}
						metadata={card.metadata}
						id={card.id}
						t={t}
						{...card}
					/>
				);
				return cardDraggable &&
					(!card.hasOwnProperty("draggable") || card.draggable) ? (
					<Draggable key={card.id}>{cardToRender}</Draggable>
				) : (
					<span key={card.id}>{cardToRender}</span>
				);
			},
		);

		return (
			<components.ScrollableLane
				ref={laneDidMount}
				isDraggingOver={isDraggingOver}
			>
				<Container
					orientation="vertical"
					groupName={groupName}
					dragClass={cardDragClass}
					dropClass={cardDropClass}
					onDragStart={onDragStart}
					onDrop={(e) => {
						onDragEnd(id, e);
					}}
					onDragEnter={() => setIsDraggingOver(true)}
					onDragLeave={() => setIsDraggingOver(false)}
					shouldAcceptDrop={(sourceContainerOptions) =>
						droppable && sourceContainerOptions.groupName === groupName
					}
					getChildPayload={(index) => getCardDetails(id, index)}
				>
					{cardList}
				</Container>
				{editable && !addCardMode && (
					<components.AddCardLink onClick={() => setAddCardMode(true)} t={t} />
				)}
				{addCardMode && (
					<components.NewCardForm
						onCancel={() => setAddCardMode(false)}
						t={t}
						laneId={id}
						onAdd={addNewCard}
					/>
				)}
			</components.ScrollableLane>
		);
	};

	const allClassNames = classNames("react-trello-lane", className || "");
	const showFooter = collapsibleLanes && cards.length > 0;
	return (
		<components.Section
			{...otherProps}
			key={id}
			onClick={() => onLaneClick?.(id)}
			draggable={false}
			className={allClassNames}
		>
			<components.LaneHeader
				onDelete={removeLane}
				onDoubleClick={toggleLaneCollapsed}
				updateTitle={updateTitle}
				title={title}
				label={label}
				labelStyle={labelStyle}
				titleStyle={titleStyle}
				collapsible={collapsibleLanes}
				collapsed={collapsed}
				t={t}
			/>
			{renderDragContainer(isDraggingOver)}
			{loading && <components.Loader />}
			{showFooter && (
				<components.LaneFooter
					onClick={toggleLaneCollapsed}
					collapsed={collapsed}
				/>
			)}
		</components.Section>
	);
};
// class Lane extends Component<LaneProps> {
//   state = {
//     loading: false,
//     currentPage: this.props.currentPage,
//     addCardMode: false,
//     collapsed: false,
//     isDraggingOver: false
//   }

//   handleScroll = evt => {
//     const node = evt.target
//     const elemScrollPosition = node.scrollHeight - node.scrollTop - node.clientHeight
//     const {onLaneScroll} = this.props
//     // In some browsers and/or screen sizes a decimal rest value between 0 and 1 exists, so it should be checked on < 1 instead of < 0
//     if (elemScrollPosition < 1 && onLaneScroll && !this.state.loading) {
//       const {currentPage} = this.state
//       this.setState({loading: true})
//       const nextPage = currentPage + 1
//       onLaneScroll(nextPage, this.props.id).then((moreCards: Card[]) => {
//         if ((moreCards || []).length > 0) {
//           this.props.actions.paginateLane({
//             laneId: this.props.id,
//             newCards: moreCards,
//             nextPage: nextPage
//           })
//         }
//         this.setState({loading: false})
//       })
//     }
//   }

//   sortCards(cards: Card[], sortFunction: typeof this.props.laneSortFunction) {
//     if (!cards) return []
//     if (!sortFunction) return cards
//     return cards.concat().sort(function(card1, card2) {
//       return sortFunction(card1, card2)
//     })
//   }

//   laneDidMount = (node: HTMLDivElement) => {
//     if (node) {
//       node.addEventListener('scroll', this.handleScroll)
//     }
//   }

//   UNSAFE_componentWillReceiveProps(nextProps) {
//     if (!isEqual(this.props.cards, nextProps.cards)) {
//       this.setState({
//         currentPage: nextProps.currentPage
//       })
//     }
//   }

//   removeCard = (cardId: Card['id']) => {
//     if (this.props.onBeforeCardDelete && typeof this.props.onBeforeCardDelete === 'function') {
//       this.props.onBeforeCardDelete(() => {
//         this.props.onCardDelete && this.props.onCardDelete(cardId, this.props.id)
//         this.props.actions.removeCard({laneId: this.props.id, cardId: cardId})
//       })
//     } else {
//       this.props.onCardDelete && this.props.onCardDelete(cardId, this.props.id)
//       this.props.actions.removeCard({laneId: this.props.id, cardId: cardId})
//     }
//   }

//   handleCardClick = (e, card) => {
//     const {onCardClick} = this.props
//     onCardClick && onCardClick(card.id, card.metadata, card.laneId)
//     e.stopPropagation()
//   }

//   showEditableCard = () => {
//     this.setState({addCardMode: true})
//   }

//   hideEditableCard = () => {
//     this.setState({addCardMode: false})
//   }

//   addNewCard = (params: {title?: string; laneId?: string; description?: string; label?: string}) => {
//     const laneId = params.laneId || this.props.id
//     const id = uuidv1()
//     this.hideEditableCard()
//     const card = {id, ...params}
//     this.props.actions.addCard({laneId, card})
//     this.props.onCardAdd(card, laneId)
//   }

//   onDragStart = ({payload}) => {
//     const {handleDragStart} = this.props
//     handleDragStart && handleDragStart(payload.id, payload.laneId)
//   }

//   shouldAcceptDrop = (sourceContainerOptions: ContainerProps) => {
//     return this.props.droppable && sourceContainerOptions.groupName === this.groupName
//   }

//   get groupName() {
//     const {boardId} = this.props
//     return `TrelloBoard${boardId}Lane`
//   }

//   onDragEnd = (laneId: string, result: {addedIndex: any; payload: any}) => {
//     const {handleDragEnd} = this.props
//     const {addedIndex, payload} = result

//     if (this.state.isDraggingOver) {
//       this.setState({isDraggingOver: false})
//     }

//     if (addedIndex != null) {
//       const newCard = {...cloneDeep(payload), laneId}
//       const response = handleDragEnd ? handleDragEnd(payload.id, payload.laneId, laneId, addedIndex, newCard) : true
//       if (response === undefined || !!response) {
//         this.props.actions.moveCardAcrossLanes({
//           fromLaneId: payload.laneId,
//           toLaneId: laneId,
//           cardId: payload.id,
//           index: addedIndex
//         })
//         this.props.onCardMoveAcrossLanes(payload.laneId, laneId, payload.id, addedIndex)
//       }
//       return response
//     }
//   }

//   updateCard = (updatedCard: Card) => {
//     this.props.actions.updateCard({laneId: this.props.id, card: updatedCard})
//     this.props.onCardUpdate(this.props.id, updatedCard)
//   }

//   renderDragContainer = (isDraggingOver: boolean) => {
//     const {
//       id,
//       cards,
//       laneSortFunction,
//       editable = false,
//       hideCardDeleteIcon,
//       cardDraggable,
//       cardDragClass,
//       cardDropClass,
//       tagStyle,
//       cardStyle,
//       components,
//       t
//     } = this.props
//     const {addCardMode, collapsed} = this.state

//     const showableCards = collapsed ? [] : cards

//     const cardList = this.sortCards(showableCards, laneSortFunction).map((card, idx) => {
//       const onDeleteCard = () => this.removeCard(card.id)
//       const cardToRender = (
//         <components.Card
//           key={card.id}
//           index={idx}
//           style={card.style || cardStyle}
//           className="react-trello-card"
//           onDelete={onDeleteCard}
//           onClick={e => this.handleCardClick(e, card)}
//           onChange={updatedCard => this.updateCard(updatedCard)}
//           showDeleteButton={!hideCardDeleteIcon}
//           tagStyle={tagStyle}
//           cardDraggable={cardDraggable}
//           editable={editable}
//           t={t}
//           {...card}
//         />
//       )
//       return cardDraggable && (!card.hasOwnProperty('draggable') || card.draggable) ? (
//         <Draggable key={card.id}>{cardToRender}</Draggable>
//       ) : (
//         <span key={card.id}>{cardToRender}</span>
//       )
//     })

//     return (
//       <components.ScrollableLane ref={this.laneDidMount} isDraggingOver={isDraggingOver}>
//         <Container
//           orientation="vertical"
//           groupName={this.groupName}
//           dragClass={cardDragClass}
//           dropClass={cardDropClass}
//           onDragStart={this.onDragStart}
//           onDrop={e => this.onDragEnd(id, e)}
//           onDragEnter={() => this.setState({isDraggingOver: true})}
//           onDragLeave={() => this.setState({isDraggingOver: false})}
//           shouldAcceptDrop={this.shouldAcceptDrop}
//           getChildPayload={index => this.props.getCardDetails(id, index)}>
//           {cardList}
//         </Container>
//         {editable && !addCardMode && <components.AddCardLink onClick={this.showEditableCard} t={t} />}
//         {addCardMode && (
//           <components.NewCardForm onCancel={this.hideEditableCard} t={t} laneId={id} onAdd={this.addNewCard} />
//         )}
//       </components.ScrollableLane>
//     )
//   }

//   removeLane = () => {
//     const {id} = this.props
//     this.props.actions.removeLane({laneId: id})
//     this.props.onLaneDelete(id)
//   }

//   updateTitle = value => {
//     this.props.actions.updateLane({id: this.props.id, title: value})
//     this.props.onLaneUpdate(this.props.id, {
//       title: value,
//       id: this.props.id
//     })
//   }

//   renderHeader = (pickedProps: Partial<LaneHeaderProps>) => {
//     const {components, t} = this.props
//     return (
//       <components.LaneHeader
//         onDelete={this.removeLane}
//         onDoubleClick={this.toggleLaneCollapsed}
//         updateTitle={this.updateTitle}
//         {...pickedProps}
//         t={t}
//       />
//     )
//   }

//   toggleLaneCollapsed = () => {
//     this.props.collapsibleLanes && this.setState((state: {collapsed: boolean}) => ({collapsed: !state.collapsed}))
//   }

//   render() {
//     const {loading, isDraggingOver, collapsed} = this.state
//     const {
//       id,
//       cards,
//       collapsibleLanes,
//       components,
//       onLaneClick,
//       onLaneScroll,
//       onCardClick,
//       onCardAdd,
//       onBeforeCardDelete,
//       onCardDelete,
//       onLaneDelete,
//       onLaneUpdate,
//       onCardUpdate,
//       onCardMoveAcrossLanes,
//       ...otherProps
//     } = this.props
//     const allClassNames = classNames('react-trello-lane', this.props.className || '')
//     const showFooter = collapsibleLanes && cards.length > 0
//     return (
//       <components.Section
//         {...otherProps}
//         key={id}
//         onClick={() => onLaneClick && onLaneClick(id)}
//         draggable={false}
//         className={allClassNames}>
//         {this.renderHeader({id, cards, ...otherProps})}
//         {this.renderDragContainer(isDraggingOver)}
//         {loading && <components.Loader />}
//         {showFooter && <components.LaneFooter onClick={this.toggleLaneCollapsed} collapsed={collapsed} />}
//       </components.Section>
//     )
//   }
// }

// const mapDispatchToProps = dispatch => ({
//   actions: bindActionCreators(laneActions, dispatch)
// })

// export default connect(
//   null,
//   mapDispatchToProps
// )(Lane)
