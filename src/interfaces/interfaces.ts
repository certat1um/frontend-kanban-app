export interface StatusColumnCards {
  name: string;
  description: string;
}

export interface IBoard {
  id: string;
  name: string;
  created_at?: string;
  updated_at?: string;
}

export interface IStatus {
  id: string;
  name: string;
  created_at?: string;
  updated_at?: string;
}

export interface ICard {
  id: string;
  title: string;
  description: string | null;
  position: number;
  status_id: string;
  board_id: string;
  created_at?: string;
  updated_at?: string;
}

export interface FullBoardData extends IBoard {
  statuses: {
    id: string;
    name: string;
    primaryColor: string;
    cards: ICard[];
  }[];
}

export interface StatusColumnData {
  id: string;
  name: string;
  primaryColor: string;
  cards: ICard[];
}
