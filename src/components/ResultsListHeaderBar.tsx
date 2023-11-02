import { Button } from "./ui/button";
import { SearchResponse } from "@/services/giphyService";

type Props = {
  isFetching: boolean;
  isSuccess: boolean;
  data: SearchResponse;
  error: Error | null;
  goBack: () => void;
  goNext: () => void;
};

const MyComponent = ({
  isFetching,
  isSuccess,
  data,
  error,
  goBack,
  goNext,
}: Props) => {
  return (
    <div className="flex flex-row justify-between content-center items-end mt-6">
      {isFetching && (
        <>
          <span>Loading...</span>
        </>
      )}
      {error && <span>Something went wrong. Try again later.</span>}
      {isSuccess && (
        <>
          {data.pagination.count > 0 ? (
            <>
              <span>
                Displaying results {data.pagination.offset + 1} -{" "}
                {data.pagination.offset + data.pagination.count} out of{" "}
                {data.pagination.total_count}
              </span>
              <div className="flex flex-row gap-2">
                <Button variant="secondary" onClick={goBack}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>
                </Button>
                <Button variant="secondary" onClick={goNext}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </Button>
              </div>
            </>
          ) : (
            <span>No results found. Try again using different words.</span>
          )}
        </>
      )}
    </div>
  );
};

export default MyComponent;
