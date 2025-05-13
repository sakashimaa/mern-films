# MERN Films 🎬

![MERN Stack](https://img.shields.io/badge/MERN-Stack-blue)
![React](https://img.shields.io/badge/React-19.1.0-61DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-8.14.2-4DB33D)
![Express](https://img.shields.io/badge/Express-5.1.0-000000)
![Node.js](https://img.shields.io/badge/Node.js-20.x-339933)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.6-38B2AC)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6)

## 📋 Описание

**MERN Films** - это полнофункциональное веб-приложение для управления коллекцией фильмов, разработанное на основе стека MERN (MongoDB, Express, React, Node.js). Приложение позволяет просматривать фильмы, добавлять их в коллекцию, оставлять рецензии и управлять жанрами.

![Предпросмотр приложения](https://via.placeholder.com/800x400?text=MERN+Films+Preview)

## ✨ Особенности

- 🔐 Аутентификация пользователей (регистрация/вход)
- 👤 Профили пользователей
- 🎭 Категоризация фильмов по жанрам
- ⭐ Система рейтинга и отзывов
- 📱 Адаптивный интерфейс с использованием Tailwind CSS
- 🔒 Защищенные маршруты для зарегистрированных пользователей
- 🛡️ Административная панель для управления контентом
- 📸 Загрузка изображений для фильмов

## 🛠️ Технологии

### Frontend

- **React 19** - библиотека для создания пользовательских интерфейсов
- **Redux Toolkit** - управление состоянием приложения
- **React Router 7** - навигация и маршрутизация
- **Tailwind CSS** - стилизация компонентов
- **TypeScript** - типизация кода
- **React Toastify** - уведомления пользователя
- **Vite** - быстрая сборка приложения

### Backend

- **Node.js** - серверная платформа
- **Express** - веб-фреймворк для Node.js
- **MongoDB** - NoSQL база данных
- **Mongoose** - ORM для MongoDB
- **JWT** - аутентификация на основе токенов
- **Multer** - загрузка файлов
- **bcryptjs** - хеширование паролей

## 🚀 Установка и запуск

### Предварительные требования

- Node.js (v16 или выше)
- MongoDB (локальная установка или удаленная)
- Git

### Шаги установки

1. Клонируйте репозиторий:

```bash
git clone https://github.com/yourusername/mern-films.git
cd mern-films
```

2. Установите зависимости:

```bash
npm install
cd frontend && npm install
```

3. Создайте файл `.env` в корневой директории и добавьте:

```
PORT=7777
MONGO_URI=mongodb://localhost:27017/mern-films
JWT_SECRET=your_jwt_secret
```

4. Запустите приложение:

```bash
# Запуск бэкенда и фронтенда одновременно
npm run fullstack

# Или по отдельности
npm run backend
npm run frontend
```

5. Откройте приложение в браузере:

```
http://localhost:5173
```

## 📂 Структура проекта

```
mern-films/
├── backend/              # Серверная часть (Node.js + Express)
│   ├── config/           # Конфигурации (БД и т.д.)
│   ├── controllers/      # Обработчики запросов
│   ├── middlewares/      # Промежуточное ПО (аутентификация и т.д.)
│   ├── models/           # Модели данных Mongoose
│   ├── routes/           # Маршруты API
│   └── utils/            # Вспомогательные функции
│
├── frontend/             # Клиентская часть (React + TypeScript)
│   ├── public/           # Статические файлы
│   └── src/              # Исходный код
│       ├── assets/       # Изображения, шрифты и т.д.
│       ├── components/   # Переиспользуемые компоненты
│       ├── pages/        # Страницы приложения
│       └── redux/        # Управление состоянием
│
├── uploads/              # Загруженные файлы
├── package.json          # Зависимости и скрипты
└── README.md             # Документация
```

## 🌐 API Endpoints

### Пользователи

- `POST /api/v1/users/register` - Регистрация нового пользователя
- `POST /api/v1/users/login` - Авторизация пользователя
- `GET /api/v1/users/profile` - Получение профиля пользователя
- `PUT /api/v1/users/profile` - Обновление профиля пользователя

### Фильмы

- `GET /api/v1/movies` - Получение списка всех фильмов
- `GET /api/v1/movies/:id` - Получение информации о конкретном фильме
- `POST /api/v1/movies` - Добавление нового фильма (только для администратора)
- `PUT /api/v1/movies/:id` - Обновление фильма (только для администратора)
- `DELETE /api/v1/movies/:id` - Удаление фильма (только для администратора)
- `POST /api/v1/movies/:id/reviews` - Добавление отзыва к фильму

### Жанры

- `GET /api/v1/genre` - Получение списка всех жанров
- `POST /api/v1/genre` - Создание нового жанра (только для администратора)
- `DELETE /api/v1/genre/:id` - Удаление жанра (только для администратора)

### Загрузка файлов

- `POST /api/v1/upload` - Загрузка изображения

## 👨‍💻 Авторы

- **Ваше Имя** - _Разработчик_ - [GitHub](https://github.com/sakashimaa)

## 📄 Лицензия

Этот проект лицензирован по лицензии ISC - см. файл [LICENSE](LICENSE) для подробностей.

## 🙏 Благодарности

- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/)
- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
