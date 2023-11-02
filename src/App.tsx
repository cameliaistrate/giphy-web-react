import { useState } from "react";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { search, SearchResponse } from "./services/giphyService";
import { ResultsList } from "./components/ResultsList";
import SearchBar from "./components/SearchBar";
import ResultsListHeaderBar from "./components/ResultsListHeaderBar";

const queryClient = new QueryClient();

// Just a wrapper to use react-query

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

// The actual content

function AppContent() {
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);

  const searchQueryKey = ["search", searchTerm, offset];

  async function fetchGifs() {
    return await search(searchTerm ?? "", 3, offset);
  }

  const handleSubmit = (e: string) => {
    setSearchTerm(e);
    setOffset(0);
  };

  const { error, data, isFetching, isSuccess } = useQuery({
    queryKey: searchQueryKey,
    queryFn: async () => {
      const data = await fetchGifs()
        .then((res) => {
          return res.data as SearchResponse;
        })
        .catch((err) => {
          return err;
        });
      return data;
    },
    enabled: !!searchTerm,
  });

  return (
    <div className="container max-w-[600px] p-6">
      <h1 className="mb-6 font-medium text-lg">
        GIPHY GIF finder - a small React app
      </h1>

      <SearchBar isFetching={isFetching} submitSearchWord={handleSubmit} />
      <ResultsListHeaderBar
        goBack={() => {
          offset - 3 >= 0 && setOffset(offset - 3);
        }}
        goNext={() => {
          offset + 3 < data.pagination.total_count && setOffset(offset + 3);
        }}
        data={data}
        error={error}
        isFetching={isFetching}
        isSuccess={isSuccess}
      ></ResultsListHeaderBar>
      <ResultsList data={data} />
    </div>
  );
}

export default App;
