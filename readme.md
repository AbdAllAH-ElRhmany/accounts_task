# Account Transfer Task

## Overview

This task is a web application that includes a Django backend with RESTful APIs and a React frontend. The application features user account management, account transfer functionality, and import capabilities for account data.

task runtime video https://drive.google.com/file/d/1sGmdLY8YYUI2ayFutj9kwgoKhZZPu41N/view?usp=sharing

## Features

- **User Accounts**: Manage user accounts with the ability to view.
- **Account Transfer**: Transfer funds between accounts.
- **File Import/Export**: Import account data from Excel files and handle errors.
- **Real-time Updates**: Automatically update UI after successful operations using React and Django.

## Technologies Used

### Backend

- **Django**: A high-level Python web framework.
- **Django REST Framework**: For building the API endpoints.
- **Celery**: For handling asynchronous tasks like processing large files.
- **openpyxl**: For reading and writing Excel files.
- **SQLite/PostgreSQL**: For database management.
- **Redis**: For Celery's message broker (if used).
- **Repository Services DP**: To separate the data layer from the business layer.

### Frontend

- **React**: A JavaScript framework for building user interfaces.
- **React Hooks**: A features for using state and other React features in function componentsز
- **Material-UI**: A popular React UI framework.
- **Axios**: For making HTTP requests.

## Installation

### Backend

1. **Clone the repository:**

    ```bash
    git clone https://github.com/AbdAllAH-ElRhmany/accounts_task.git
    cd your-repository/server
    ```

2. **Create and activate a virtual environment:**

    ```bash
    python -m venv env
    env\Scripts\activate
    ```

3. **Install the dependencies:**

    ```bash
    pip install -r requirements.txt
    ```

4. **Run the migrations:**

    ```bash
    python manage.py migrate
    ```

5. **Start the development server:**

    ```bash
    python manage.py runserver
    ```

### Frontend

1. **Navigate to the frontend directory:**

    ```bash
    cd your-repository/client
    ```

2. **Install the dependencies:**

    ```bash
    npm install
    ```

3. **Start the development server:**

    ```bash
    npm start
    ```

## Usage

1. **Access the web application:**

    Open `http://localhost:3000` in your browser to use the React frontend.

2. **API Endpoints:**

    - **GET /api/accounts/**: List all accounts.
    - **POST /api/accounts/import_accounts/**: Import accounts from an Excel file.
    - **GET /api/accounts/{id}/**: Get details of a specific account.
    - **POST /api/accounts/{account_number}transfer/**: Transfer funds between accounts.

## Project Structure

- **server/**: Contains the Django project and database file and its configurations.
  - **accounts/**: Contains models, views, serializers, repositories, services, tests and other logic related to accounts.
  - **tasks/**: Contains Celery tasks for processing files and other asynchronous tasks.
  - **manage.py**: Django's command-line utility.
  - **requirements.txt**: Python package dependencies.

- **frontend/**: Contains the React application.
  - **src/**: Contains React components and pages.
  - **public/**: Contains static files and the HTML template.
  - **package.json**: Node.js package dependencies.


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- **Django REST Framework**: For building robust APIs.
- **React**: For creating a dynamic user interface.
- **Material-UI**: For providing a great UI framework.
- **Celery**: For handling asynchronous tasks.
- **openpyxl**: For Excel file manipulation.
