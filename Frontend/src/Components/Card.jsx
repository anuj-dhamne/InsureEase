const Card = ({ image, title, subtitle }) => {
    return (
      <div className="bg-white rounded-lg shadow-lg p-3 flex flex-col items-center text-center rounded-md ">
        <img src={image} alt={title} className="w-full h-40 object-cover rounded-lg" />
        <h2 className="text-xl font-bold mt-2">{title}</h2>
        <p className="text-gray-600">{subtitle}</p>
      </div>
    );
  };
  
  export default Card;
  