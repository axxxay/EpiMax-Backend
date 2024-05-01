# EpiMax Backend Task

This is a simple Task Manager backend built with Node.js, express.js, and SQLite. It consists of a 8 API endpoints.

## Prerequisites

Before you begin, ensure you have met the following requirements:

* You have installed the latest version of [Node.js and npm](https://nodejs.org/en/download/)

## Installing EpiMax-Backend Task

To install EpiMax-Backend, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/axxxay/EpiMax-Backend.git
    ```

2. Navigate into the project directory:
    ```bash
    cd EpiMax-Backend
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```
4. Deployed App Link [https://epimax-backend-tqfo.onrender.com](https://epimax-backend-tqfo.onrender.com)

## Setting Up Environment Variables

This project uses environment variables for configuration. These are stored in a `.env` file at the root of the project. 

To set up the environment variables:

1. Create a new file in the root directory of the project named `.env`.

2. Open the `.env` file and add your environment variables as key-value pairs. For example:

    ```bash
    JWT_SECRET=epimax
    ```

Replace `epimax` with your actual jwt secret, respectively.

3. Save the `.env` file. The application will now use these values when running.

**Note:** Never commit the `.env` file to your repository. It contains sensitive information and should be added to your `.gitignore` file.

## Running EpiMax-Backend Task

To run EpiMax-Backend Task, follow these steps:

1. Start the development server:
    ```bash
    node app.js or nodemon app.js
    ```

2. Open your web browser and visit [http://localhost:5000](http://localhost:5000)

3. To test API endpoints navigate to this end-point
    ```
    /api/docs
    ```
