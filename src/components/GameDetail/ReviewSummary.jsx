import { ProgressBar } from "react-bootstrap";

function ReviewSummary({ resenas }) {
  const total = resenas.positivas + resenas.negativas;

  const porcentaje =
    total === 0 ? 0 : Math.round((resenas.positivas / total) * 100);

  const estado =
    porcentaje >= 70
      ? "Muy positivas"
      : porcentaje >= 40
      ? "Mixtas"
      : "Negativas";

  return (
    <>
      <p>{estado}</p>
      <ProgressBar now={porcentaje} label={`${porcentaje}% positivas`} />
    </>
  );
}

export default ReviewSummary;
