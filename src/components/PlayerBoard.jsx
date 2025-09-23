// プレイヤーボード用コンポーネント
export function PlayerBoard({ players, currentTurn }) {
  return (
    <div style={{ 
      width: '100%', 
      border: '1px solid #ccc', 
      padding: '10px', 
      background: '#f9f9f9', 
      display: 'flex', 
      flexDirection: 'column',
      gap: '10px'
    }}>
      <h3>プレイヤー情報</h3>
      {players.map((p, idx) => (
        <div 
          key={p.id} 
          style={{ 
            padding: '10px', 
            borderRadius: '5px', 
            background: currentTurn === idx ? '#def' : '#fff',
            border: currentTurn === idx ? `2px solid ${p.color}` : '1px solid #ccc',
            display: 'flex',
            alignItems: 'center',
            gap: '15px'
          }}
        >
          <strong style={{ color: p.color }}>{p.type} {p.id}</strong>
          <div>位置: r{p.r} s{p.s}</div>
          <div style={{ display: 'flex', gap: '5px' }}>
            {p.cards && p.cards.length > 0
              ? p.cards.map(c => (
                  <div 
                    key={c.id} 
                    style={{ 
                      padding: '2px 4px', 
                      background: '#eee', 
                      borderRadius: '3px', 
                      fontSize: '12px' 
                    }}
                  >
                    {c.name}
                  </div>
                ))
              : <span style={{ fontSize: '12px' }}>なし</span>
            }
          </div>
        </div>
      ))}
    </div>
  );
}
