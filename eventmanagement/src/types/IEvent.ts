export interface IEvent {
  title: string;
  description: string;
  date: Date;
  images: string[];
  comments: {
    user: string;
    content: string;
    createdAt: Date;
  }[];
  location?: string;
  createdBy: string;
}
