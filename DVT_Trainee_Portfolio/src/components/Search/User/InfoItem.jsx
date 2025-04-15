
export default function InfoItem({ icon, text }) {
  return (
    <div className="flex-row-center">
      <img src={icon} alt="" />
      <p className="info-text">{text} years</p>
    </div>
  );
}
