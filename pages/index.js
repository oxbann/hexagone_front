export default function Home() {
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>Hexagone Académie</h1>
      <p>Plateforme de gestion des joueurs e-sport</p>
      
      <div style={{ marginTop: '40px' }}>
        <a href="/auth/login" style={{ marginRight: '20px', padding: '10px 20px', background: '#0070f3', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
          Connexion
        </a>
        <a href="/auth/register" style={{ padding: '10px 20px', background: '#28a745', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
          Inscription
        </a>
      </div>

      <div style={{ marginTop: '60px', maxWidth: '800px', margin: '60px auto', textAlign: 'left' }}>
        <h2>À propos</h2>
        <p>Hexagone Académie est une plateforme permettant aux joueurs e-sport de suivre leur progression et aux coachs de gérer les fiches de leurs joueurs.</p>
        
        <h3>Fonctionnalités</h3>
        <ul>
          <li>Création de compte joueur</li>
          <li>Accès à sa fiche personnelle</li>
          <li>Gestion des fiches par le staff (coach, assistant coach, manager)</li>
          <li>Administration des rôles par l'admin</li>
        </ul>
      </div>
    </div>
  );
}
