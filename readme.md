## Library Management System API

#### **Description**

Develop a backend API for a **Library Management System** that allows members to manage books, memberships, and borrowing activities. The API supports CRUD (Create, Read, Update, Delete) operations for books, members, and borrow records, with additional endpoints for borrowing and returning books.

---

#### **Features**

- **Book Management**: 
  - Create, read, update, and delete books.
  - Each book has attributes such as title, author, genre, availability, and number of copies.

- **Member Management**: 
  - Add, view, update, and remove members.
  - Members can borrow and return books, track overdue books, and view borrowing history.

- **Borrow and Return Books**:
  - Members can borrow books with due dates.
  - Staff can manage returns and update availability.
  
- **Overdue Tracking**: 
  - Track overdue borrowed books, and list all overdue books.

- **Advanced Querying**:
  - Search books by title, author, or genre.
  - Sort books by title, author, or publication date.
  - Filter books based on availability or genre.
  - Paginate through the books list to limit results.

---

#### **Technology Stack**

- **Prisma ORM**: For database schema management and querying.
- **Node.js**: Server-side runtime environment.
- **PostgreSQL**: Relational database for storing data.
- **Express.js**: Framework for handling API requests.
- **TypeScript**: For type-safe JavaScript development.

---

#### **Local Setup**

Follow these steps to set up the project locally:

1. **Clone the repository**:
   ```bash
   https://github.com/monishatBaishnab/LibraryManagementSystem
   cd LibraryManagementSystem
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up the database**:
   - Ensure PostgreSQL is installed and running on your machine.
   - Create a new database for the project.
   - Copy the `.env.example` file to `.env` and update the `DATABASE_URL` with your database connection string.

4. **Run migrations**:
   - Prisma will create and update the database schema based on the Prisma migration:
   ```bash
   npx prisma migrate dev --name init
   ```

5. **Start the development server**:
   ```bash
   npm run dev
   ```

---

#### **API Documentation**:

The API will be available at [http://localhost:3000](http://localhost:3000).

You can explore the available endpoints using tools like **Postman** or directly through the API documentation. Below are some of the key endpoints:

- **Books**
  - `GET /books`: Get a list of all books.
  - `POST /books`: Create a new book.
  - `PUT /books/:id`: Update a book's details.
  - `DELETE /books/:id`: Delete a book.

- **Members**
  - `GET /members`: Get a list of all members.
  - `POST /members`: Add a new member.
  - `PUT /members/:id`: Update member details.
  - `DELETE /members/:id`: Remove a member.

- **Borrowing**
  - `POST /borrow/`: Borrow a book.
  - `POST /return/`: Return a book.
  
- **Overdue**
  - `GET /overdue`: Get a list of overdue books.

---
