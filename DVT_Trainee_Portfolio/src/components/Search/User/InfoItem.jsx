
export default function InfoItem({ icon, text }) {
  return (
    <div className="flex-row align-items-center gap-10-px">
      <img src={icon} alt="" />
      <p className="info-text">{text} years</p>
    </div>
  );
}
