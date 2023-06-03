import { useState, useMemo } from "react";

import { FixedSizeList } from "react-window";

import Theme from "./components/Theme";
import { generateProducts } from "./data/products";

const products = generateProducts();

function App() {
  const [theme, setTheme] = useState("light");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const filteredProducts = useMemo(() => {
    console.log("Filtering products...");
    return products.filter((product: any) => {
      return product.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [searchQuery]);

  const rerender = useMemo(() => {
    return (Math.random() * 100).toFixed(0);
  }, [searchQuery]);

  const renderRow = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const product = filteredProducts[index];

    return (
      <div key={product.id} style={style}>
        <p>{product.name}</p>
      </div>
    );
  };

  return (
    <div>
      <Theme theme={theme} />

      <div className="flex gap-6">
        <button
          onClick={toggleTheme}
          className="mt-6 bg-red-600 text-white rounded p-4">
          Toggle Theme
        </button>
      </div>

      <input
        className="p-2 rounded mt-4 border-2 border-solid border-blue-600"
        type="text"
        placeholder="Filter products..."
        value={searchQuery}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchQuery(e.target.value)
        }
      />

      <div className="mt-6 border-solid p-5 border-4 border-blue-600 rounded">
        <h1 className="text-3xl font-bold">Products</h1>
        <p className="text-xl">Re-render {rerender}</p>

        <FixedSizeList
          height={500}
          width="100%"
          itemCount={filteredProducts.length}
          itemSize={30}>
          {renderRow}
        </FixedSizeList>
      </div>
    </div>
  );
}

export default App;
