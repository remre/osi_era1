export interface IEvent {
  title: string;
  description: string;
  date: Date;
  images: string[];
  comments: Array<{ user: string; content: string; createdAt: Date }>;
  createdBy: string;
  attendees: string[];
}
