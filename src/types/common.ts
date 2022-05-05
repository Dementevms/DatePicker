export type Post = {
  id: number;
};

export type Notification = {
  id: number;
  fixed: boolean;
  title: string;
  desc: string;
  details: Details;
  game: string;
  date: Date;
  task: string;
};

export type Details = {
  variant: "text" | "metrics";
  value: string[] | Metric[];
};

export type Metric = {
  value: string;
  label: string;
};
