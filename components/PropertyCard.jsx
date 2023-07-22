export default function PropertyCard({
  picture,
  propertyName,
  address,
  cashFlow,
}) {
  return (
    <div className="flex items-center shadow-xl">
      <img className="w-[50%]" src={picture} alt="" />
      <div className="p-2">
        <h1 className="text-xl sm:text-3xl font-semibold">{propertyName}</h1>
        <p className="sm:text-lg">{address}</p>
        <p className="sm:text-lg">
          Cashflow:{" "}
          <span className={cashFlow < 0 ? "text-red-500" : "text-green-500"}>
            ${cashFlow}
          </span>
        </p>
      </div>
    </div>
  );
}
