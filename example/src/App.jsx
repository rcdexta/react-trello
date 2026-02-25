import { useState } from 'react'
import Board from 'react-trello-19'

const initialData = {
  lanes: [
    {
      id: 'lane1',
      title: '📋 Backlog',
      label: '3/3',
      style: { backgroundColor: '#f0f0f0' },
      cards: [
        { id: 'card1', title: 'Research competitors', description: 'Analyze top 5 competitors', label: '2h' },
        { id: 'card2', title: 'Design mockups', description: 'Create wireframes in Figma', label: '4h' },
        { id: 'card3', title: 'Write specs', description: 'Document requirements', label: '1h' }
      ]
    },
    {
      id: 'lane2',
      title: '🚧 In Progress',
      label: '2/2',
      style: { backgroundColor: '#fff8e7' },
      cards: [
        { id: 'card4', title: 'Migrate to React 19', description: 'Update all deprecated APIs', label: '3h' },
        { id: 'card5', title: 'Publish npm package', description: 'react-trello-19 v3.0.0', label: '30m' }
      ]
    },
    {
      id: 'lane3',
      title: '✅ Done',
      label: '2/2',
      style: { backgroundColor: '#e8f5e9' },
      cards: [
        { id: 'card6', title: 'Remove findDOMNode', description: 'Replaced with ref callbacks', label: '1h' },
        { id: 'card7', title: 'Replace redux-actions', description: 'Switched to plain action creators', label: '30m' }
      ]
    }
  ]
}

export default function App() {
  const [data, setData] = useState(initialData)

  return (
    <div>
      <header style={{
        padding: '16px 24px',
        background: '#0052cc',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        gap: 12
      }}>
        <span style={{ fontSize: 22 }}>🗂</span>
        <div>
          <h1 style={{ fontSize: 18, fontWeight: 600 }}>react-trello-19</h1>
          <p style={{ fontSize: 12, opacity: 0.8 }}>v3.0.0 · React 19 · Live Demo</p>
        </div>
        <a
          href="https://www.npmjs.com/package/react-trello-19"
          target="_blank"
          rel="noreferrer"
          style={{ marginLeft: 'auto', color: '#fff', fontSize: 13, opacity: 0.9 }}
        >
          npm install react-trello-19 ↗
        </a>
      </header>
      <Board
        data={data}
        draggable
        editable
        canAddLanes
        onDataChange={setData}
        onCardClick={(cardId, metadata, laneId) =>
          console.log('Card clicked:', cardId, 'in lane:', laneId)
        }
        onCardAdd={(card, laneId) =>
          console.log('Card added:', card, 'to lane:', laneId)
        }
        onCardDelete={(cardId, laneId) =>
          console.log('Card deleted:', cardId, 'from lane:', laneId)
        }
        onLaneAdd={(lane) =>
          console.log('Lane added:', lane)
        }
        onLaneDelete={(laneId) =>
          console.log('Lane deleted:', laneId)
        }
      />
    </div>
  )
}
