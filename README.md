# Product Catalog Application

A responsive product catalog built with **React**, **TypeScript**, **Zustand**, and **Tailwind CSS**. This project demonstrates the ability to create dynamic and user-friendly applications with a focus on functionality and maintainability.

## Features

- **Responsive Design**: A grid-based layout optimized for all screen sizes.
- **Live Search**: Filter products in real-time.
- **Pagination**: Navigate through products efficiently.
- **Sorting Options**: Sort products by price and rating.
- **State Management**: Utilized Zustand for lightweight and efficient state management.
- **Type Safety**: Implemented TypeScript to ensure robust and predictable code.
- **Dark Mode**: User-friendly theme toggling for better accessibility.
- **Unit Testing**: Critical components are covered with tests to ensure reliability.
- **API Integration**: Fetches product data dynamically from [Fake Store API](https://fakestoreapi.com/products).

---

## Getting Started

### Prerequisites

Ensure the following are installed on your system:

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)

### Installation

1. **Clone the repository**:

```bash
  git clone [<repository-url>](https://github.com/tmeechh/Wingmen)
```

2. **Install dependencies**:
   ```bash
   npm install

3. **Start the development server**:
   ```bash
   npm run dev

3. **Open the application in your browser: Navigate to**:
  ```bash
 http://localhost:5173

```

### Deployment

The application is deployed on Vercel. Visit the live version here: Live App Link [(wingmen)](https://wingmenstore.vercel.app/).

```

### Folder Structure

src/
-├──  __mocks__  # Contains custom Jest mocks for modules like static assets.
-├── assets/ # Static assets like images.
-├── components/ # Reusable components.
-├── pages/ # Page components for routing.
-├── fonts/ # fonts used in the project.
-├── store/ # Zustand state management.
-├── tests/ # Unit tests for components.
-├── types/ # TypeScript types.
-├── App.tsx # Main app component.
-├── main.tsx # Entry point.
-├── index.css # Tailwind CSS styles.

#### `__mocks__`
This folder contains custom mock implementations for Jest. It is particularly useful for testing
files or modules that Jest cannot process natively, such as static assets (e.g., images). For example,
 the `fileMock.ts` file in this folder is used to mock image imports during testing.


### To-Do List

-✅Responsive grid and list views.
-✅Live search bar.
-✅Pagination.
-✅Sorting by price/rating.
-✅Unit tests for critical components.
-✅Dark mode support.
-✅Contributing

### Contributions are welcome!

Feel free to fork the repository and submit pull requests. For issues or suggestions, please open a ticket.

### License

This project is licensed under the MIT License.




