import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getToken, getUser, clearAuth } from '../utils/auth';
import { api } from '../utils/api';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    const userData = getUser();

    if (!token || !userData) {
      router.push('/auth/login');
      return;
    }

    setUser(userData);

    // Charger la fiche du joueur
    api.getPlayer(userData.id, token).then(data => {
      if (data.error) {
        alert(data.error);
      } else {
        setProfile(data);
      }
      setLoading(false);
    });
  }, [router]);

  const handleLogout = () => {
    clearAuth();
    router.push('/');
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Dashboard - Hexagone Académie</h1>
        <button onClick={handleLogout} style={{ padding: '8px 16px' }}>Déconnexion</button>
      </div>

      <p>Connecté en tant que : <strong>{user?.email}</strong> ({user?.role})</p>

      {/* Navigation selon le rôle */}
      <nav style={{ marginTop: '20px', marginBottom: '30px' }}>
        <a href="/dashboard" style={{ marginRight: '15px' }}>Ma fiche</a>
        {['coach', 'assistant_coach', 'manager', 'admin'].includes(user?.role) && (
          <a href="/dashboard/players" style={{ marginRight: '15px' }}>Joueurs</a>
        )}
        {user?.role === 'admin' && (
          <a href="/dashboard/admin">Admin</a>
        )}
      </nav>

      {/* Fiche joueur (lecture seule pour les joueurs) */}
      {profile && (
        <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
          <h2>Ma fiche joueur</h2>
          <p><strong>Pseudo :</strong> {profile.pseudo || 'Non renseigné'}</p>
          <p><strong>Rôle en jeu :</strong> {profile.game_role || 'Non renseigné'}</p>
          <p><strong>Points forts :</strong> {profile.strengths || 'Non renseigné'}</p>
          <p><strong>Points faibles :</strong> {profile.weaknesses || 'Non renseigné'}</p>
          <p><strong>Axes de progression :</strong> {profile.progression_areas || 'Non renseigné'}</p>
          {['coach', 'assistant_coach', 'manager', 'admin'].includes(user?.role) && (
            <>
              <p><strong>Notes staff :</strong> {profile.staff_notes || 'Non renseigné'}</p>
              <p><strong>Objectifs :</strong> {profile.objectives || 'Non renseigné'}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
