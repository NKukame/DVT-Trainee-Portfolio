import PropTypes from "prop-types";

export default function InfoItem({ icon, text }) {
  return (
    <div className="flex-row-center">
      <img src={icon} alt="" />
      <p className="info-text">{text}</p>
    </div>
  );
}

InfoItem.propTypes =  {
  icon: PropTypes.string,
  text: PropTypes.string
}