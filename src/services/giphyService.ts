import axios from "axios";

export const search = async (
  searchTerm: string,
  limit: number,
  offset: number
) => {
  return axios.get(
    `https://api.giphy.com/v1/gifs/search?api_key=${
      import.meta.env.VITE_GIPHY_KEY
    }&q=${searchTerm}&limit=${limit}&offset=${offset}&rating=g&lang=en`
  );
};

export type SearchResponse = {
  data: Gif[];
  pagination: {
    total_count: number;
    count: number;
    offset: number;
  };
  meta: {
    status: number;
    msg: string;
    response_id: string;
  };
};

type Gif = {
  type: string;
  id: string;
  slug: string;
  url: string;
  bitly_url: string;
  embed_url: string;
  username: string;
  source: string;
  rating: string;
  content_url: string;
  user: User;
  source_tld: string;
  source_post_url: string;
  update_datetime: string;
  create_datetime: string;
  import_datetime: string;
  trending_datetime: string;
  images: Images;
  title: string;
  alt_text: string;
};

type User = unknown;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Images = Record<string, any>;
