import React, { useState, useMemo } from 'react';
import api from '../../services/api';

import camera from '../../assets/camera.svg';

import './styles.css';

export default function New({ history }) {
  const [thumbnail, setThumbnail] = useState(null);
  const [text, setText] = useState('');

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail])

  async function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData();

    const user_id = localStorage.getItem('user');

    data.append('thumbnail', thumbnail);
    data.append('text', text);
    
    await api.post('/news', data, {
      headers: { user_id }
    })

    history.push('/newsDasboard');
  }

  return (
    <form onSubmit={handleSubmit}>
      <label
        id="thumbnail"
        style={{ backgroundImage: `url(${preview})` }}
        className={thumbnail ? 'has-thumbnail' : ''}
      >
        <input type="file" onChange={event => setThumbnail(event.target.files[0])} />
        <img src={camera} alt="Select img" />
      </label>

      <label htmlFor="text">Texto</label>
      <input
        id="text"
        placeholder="Digite o seu texto"
        value={text}
        onChange={event => setText(event.target.value)}
      />
      
      <button type="submit" className="btn">Cadastrar</button>
    </form>
  )
}