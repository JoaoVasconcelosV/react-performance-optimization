import { Suspense, lazy } from "react";

const HeavyComponent = lazy(() => import("./components/HeavyComponent"));

function App() {
  return (
    <div>
      <h1>My App</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <HeavyComponent />
      </Suspense>
    </div>
  );
}

export default App;
