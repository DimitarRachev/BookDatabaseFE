# Book Database - Frontend

TypeScript React application for managing a book database with authors, publishers, and genres.

## Technologies

- **React 18** with TypeScript
- **Material-UI (MUI)** for UI components
- **React Router** for navigation
- **Axios** for HTTP requests
- **date-fns** for date handling
- **Docker** for containerization
- **Nginx** for reverse proxy

## Prerequisites

### For local development:
- Node.js 16 or newer
- npm or yarn
- Running backend server at `http://localhost:8080`

### For Docker deployment:
- Docker 20.10 or newer
- Docker Compose 2.0 or newer

## Installation and Setup

### 🚀 **Quick Start with Docker (Recommended)**

1. **Clone the projects**
   ```bash
   # Clone the backend project
   git clone <backend-repo-url> ../BookDatabase
   
   # Clone the frontend project
   git clone <frontend-repo-url> .
   ```

2. **Start backend and database**
   ```bash
   # From backend directory
   cd ../BookDatabase
   docker compose up --build -d
   ```

3. **Start frontend**
   ```bash
   # From frontend directory
   cd ../BookDatabaseFE
   docker compose up --build -d
   ```

4. **Open the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080
   - Database: localhost:3306

### 🔧 **Local Development**

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the backend server** (from `C:\work\BookDatabase`)
   ```bash
   mvn spring-boot:run
   ```

3. **Start the frontend application**
   ```bash
   npm start
   ```

4. **Open your browser** at `http://localhost:3000`

### 🐳 **Docker Commands**

#### **Starting different configurations:**

```bash
# Full stack (backend + frontend)
./deploy.sh full

# Backend and database only
./deploy.sh backend

# Frontend only
./deploy.sh frontend

# Show logs
./deploy.sh logs [frontend|backend|database]

# Stop all services
./deploy.sh stop

# Clean up everything
./deploy.sh cleanup
```

#### **Manual Docker commands:**

```bash
# Start frontend
docker compose up --build -d

# Start backend and database
docker compose -f docker-compose.backend.yml up --build -d

# Show logs
docker compose logs -f
docker compose -f docker-compose.backend.yml logs -f

# Stop services
docker compose down
docker compose -f docker-compose.backend.yml down

# Clean up everything
docker compose down -v && docker system prune -f
```

## Features

### Books
- ✅ View all books
- ✅ Search by various criteria (title, author, publisher, genre)
- ✅ Create new books
- ✅ Edit existing books
- ✅ Delete books
- ✅ View detailed information

### Authors
- ✅ View all authors
- ✅ Search by name
- ✅ Create new authors
- ✅ Edit authors
- ✅ Delete authors

### Publishers
- ✅ View all publishers
- ✅ Search by name, address, email
- ✅ Create new publishers
- ✅ Edit publishers
- ✅ Delete publishers

### Genres
- ✅ View all genres
- ✅ Search by name
- ✅ Create new genres
- ✅ Edit genres
- ✅ Delete genres

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navigation.tsx   # Navigation component
│   ├── BookForm.tsx     # Book form
│   ├── AuthorForm.tsx   # Author form
│   ├── PublisherForm.tsx # Publisher form
│   └── GenreForm.tsx    # Genre form
├── pages/               # Application pages
│   ├── HomePage.tsx     # Home page
│   ├── BooksPage.tsx    # Books page
│   ├── AuthorsPage.tsx  # Authors page
│   ├── PublishersPage.tsx # Publishers page
│   └── GenresPage.tsx   # Genres page
├── services/            # API services
│   └── api.ts          # API request configuration
├── types/               # TypeScript types
│   └── index.ts        # Type definitions
├── App.tsx             # Main component
└── index.tsx           # Entry point

# Docker files
├── Dockerfile          # Production build
├── Dockerfile.dev      # Development build
├── docker-compose.yml  # Frontend compose file
├── docker-compose.backend.yml # Backend compose file
├── docker-compose.override.yml # Local overrides
├── docker-compose.dev.yml # Development compose
├── docker-compose.test.yml # Test compose
├── nginx.conf          # Nginx configuration
├── nginx-production.conf # Production nginx
├── deploy.sh           # Deploy script
├── init-db.sql         # Database initialization
└── .dockerignore       # Docker ignore file
```

## Docker Architecture

### 🏗️ **Separated Services**
- **Frontend**: React application (port 3000) - managed separately
- **Backend**: Spring Boot application (port 8080) - managed from backend project
- **Database**: MariaDB (port 3306) - managed from backend project

### 🔄 **Docker Compose Files**
- `docker-compose.yml` - Frontend container only
- `docker-compose.backend.yml` - Backend and database containers
- `docker-compose.override.yml` - Local overrides for frontend

### 🌐 **Network**
- Isolated Docker networks for frontend and backend
- Health checks for all services
- Rate limiting and security headers

## API Endpoints

The application uses the following API endpoints from the backend:

### Books
- `GET /api/books` - All books
- `GET /api/books/{id}` - Book by ID
- `GET /api/books/search` - General search
- `GET /api/books/search/title` - Search by title
- `GET /api/books/search/author` - Search by author
- `GET /api/books/search/publisher` - Search by publisher
- `GET /api/books/search/genre` - Search by genre
- `POST /api/books` - Create book
- `PUT /api/books/{id}` - Edit book
- `DELETE /api/books/{id}` - Delete book

### Authors
- `GET /api/authors` - All authors
- `GET /api/authors/{id}` - Author by ID
- `GET /api/authors/search` - Search by name
- `POST /api/authors` - Create author
- `PUT /api/authors/{id}` - Edit author
- `DELETE /api/authors/{id}` - Delete author

### Publishers
- `GET /api/publishers` - All publishers
- `GET /api/publishers/{id}` - Publisher by ID
- `GET /api/publishers/search` - Search
- `POST /api/publishers` - Create publisher
- `PUT /api/publishers/{id}` - Edit publisher
- `DELETE /api/publishers/{id}` - Delete publisher

### Genres
- `GET /api/genres` - All genres
- `GET /api/genres/{id}` - Genre by ID
- `GET /api/genres/search` - Search by name
- `POST /api/genres` - Create genre
- `PUT /api/genres/{id}` - Edit genre
- `DELETE /api/genres/{id}` - Delete genre

## Configuration

### Changing API URL

If the backend server is not running on `http://localhost:8080`, change the URL in `src/services/api.ts`:

```typescript
const API_BASE_URL = 'http://your-backend-url:port/api';
```

### Docker environment variables

You can change the settings through environment variables:

```bash
# Database (in docker-compose.backend.yml)
MYSQL_ROOT_PASSWORD=your_password
MYSQL_DATABASE=your_database
MYSQL_USER=your_user
MYSQL_PASSWORD=your_password

# Backend (in docker-compose.backend.yml)
SPRING_DATASOURCE_URL=jdbc:mariadb://database:3306/book_database
SPRING_DATASOURCE_USERNAME=bookuser
SPRING_DATASOURCE_PASSWORD=bookpassword
```

## Scripts

### NPM Scripts
- `npm start` - Start development server
- `npm build` - Create production build
- `npm test` - Run tests
- `npm run eject` - Eject configuration (irreversible)

### Deploy Scripts
- `./deploy.sh full` - Deploy full stack
- `./deploy.sh backend` - Deploy backend only
- `./deploy.sh frontend` - Deploy frontend only
- `./deploy.sh logs [service]` - Show logs
- `./deploy.sh stop` - Stop services
- `./deploy.sh cleanup` - Clean up everything

## Usage

### Development
1. **Start backend and database:**
   ```bash
   cd ../BookDatabase
   docker compose up --build -d
   ```

2. **Start frontend locally:**
   ```bash
   npm start
   ```

3. **Open your browser** at `http://localhost:3000`

### Production
1. **Start backend:**
   ```bash
   cd ../BookDatabase
   docker compose up --build -d
   ```

2. **Start frontend:**
   ```bash
   docker compose up --build -d
   ```

3. **Open your browser** at `http://localhost:3000`

## Search

### Books
- General search in title, description, ISBN
- Search by title
- Search by author
- Search by publisher
- Search by genre

### Authors
- Search by name (first name, last name, or full name)

### Publishers
- Search by name, address, email

### Genres
- Search by genre name

## Troubleshooting

### Common Issues

1. **Port 3000/8080/3306 is busy**
   ```bash
   # Check which processes are using the ports
   netstat -tulpn | grep :3000
   netstat -tulpn | grep :8080
   netstat -tulpn | grep :3306
   
   # Stop the processes or change ports in docker-compose files
   ```

2. **Docker cannot build**
   ```bash
   # Clear Docker cache
   docker system prune -a
   
   # Check if you have enough disk space
   df -h
   ```

3. **Database connection failed**
   ```bash
   # Check if database container is running
   docker compose -f docker-compose.backend.yml ps
   
   # Check database logs
   docker compose -f docker-compose.backend.yml logs database
   ```

4. **Frontend cannot connect to backend**
   ```bash
   # Check if backend container is running
   docker compose -f docker-compose.backend.yml ps
   
   # Check backend logs
   docker compose -f docker-compose.backend.yml logs backend
   ```

5. **Backend cannot build**
   ```bash
   # Check if backend project exists
   ls -la ../BookDatabase
   
   # Build backend manually
   cd ../BookDatabase
   mvn clean package -DskipTests
   ```

6. **Frontend won't start**
   ```bash
   # Check frontend logs
   docker compose logs frontend
   
   # Check if node_modules exists
   ls -la node_modules
   
   # Reinstall dependencies
   npm install
   ```

## License

This project is created for educational purposes. 