import "./ClientCarousel.css";

function ClientCarousel() {
  const clients = [
    {
      name: "John Doe",
      company: "Tech Solutions Inc.",
      description:
        "The team at Tech Solutions Inc. was impressed with the quality of work and the professionalism displayed throughout the project. Their attention to detail and commitment to excellence made a significant impact on our business.",
      image: "./src/assets/StandardBank.png",
    },
    {
      name: "Jane Smith",
      company: "Creative Designs Ltd.",
      description:
        "Working with this team was a fantastic experience. They understood our vision and brought it to life in a way that exceeded our expectations. Their creativity and technical skills are top-notch.",
      image: "./src/assets/Discovery.png",
    },
    {
      name: "Alice Johnson",
      company: "Innovative Tech Co.",
      description:
        "We were thrilled with the results of our collaboration. The team's expertise and innovative approach helped us achieve our goals efficiently and effectively. Highly recommended!",
      image: "./src/assets/Nedbank.png",
    },
  ];
  return (
    <>
      {clients.length > 3 ? (
        <div className="client-content">
          {[...clients, ...clients].map((client, index) => (
            <div className="client-item" key={index}>
              <img
                className="client-image"
                src={client.image}
                alt="Company image"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="static-client-content">
          {clients.map((client, index) => (
            <div className="client-item" key={index}>
              <img
                className="client-image"
                src={client.image}
                alt="Company image"
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default ClientCarousel;
