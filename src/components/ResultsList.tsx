import { SearchResponse } from "@/services/giphyService";

interface Props {
  data?: SearchResponse;
}

export const ResultsList = ({ data }: Props) => {
  return (
    <div className="mt-6 text-sm">
      <ul className="flex flex-col gap-3 mt-3">
        {data?.data?.map((item) => (
          <li key={item.id}>
            <img
              className="rounded-md"
              src={item?.images?.downsized_medium?.url}
              alt={item.title}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
