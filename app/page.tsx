export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem',
      color: 'white',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '2rem' }}>
        TagStream
      </h1>
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        padding: '2rem',
        borderRadius: '1rem',
        marginBottom: '2rem'
      }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
          Bookmark Manager
        </h2>
        <p style={{ opacity: 0.9 }}>
          Save and organize your favorite links
        </p>
      </div>
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        padding: '2rem',
        borderRadius: '1rem'
      }}>
        <input 
          type="url"
          placeholder="Paste a URL to save..."
          style={{
            width: '100%',
            padding: '1rem',
            fontSize: '1rem',
            borderRadius: '0.5rem',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            background: 'rgba(255, 255, 255, 0.1)',
            color: 'white'
          }}
        />
        <button style={{
          marginTop: '1rem',
          padding: '1rem 2rem',
          fontSize: '1rem',
          fontWeight: 'bold',
          borderRadius: '0.5rem',
          border: 'none',
          background: 'white',
          color: '#667eea',
          cursor: 'pointer'
        }}>
          Save Bookmark
        </button>
      </div>
    </div>
  );
}
