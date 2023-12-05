# Amazon-Clone - BuyBusy

BuyBusy is a web application for the customers of an e-commerce business. It is a clone of the popular e-commerce platform, Amazon. The application is developed using React.js and Firebase.

## Goal

The goal of this project is to develop an E-Commerce application that enables individuals to browse available items, add or remove them from their shopping cart, and complete the purchasing process.

## Features

- User Registration and Login using Firebase Authentication.
- CRUD functionality for products in the cart using Firebase Firestore.
- Routing using react-router-dom for different pages.
- useContext() hook for managing user authentication and products.
- Proper state management and use of React Hooks for handling user interactions and data updates.
- High standard code quality with proper documentation.
- Search and filter functionality for products.
- Display of absence of data and loading state using react-spinners library.
- Toast messages for async actions and error conditions using react-toastify library.

## Project Structure

The project has the following structure:

```
amazon-clone
├── src
│   ├── index.js
│   ├── App.js
│   ├── components
│   │   ├── ProductCard.js
│   │   ├── Sidebar.js
│   │   └── Spinner.js
│   ├── pages
│   │   ├── HomePage.js
│   │   ├── CartPage.js
│   │   ├── LoginPage.js
│   │   ├── RegisterPage.js
│   │   └── OrdersPage.js
│   ├── context
│   │   ├── AuthContext.js
│   │   └── ProductContext.js
│   ├── firebase
│   │   └── firebaseConfig.js
│   └── utils
│       └── searchAndFilter.js
├── package.json
└── README.md
```

## Installation

To install the project, follow these steps:

1. Clone the repository.
2. Navigate to the project directory.
3. Run `npm install` to install the dependencies.
4. Run `npm start` to start the application.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)