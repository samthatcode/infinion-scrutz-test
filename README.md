# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Infinion Technologies - Graduate Trainee Assessment

## Project Overview

This project is part of the Graduate Trainee Assessment at Infinion Technologies for the Frontend Developer role. The main objective of this project is to create a campaign management interface using React and Tailwind CSS, integrating it with a backend API to manage campaign data.

## Features

- **Home Page**: A welcoming landing page with a "Get Started" button that navigates to the signup page.
- **Campaign Management**: Users can create, view, edit, and delete campaigns.
- **Campaign Overview**: A dashboard showing all campaigns with filtering, searching, and pagination functionalities.
- **Sign-Up and Login**: Added user authentication using mock data for signup and login functionalities.

## Implementation Details

- **React**: Used for building the user interface.
- **Tailwind CSS**: Used for styling the components.
- **Axios**: Used for making HTTP requests to the backend API.
- **Axios Mock Adapter**: Used for simulating backend API calls for signup and login.
- **State Management**: Managed using React's useState and useEffect hooks.

## Endpoints

- `GET /api/Campaign`: Fetch all campaigns.
- `POST /api/Campaign`: Create a new campaign.
- `GET /api/Campaign/{id}`: Fetch a campaign by ID.
- `PUT /api/Campaign/{id}`: Update a campaign by ID.
- `DELETE /api/Campaign/{id}`: Delete a campaign by ID.
- `PUT /api/CampaignStatus/{id}`: Update the status of a campaign by ID.

## How to Run the Project

1. Clone the repository:
   ```bash
   git clone https://github.com/samthatcode/infinion-scrutz-test.git

2.   
    ```bash
    cd infinion-scrutz-test
    