import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';

export default function NewsDashboard() {
  const news_id = localStorage.getItem('news');
  const [news, setNews] = useState([]);

  useEffect(() => {
    async function loadNews() {
      const response = await api.get('/newsDasboard', {
        news: { news_id }
      });

      setNews(response.data);
    }

    loadNews();
  },);

  return (
    <>
      <ul className="spot-list">
        {news.map(news => (
          <li key={news._id}>
            <header style={{ backgroundImage: `url(${news.thumbnail_url})` }} />
            <strong>{news.text}</strong>
          </li>
        ))}
      </ul>

      <Link to="/news">
        <button className="btn">Cadastrar nova notícia</button>
      </Link>
    </>
  )
}