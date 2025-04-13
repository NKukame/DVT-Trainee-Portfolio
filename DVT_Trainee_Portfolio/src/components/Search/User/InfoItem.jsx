
export default function InfoItem({ icon, text }) {
  return (
    <div className="flex-row-center">
      <img src={icon} alt="" />
      <p>{text}</p>
    </div>
  );
}
