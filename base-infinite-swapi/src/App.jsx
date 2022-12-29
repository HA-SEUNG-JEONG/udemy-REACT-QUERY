import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import { InfinitePeople } from "./people/InfinitePeople";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>Infinite SWAPI</h1>
        <InfinitePeople />
        <ReactQueryDevtools />
      </div>
    </QueryClientProvider>
  );
}

export default App;
