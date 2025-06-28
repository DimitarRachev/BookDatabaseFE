import axios from 'axios';
import { Book, Author, Publisher, Genre, SearchParams } from '../types';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Books API
export const booksApi = {
  getAll: () => api.get<Book[]>('/books'),
  getById: (id: number) => api.get<Book>(`/books/${id}`),
  create: (book: Book) => api.post<Book>('/books', book),
  update: (id: number, book: Book) => api.put<Book>(`/books/${id}`, book),
  delete: (id: number) => api.delete(`/books/${id}`),
  search: (params: SearchParams) => api.get<Book[]>('/books/search', { params }),
  searchByTitle: (title: string) => api.get<Book[]>(`/books/search/title?title=${title}`),
  searchByAuthor: (authorName: string) => api.get<Book[]>(`/books/search/author?authorName=${authorName}`),
  searchByPublisher: (publisherName: string) => api.get<Book[]>(`/books/search/publisher?publisherName=${publisherName}`),
  searchByGenre: (genreName: string) => api.get<Book[]>(`/books/search/genre?genreName=${genreName}`),
  searchByDate: (publicationDate: string) => api.get<Book[]>(`/books/search/date?publicationDate=${publicationDate}`),
  searchByDateRange: (startDate: string, endDate: string) => 
    api.get<Book[]>(`/books/search/date-range?startDate=${startDate}&endDate=${endDate}`),
  getGenres: () => api.get<string[]>('/books/genres'),
  getLanguages: () => api.get<string[]>('/books/languages'),
};

// Authors API
export const authorsApi = {
  getAll: () => api.get<Author[]>('/authors'),
  getById: (id: number) => api.get<Author>(`/authors/${id}`),
  create: (author: Author) => api.post<Author>('/authors', author),
  update: (id: number, author: Author) => api.put<Author>(`/authors/${id}`, author),
  delete: (id: number) => api.delete(`/authors/${id}`),
  search: (searchTerm: string) => api.get<Author[]>(`/authors/search?searchTerm=${searchTerm}`),
  searchByDateRange: (startDate: string, endDate: string) => 
    api.get<Author[]>(`/authors/search/date-range?startDate=${startDate}&endDate=${endDate}`),
};

// Publishers API
export const publishersApi = {
  getAll: () => api.get<Publisher[]>('/publishers'),
  getById: (id: number) => api.get<Publisher>(`/publishers/${id}`),
  create: (publisher: Publisher) => api.post<Publisher>('/publishers', publisher),
  update: (id: number, publisher: Publisher) => api.put<Publisher>(`/publishers/${id}`, publisher),
  delete: (id: number) => api.delete(`/publishers/${id}`),
  search: (searchTerm: string) => api.get<Publisher[]>(`/publishers/search?searchTerm=${searchTerm}`),
};

// Genres API
export const genresApi = {
  getAll: () => api.get<Genre[]>('/genres'),
  getById: (id: number) => api.get<Genre>(`/genres/${id}`),
  create: (genre: Genre) => api.post<Genre>('/genres', genre),
  update: (id: number, genre: Genre) => api.put<Genre>(`/genres/${id}`, genre),
  delete: (id: number) => api.delete(`/genres/${id}`),
  search: (searchTerm: string) => api.get<Genre[]>(`/genres/search?searchTerm=${searchTerm}`),
};

export default api; 