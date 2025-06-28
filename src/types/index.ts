export interface Book {
  id?: number;
  title: string;
  isbn: string;
  publicationDate: string;
  genre: Genre;
  description: string;
  pages: number;
  language: string;
  authors: Author[];
  publisher: Publisher;
}

export interface Author {
  id?: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  biography: string;
}

export interface Publisher {
  id?: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  description: string;
}

export interface Genre {
  id?: number;
  name: string;
  description: string;
}

export interface BookSummary {
  id: number;
  title: string;
  isbn: string;
  publicationDate: string;
  genre: Genre;
  authors: Author[];
  publisher: Publisher;
}

export interface SearchParams {
  searchTerm?: string;
  title?: string;
  authorName?: string;
  publisherName?: string;
  genreName?: string;
  publicationDate?: string;
  startDate?: string;
  endDate?: string;
} 