import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getToken, getUser } from '../../utils/auth';
import { api } from '../../utils/api';

export default function Admin() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    const userData = getUser();

    if (!token || !userData) {
      router.push('/auth/login');
      return;
    }

    // Vérifier si admin
    if (userData.role !== 'admin') {
      router.push('/dashboard');
      return;
    }

    setUser(userData);

    // Charger la liste des utilisateurs
    api.getAllUsers(token).then(data => {
      if (data.error) {
        alert(data.error);
      } else {
        setUsers(data);
      }
    });
  }, [router]);

  const handleRoleChange = async (userId, newRole) => {
    const token = getToken();
    const result = await api.updateUserRole(userId, newRole, token);
    
    if (result.error) {
      alert(result.error);
    } else {
      alert('Rôle modifié');
      // Recharger la liste
      const data = await api.getAllUsers(token);
      setUsers(data);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Administration - Gestion des rôles</h1>
      <a href="/dashboard">← Retour</a>

      <table style={{ marginTop: '30px', width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #ccc' }}>
            <th style={{ padding: '10px', textAlign: 'left' }}>ID</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Email</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Rôle actuel</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Modifier le rôle</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px' }}>{u.id}</td>
              <td style={{ padding: '10px' }}>{u.email}</td>
              <td style={{ padding: '10px' }}>
                <span style={{ 
                  padding: '4px 8px', 
                  borderRadius: '4px', 
                  background: u.role === 'admin' ? '#f00' : u.role === 'player' ? '#0a0' : '#00f',
                  color: 'white'
                }}>
                  {u.role}
                </span>
              </td>
              <td style={{ padding: '10px' }}>
                <select
                  value={u.role}
                  onChange={(e) => handleRoleChange(u.id, e.target.value)}
                  style={{ padding: '5px' }}
                >
                  <option value="player">player</option>
                  <option value="coach">coach</option>
                  <option value="assistant_coach">assistant_coach</option>
                  <option value="manager">manager</option>
                  <option value="admin">admin</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
