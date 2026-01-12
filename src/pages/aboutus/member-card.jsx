import "./member-card.css";

function MemberCard({ nombre, rol, imagen }) {
    return (
    <div className="member-card">
        <img src={imagen} alt={nombre}/>
        <h3>{nombre}</h3>
        <p>{rol}</p>
    </div>
    )
}

export default MemberCard
