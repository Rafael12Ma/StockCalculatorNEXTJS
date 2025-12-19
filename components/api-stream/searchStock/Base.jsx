import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { absolute, percent } from "../calculations";

export default function Base({ stock, symbol }) {
  const pct = percent(stock.open, stock.current);
  let abs = absolute(stock.open, stock.current);

  const isUp = pct > 0;
  return (
    <>
      <div className="bg-white mt-5 rounded-2xl m-10  p-5 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
        <div className="bg-amber-50 flex flex-col gap-3">
          <div className="flex gap-2 text-sm justify-center">
            <p className="text-green-500">{stock.hightPrice?.toFixed(2)}</p>
            <p className="text-red-500">{stock.lowPrice?.toFixed(2)}</p>
          </div>
          <h3 className="text-center text-blue-800 text-lg font-bold tracking-wide ">
            {symbol}
          </h3>
          <p className="text-center text-2xl font-semibold text-zinc-900">
            ${stock.current ?? "—"}
          </p>
          <div className="flex justify-center items-center gap-3">
            <span
              className={`flex items-center gap-1 text-sm font-semibold ${
                isUp ? "text-green-600" : "text-red-600"
              }`}
            >
              {isUp ? <FaArrowUp /> : <FaArrowDown />}
              {pct !== null ? pct + "%" : "—"}
            </span>

            <span
              className={`text-sm font-medium ${
                isUp ? "text-green-600" : "text-red-600"
              }`}
            >
              {abs ? `${abs}$` : "—"}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
