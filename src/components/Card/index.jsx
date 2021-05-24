const Card = ({ data }) => {
  return (
    <div className="card">
      <h4>Destalhe do cadastro</h4>
      <p>
        <strong>Nome</strong> : {data.user} {data.name}
      </p>
      <p>
        {" "}
        <strong>Email</strong> : {data.email}
      </p>
    </div>
  );
};

export default Card;
