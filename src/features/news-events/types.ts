export interface NewsEvent {
  id: number;
  campus_id: string;
  campus_name: string;
  title: string;
  content: string;
  type: 'News' | 'Seminar' | 'Cultural' | 'Announcement';
  date: string;
  image_url: string;
}
