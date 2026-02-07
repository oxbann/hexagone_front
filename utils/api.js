const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.oxbann.com';

export const api = {
  // Auth
  register: async (email, password) => {
    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return res.json();
  },

  login: async (email, password) => {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return res.json();
  },

  // Players
  getPlayer: async (id, token) => {
    const res = await fetch(`${API_URL}/api/players/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
  },

  getAllPlayers: async (token) => {
    const res = await fetch(`${API_URL}/api/players`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
  },

  updatePlayer: async (id, data, token) => {
    const res = await fetch(`${API_URL}/api/players/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  // Admin
  getAllUsers: async (token) => {
    const res = await fetch(`${API_URL}/api/admin/users`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
  },

  updateUserRole: async (id, role, token) => {
    const res = await fetch(`${API_URL}/api/admin/users/${id}/role`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ role })
    });
    return res.json();
  }
};
