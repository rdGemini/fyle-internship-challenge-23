# Angular Application

This is a sample Angular application demonstrating the use of components, services, HTTP requests, and unit tests.

## Features

- Fetch user details from the GitHub API.
- Display user details including avatar, name, bio, location, etc.
- Fetch and display repositories for a given user.
- Search repositories by name.
- Set maximum repositories per page.

## Installation

To run this application locally, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Run `npm install` to install dependencies.
4. Run `ng serve` to start the development server.
5. Open your browser and navigate to `http://localhost:4200`.

## Usage

- Enter a GitHub username in the input field to fetch user details and repositories.
- Set the maximum number of repositories per page using the dropdown menu.
- Search for repositories by name using the search input field.

## Technologies Used

- Angular
- TypeScript
- HTML/CSS
- Bootstrap (for styling)
- HttpClient (for HTTP requests)
- RxJS (for reactive programming)

## Unit Tests

This application includes unit tests to ensure the correctness of its functionality. To run the unit tests, execute the following command: ng test

Repository list test suite covers the following scenarios:

Checks if the component is created successfully.
Tests if the repositories are displayed correctly.
Verifies that repositories are not displayed when the repositories array is empty.

This will launch the Karma test runner and execute all unit tests defined in the application. You can view the test results in the terminal.

GitHub Service test suite verifies that the GithubService behaves correctly when making HTTP requests and handling responses. It uses Angular's HttpClientTestingModule for mocking HTTP requests and responses.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please fork the repository and create a pull request with your changes.
