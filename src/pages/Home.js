import MainContent from "../components/MainContent";
import FilterBar from "../components/FilterBar";
import { useState, useEffect } from "react";
export function Home() {
  const [applyFilter, setApplyFilter] = useState(false);
  const [price, setPrice] = useState(5000);
  const [category, setCategory] = useState("none");
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen mt-10">
      {/* search bar */}
      <input
        type="text"
        className="shadow appearance-none border rounded w-3/4 h-12  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Search Item..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* apply filter button  */}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={() => setApplyFilter(!applyFilter)}
      >
        {applyFilter ? "Cancel" : "Apply Filter"}
      </button>

      {/* rendering all the products and filter bar */}
      <div className="flex flex-wrap justify-around mt-10">
        {/* is applyFilter "true" then render it  */}
        {applyFilter && (
          <FilterBar
            price={price}
            setPrice={setPrice}
            setCategory={setCategory}
          />
        )}

        {/* show all the products */}
        {/* props to apply filter on the products */}
        <MainContent
          search={search}
          price={price}
          category={category}
          applyFilter={applyFilter}
        />
      </div>
    </div>
  );
}
