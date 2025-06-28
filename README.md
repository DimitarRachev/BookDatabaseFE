# База данни с книги - Frontend

TypeScript React приложение за управление на база данни с книги, автори, издателства и жанрове.

## Технологии

- **React 18** с TypeScript
- **Material-UI (MUI)** за UI компоненти
- **React Router** за навигация
- **Axios** за HTTP заявки
- **date-fns** за работа с дати
- **Docker** за контейнеризация
- **Nginx** за reverse proxy

## Предварителни изисквания

### За локално разработване:
- Node.js 16 или по-нова версия
- npm или yarn
- Стартиран бекенд сървър на `http://localhost:8080`

### За Docker deployment:
- Docker 20.10 или по-нова версия
- Docker Compose 2.0 или по-нова версия

## Инсталация и стартиране

### 🚀 **Бързо стартиране с Docker (Препоръчително)**

1. **Клонирайте проектите**
   ```bash
   # Клонирайте backend проекта
   git clone <backend-repo-url> ../BookDatabase
   
   # Клонирайте frontend проекта
   git clone <frontend-repo-url> .
   ```

2. **Стартирайте backend и database**
   ```bash
   # От backend директорията
   cd ../BookDatabase
   docker compose up --build -d
   ```

3. **Стартирайте frontend**
   ```bash
   # От frontend директорията
   cd ../BookDatabaseFE
   docker compose up --build -d
   ```

4. **Отворете приложението**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080
   - Database: localhost:3306

### 🔧 **Локално разработване**

1. **Инсталирайте зависимостите**
   ```bash
   npm install
   ```

2. **Стартирайте бекенд сървъра** (от `C:\work\BookDatabase`)
   ```bash
   mvn spring-boot:run
   ```

3. **Стартирайте frontend приложението**
   ```bash
   npm start
   ```

4. **Отворете браузъра** на `http://localhost:3000`

### 🐳 **Docker команди**

#### **Стартиране на различни конфигурации:**

```bash
# Пълен стек (backend + frontend)
./deploy.sh full

# Само backend и database
./deploy.sh backend

# Само frontend
./deploy.sh frontend

# Показване на логове
./deploy.sh logs [frontend|backend|database]

# Спиране на всички услуги
./deploy.sh stop

# Изчистване на всичко
./deploy.sh cleanup
```

#### **Ръчни Docker команди:**

```bash
# Стартиране на frontend
docker compose up --build -d

# Стартиране на backend и database
docker compose -f docker-compose.backend.yml up --build -d

# Показване на логове
docker compose logs -f
docker compose -f docker-compose.backend.yml logs -f

# Спиране на услугите
docker compose down
docker compose -f docker-compose.backend.yml down

# Изчистване на всичко
docker compose down -v && docker system prune -f
```

## Функционалности

### Книги
- ✅ Преглед на всички книги
- ✅ Търсене по различни критерии (заглавие, автор, издателство, жанр)
- ✅ Създаване на нови книги
- ✅ Редактиране на съществуващи книги
- ✅ Изтриване на книги
- ✅ Показване на детайлна информация

### Автори
- ✅ Преглед на всички автори
- ✅ Търсене по име
- ✅ Създаване на нови автори
- ✅ Редактиране на автори
- ✅ Изтриване на автори

### Издателства
- ✅ Преглед на всички издателства
- ✅ Търсене по име, адрес, имейл
- ✅ Създаване на нови издателства
- ✅ Редактиране на издателства
- ✅ Изтриване на издателства

### Жанрове
- ✅ Преглед на всички жанрове
- ✅ Търсене по име
- ✅ Създаване на нови жанрове
- ✅ Редактиране на жанрове
- ✅ Изтриване на жанрове

## Структура на проекта

```
src/
├── components/          # Преизползваеми компоненти
│   ├── Navigation.tsx   # Навигационен компонент
│   ├── BookForm.tsx     # Форма за книги
│   ├── AuthorForm.tsx   # Форма за автори
│   ├── PublisherForm.tsx # Форма за издателства
│   └── GenreForm.tsx    # Форма за жанрове
├── pages/               # Страници на приложението
│   ├── HomePage.tsx     # Начална страница
│   ├── BooksPage.tsx    # Страница за книги
│   ├── AuthorsPage.tsx  # Страница за автори
│   ├── PublishersPage.tsx # Страница за издателства
│   └── GenresPage.tsx   # Страница за жанрове
├── services/            # API услуги
│   └── api.ts          # Конфигурация на API заявките
├── types/               # TypeScript типове
│   └── index.ts        # Дефиниции на типовете
├── App.tsx             # Основен компонент
└── index.tsx           # Точка на влизане

# Docker файлове
├── Dockerfile          # Production build
├── Dockerfile.dev      # Development build
├── docker-compose.yml  # Frontend compose файл
├── docker-compose.backend.yml # Backend compose файл
├── docker-compose.override.yml # Локални override-и
├── docker-compose.dev.yml # Development compose
├── docker-compose.test.yml # Тестов compose
├── nginx.conf          # Nginx конфигурация
├── nginx-production.conf # Production nginx
├── deploy.sh           # Deploy скрипт
├── init-db.sql         # Database инициализация
└── .dockerignore       # Docker ignore файл
```

## Docker архитектура

### 🏗️ **Разделени сервиси**
- **Frontend**: React приложение (port 3000) - управлява се отделно
- **Backend**: Spring Boot приложение (port 8080) - управлява се от backend проекта
- **Database**: MariaDB (port 3306) - управлява се от backend проекта

### 🔄 **Docker Compose файлове**
- `docker-compose.yml` - Само frontend контейнер
- `docker-compose.backend.yml` - Backend и database контейнери
- `docker-compose.override.yml` - Локални override-и за frontend

### 🌐 **Мрежа**
- Изолирани Docker мрежи за frontend и backend
- Health checks за всички сервиси
- Rate limiting и security headers

## API Endpoints

Приложението използва следните API endpoints от бекенда:

### Книги
- `GET /api/books` - Всички книги
- `GET /api/books/{id}` - Книга по ID
- `GET /api/books/search` - Общо търсене
- `GET /api/books/search/title` - Търсене по заглавие
- `GET /api/books/search/author` - Търсене по автор
- `GET /api/books/search/publisher` - Търсене по издателство
- `GET /api/books/search/genre` - Търсене по жанр
- `POST /api/books` - Създаване на книга
- `PUT /api/books/{id}` - Редактиране на книга
- `DELETE /api/books/{id}` - Изтриване на книга

### Автори
- `GET /api/authors` - Всички автори
- `GET /api/authors/{id}` - Автор по ID
- `GET /api/authors/search` - Търсене по име
- `POST /api/authors` - Създаване на автор
- `PUT /api/authors/{id}` - Редактиране на автор
- `DELETE /api/authors/{id}` - Изтриване на автор

### Издателства
- `GET /api/publishers` - Всички издателства
- `GET /api/publishers/{id}` - Издателство по ID
- `GET /api/publishers/search` - Търсене
- `POST /api/publishers` - Създаване на издателство
- `PUT /api/publishers/{id}` - Редактиране на издателство
- `DELETE /api/publishers/{id}` - Изтриване на издателство

### Жанрове
- `GET /api/genres` - Всички жанрове
- `GET /api/genres/{id}` - Жанр по ID
- `GET /api/genres/search` - Търсене по име
- `POST /api/genres` - Създаване на жанр
- `PUT /api/genres/{id}` - Редактиране на жанр
- `DELETE /api/genres/{id}` - Изтриване на жанр

## Конфигурация

### Промяна на API URL

Ако бекенд сървърът не работи на `http://localhost:8080`, променете URL-а в `src/services/api.ts`:

```typescript
const API_BASE_URL = 'http://your-backend-url:port/api';
```

### Docker environment variables

Можете да промените настройките чрез environment variables:

```bash
# Database (в docker-compose.backend.yml)
MYSQL_ROOT_PASSWORD=your_password
MYSQL_DATABASE=your_database
MYSQL_USER=your_user
MYSQL_PASSWORD=your_password

# Backend (в docker-compose.backend.yml)
SPRING_DATASOURCE_URL=jdbc:mariadb://database:3306/book_database
SPRING_DATASOURCE_USERNAME=bookuser
SPRING_DATASOURCE_PASSWORD=bookpassword
```

## Скриптове

### NPM скриптове
- `npm start` - Стартира development сървър
- `npm build` - Създава production build
- `npm test` - Стартира тестове
- `npm run eject` - Извлича конфигурацията (необратимо)

### Deploy скриптове
- `./deploy.sh full` - Deploy пълен стек
- `./deploy.sh backend` - Deploy само backend
- `./deploy.sh frontend` - Deploy само frontend
- `./deploy.sh logs [service]` - Показва логове
- `./deploy.sh stop` - Спира услугите
- `./deploy.sh cleanup` - Изчиства всичко

## Използване

### Development
1. **Стартирайте backend и database:**
   ```bash
   cd ../BookDatabase
   docker compose up --build -d
   ```

2. **Стартирайте frontend локално:**
   ```bash
   npm start
   ```

3. **Отворете браузъра** на `http://localhost:3000`

### Production
1. **Стартирайте backend:**
   ```bash
   cd ../BookDatabase
   docker compose up --build -d
   ```

2. **Стартирайте frontend:**
   ```bash
   docker compose up --build -d
   ```

3. **Отворете браузъра** на `http://localhost:3000`

## Търсене

### Книги
- Общо търсене в заглавие, описание, ISBN
- Търсене по заглавие
- Търсене по автор
- Търсене по издателство
- Търсене по жанр

### Автори
- Търсене по име (първо име, фамилия или пълно име)

### Издателства
- Търсене по име, адрес, имейл

### Жанрове
- Търсене по име на жанр

## Troubleshooting

### Често срещани проблеми

1. **Port 3000/8080/3306 е зает**
   ```bash
   # Проверете кои процеси използват портовете
   netstat -tulpn | grep :3000
   netstat -tulpn | grep :8080
   netstat -tulpn | grep :3306
   
   # Спрете процесите или променете портовете в docker-compose файловете
   ```

2. **Docker не може да build-не**
   ```bash
   # Изчистете Docker cache
   docker system prune -a
   
   # Проверете дали имате достатъчно disk space
   df -h
   ```

3. **Database connection failed**
   ```bash
   # Проверете дали database контейнерът работи
   docker compose -f docker-compose.backend.yml ps
   
   # Проверете database логовете
   docker compose -f docker-compose.backend.yml logs database
   ```

4. **Frontend не може да се свърже с backend**
   ```bash
   # Проверете дали backend контейнерът работи
   docker compose -f docker-compose.backend.yml ps
   
   # Проверете backend логовете
   docker compose -f docker-compose.backend.yml logs backend
   ```

5. **Backend не може да се build-не**
   ```bash
   # Проверете дали backend проектът съществува
   ls -la ../BookDatabase
   
   # Build-нете backend ръчно
   cd ../BookDatabase
   mvn clean package -DskipTests
   ```

6. **Frontend не се стартира**
   ```bash
   # Проверете frontend логовете
   docker compose logs frontend
   
   # Проверете дали node_modules съществува
   ls -la node_modules
   
   # Преинсталирайте зависимостите
   npm install
   ```

## Лиценз

Този проект е създаден за образователни цели. 