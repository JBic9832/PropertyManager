import Link from "next/link";

export default function PropertyCard({
  picture,
  propertyName,
  address,
  cashFlow,
  id,
}) {
  return (
    <Link href={`/app/properties/${id}`}>
      <div className="flex items-center shadow-lg h-32 md:h-40 lg:h-52">
        <div className="w-32 h-32 md:h-40 md:w-40 lg:h-52 lg:w-52 flex justify-center">
          <img className="object-cover h-full" src={picture} alt="" />
        </div>
        <div className="p-2 md:p-4 lg:p-6">
          <h1 className="text-xl sm:text-3xl font-semibold whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px] sm:max-w-full">
            {propertyName}
          </h1>
          <p className="sm:text-lg">{address}</p>
          <p className="sm:text-lg">
            Cashflow:{" "}
            <span className={cashFlow < 0 ? "text-red-500" : "text-green-500"}>
              ${cashFlow}
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
}
