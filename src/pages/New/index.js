import React, { useState, useMemo } from 'react';
import api from '../../services/api';

import camera from '../../assets/camera.svg';

import './styles.css';

export default function New({ history }) {
  const [thumbnail, setThumbnail] = useState(null);
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [president, setPresident] = useState('');
  const [phone, setPhone] = useState('');
  const [initials, setInitials] = useState('');

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail])

  async function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData();
    const user_id = localStorage.getItem('user');

    data.append('thumbnail', thumbnail);
    data.append('city', city);
    data.append('address', address);
    data.append('president', president);
    data.append('phone', phone);
    data.append('initials', initials);

    await api.post('/directories', data, {
      headers: { user_id }
    })

    history.push('/dashboard');
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

      <label htmlFor="city">Diretório *</label>
      <input
        id="city"
        placeholder="Digite o município do seu diretório"
        value={city}
        onChange={event => setCity(event.target.value)}
      />

      <label htmlFor="address">Endereço * </label>
      <input
        id="address"
        placeholder="Digite o endereço"
        value={address}
        onChange={event => setAddress(event.target.value)}
      />

      <label htmlFor="president">Presidente * </label>
      <input
        id="president"
        placeholder="Digite o nome do presidente"
        value={president}
        onChange={event => setPresident(event.target.value)}
      />

      <label htmlFor="phone">Telefone * </label>
      <input
        id="phone"
        placeholder="Digite o telefone"
        mask="+4\9 99 999 99"
        value={phone}
        onChange={event => setPhone(event.target.value)}
      />

      <label htmlFor="initials">Agrupamento * <span>(separadas por vírgula)</span></label>
      <input
        id="initials"
        placeholder="Digite a inicial"
        value={initials}
        onChange={event => setInitials(event.target.value)}
      />

      <button type="submit" className="btn">Cadastrar</button>
    </form>
  )
}