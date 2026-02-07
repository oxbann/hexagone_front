import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getToken, getUser } from '../../utils/auth';
import { api } from '../../utils/api';

export default function Players() {
  const [user, setUser] = useState(null);
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [formData, setFormData] = useState({});
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    const userData = getUser();

    if (!token || !userData) {
      router.push('/auth/login');
      return;
    }

    // Vérifier si staff
    if (!['coach', 'assistant_coach', 'manager', 'admin'].includes(userData.role)) {
      router.push('/dashboard');
      return;
    }

    setUser(userData);

    // Charger la liste des joueurs
    api.getAllPlayers(token).then(data => {
      if (data.error) {
        alert(data.error);
      } else {
        setPlayers(data);
      }
    });
  }, [router]);

  const handleEdit = (player) => {
    setSelectedPlayer(player);
    setFormData({
      pseudo: player.pseudo || '',
      game_role: player.game_role || '',
      strengths: player.strengths || '',
      weaknesses: player.weaknesses || '',
      progression_areas: player.progression_areas || '',
      staff_notes: player.staff_notes || '',
      objectives: player.objectives || ''
    });
  };

  const handleSave = async () => {
    const token = getToken();
    const result = await api.updatePlayer(selectedPlayer.id, formData, token);
    
    if (result.error) {
      alert(result.error);
    } else {
      alert('Fiche mise à jour');
      setSelectedPlayer(null);
      // Recharger la liste
      const data = await api.getAllPlayers(token);
      setPlayers(data);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Liste des joueurs</h1>
      <a href="/dashboard">← Retour</a>

      {selectedPlayer ? (
        <div style={{ marginTop: '30px', border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
          <h2>Édition de la fiche : {selectedPlayer.pseudo}</h2>
          <div style={{ marginBottom: '15px' }}>
            <label>Pseudo</label><br />
            <input
              type="text"
              value={formData.pseudo}
              onChange={(e) => setFormData({ ...formData, pseudo: e.target.value })}
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label>Rôle en jeu</label><br />
            <input
              type="text"
              value={formData.game_role}
              onChange={(e) => setFormData({ ...formData, game_role: e.target.value })}
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label>Points forts</label><br />
            <textarea
              value={formData.strengths}
              onChange={(e) => setFormData({ ...formData, strengths: e.target.value })}
              style={{ width: '100%', padding: '8px', minHeight: '80px' }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label>Points faibles</label><br />
            <textarea
              value={formData.weaknesses}
              onChange={(e) => setFormData({ ...formData, weaknesses: e.target.value })}
              style={{ width: '100%', padding: '8px', minHeight: '80px' }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label>Axes de progression</label><br />
            <textarea
              value={formData.progression_areas}
              onChange={(e) => setFormData({ ...formData, progression_areas: e.target.value })}
              style={{ width: '100%', padding: '8px', minHeight: '80px' }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label>Notes staff</label><br />
            <textarea
              value={formData.staff_notes}
              onChange={(e) => setFormData({ ...formData, staff_notes: e.target.value })}
              style={{ width: '100%', padding: '8px', minHeight: '80px' }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label>Objectifs</label><br />
            <textarea
              value={formData.objectives}
              onChange={(e) => setFormData({ ...formData, objectives: e.target.value })}
              style={{ width: '100%', padding: '8px', minHeight: '80px' }}
            />
          </div>
          <button onClick={handleSave} style={{ padding: '10px 20px', marginRight: '10px' }}>Sauvegarder</button>
          <button onClick={() => setSelectedPlayer(null)} style={{ padding: '10px 20px' }}>Annuler</button>
        </div>
      ) : (
        <table style={{ marginTop: '30px', width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #ccc' }}>
              <th style={{ padding: '10px', textAlign: 'left' }}>Pseudo</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Email</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Rôle en jeu</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {players.map(player => (
              <tr key={player.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '10px' }}>{player.pseudo || 'N/A'}</td>
                <td style={{ padding: '10px' }}>{player.email}</td>
                <td style={{ padding: '10px' }}>{player.game_role || 'N/A'}</td>
                <td style={{ padding: '10px' }}>
                  <button onClick={() => handleEdit(player)} style={{ padding: '5px 10px' }}>Éditer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
