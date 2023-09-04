import React from 'react';

function PreviewPost({ post }) {
  const styles = {
    container: {
      margin: '0 auto',
      width: '80%',
      padding: '20px',
      backgroundColor: '#f8f9fa',
      borderRadius: '5px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)'
    },
    title: {
      color: '#343a40',
      textAlign: 'center'
    },
    strong: {
      color: '#007bff'
    },
    multimedia: {
      marginTop: '20px'
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Vista Previa de la Publicación</h2>
      <p><strong style={styles.strong}>Título:</strong> {post.title}</p>
      <p><strong style={styles.strong}>Descripción:</strong> {post.description}</p>
      <p><strong style={styles.strong}>Estado:</strong> {post.status}</p>
      <p><strong style={styles.strong}>Tipo:</strong> {post.type}</p>
      {post.multimedia.length > 0 && (
        <div style={styles.multimedia}>
          <strong style={styles.strong}>Multimedia:</strong>
          <ul>
            {post.multimedia.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PreviewPost;
