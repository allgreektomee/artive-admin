import React from 'react';
import { useBaseVM } from '../hooks/useBaseVM';

const ArtHomeNew: React.FC = () => {
  const { data, loading } = useBaseVM();

  if (loading) return <div>Loading Archive...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Archive Base List</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
        {data.map((item) => (
          <div key={item.id} style={{ border: '1px solid #eee', padding: '10px' }}>
            <img src={item.thumbnail} alt={item.title} style={{ width: '100%' }} />
            <h3>{item.title}</h3>
            <p>{item.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtHomeNew;