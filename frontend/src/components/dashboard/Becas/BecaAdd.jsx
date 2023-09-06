import React, { useState } from 'react';

function BecaAdd({ onPostCreate }) {
  const [postData, setPostData] = useState({
    title: '',
    description: '',
    status: '',
    type: '',
    multimedia: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData({
      ...postData,
      [name]: value,
    });
  };

  const handleMultimediaChange = (e) => {
    const files = e.target.files;
    setPostData({
      ...postData,
      multimedia: [...postData.multimedia, ...files],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onPostCreate(postData);
    setPostData({
      title: '',
      description: '',
      status: '',
      type: '',
      multimedia: [],
    });
  };

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
    formGroup: {
      marginBottom: '15px'
    },
    label: {
      display: 'block',
      marginBottom: '5px'
    },
    input: {
      width: '100%',
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ced4da'
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer'
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Crear Publicación</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Título:</label>
          <input
            type="text"
            name="title"
            value={postData.title}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Descripción:</label>
          <textarea
            name="description"
            value={postData.description}
            onChange={handleChange}
            required
            style={styles.input}
          ></textarea>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Estado:</label>
          <input
            type="text"
            name="status"
            value={postData.status}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Tipo:</label>
          <input
            type="text"
            name="type"
            value={postData.type}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Subir Multimedia:</label>
          <input
            type="file"
            accept="image/*, video/*"
            multiple
            onChange={handleMultimediaChange}
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>Crear Publicación</button>
      </form>
    </div>
  );
}

export default BecaAdd;
