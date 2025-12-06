import './TeamCard.css';

const TeamCard = ({ frontImage, name, title, isMainMember }) => {
  return (
    <div
      className="team-card-container"
      style={{
        maxWidth: isMainMember ? '350px' : '320px',
      }}
    >
      {/* Image Section */}
      <div className="team-image-box">
        <img src={frontImage} alt={name} />
      </div>

      {/* Text Section */}
      <div
        className="team-text-box"
        style={{
          margin: isMainMember ? '0 40px -25px 40px' : '0 65px -25px 65px',
          fontSize: isMainMember ? '1.4em' : '1.15rem',
        }}
      >
        <h4 className="team-name">
          {name.split(/\\n|\n/).map((line, index, array) => (
            <span key={index}>
              {line}
              {index < array.length - 1 && <br />}
            </span>
          ))}
        </h4>
      </div>

      {/* Title Section */}
      <div className="team-title-box">
        <h4 
          className="team-member-title"
          style={{
            fontWeight: isMainMember ? 600 : 500,
          }}
        >
          {title}
        </h4>
      </div>
    </div>
  );
};

export default TeamCard;
