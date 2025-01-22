# Pet Adoption Web Application

This repository contains the code for the **Pet Adoption Web Application**, a platform to facilitate the adoption of pets. The application allows users to browse, donate, and adopt pets, making it easier for pets to find loving homes.

---

## Features

### General Features:
- **Pet Listings**: Browse available pets with detailed information.
- **Donation Campaigns**: Start and contribute to donation campaigns for pets.
- **Authentication**: Secure user registration and login with Firebase.
- **Responsive Design**: Fully responsive UI built with Tailwind CSS.
- **Interactive Modals and Tooltips**: Enhanced user experience using Radix UI components.
- **Rich Text Editing**: Admins can use CKEditor to format content.
- **Dynamic Forms**: Built using Formik and React Hook Form for seamless form handling.
- **Real-time Updates**: Achieved with React Query for efficient server-state management.
- **Analytics and Charts**: Visualize adoption and donation data with Recharts.

### Technical Features:
- **SPA Navigation**: React Router DOM for seamless page navigation.
- **Cloudinary Integration**: Upload and display pet images efficiently.
- **Stripe Integration**: Handle donations securely.
- **Multi-File Upload**: Uploadcare widget for convenient file uploads.
- **Custom Animations**: TailwindCSS Animate for smooth transitions.

---

## Tech Stack

### Frontend:
- **React**: Core library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **React Query**: For managing server-state.
- **React Router**: SPA routing solution.

### Netlify and Firebase:
- **Firebase**: Authentication, Mongodb Database, and Hosting.

### Tools and Libraries:
- **CKEditor**: For rich-text editing.
- **Formik & Yup**: For form validation and handling.
- **Stripe**: For payment processing.
- **Axios**: For API communication.

---

## Installation

### Prerequisites:
- Node.js (v16 or later)
- npm (v8 or later)

### Steps:
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/pet-adoption.git
   ```
2. Navigate to the project directory:
   ```bash
   cd pet-adoption
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory and configure the following variables:
   ```env
   VITE_FIREBASE_API_KEY=your-firebase-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
   VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
   VITE_STRIPE_PUBLIC_KEY=your-stripe-public-key
   VITE_CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
   VITE_CLOUDINARY_API_KEY=your-cloudinary-api-key
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

---

## Deployment

The application can be deployed on hosting platforms like Netlify or Firebase.

### Deployment Steps:
1. Build the project:
   ```bash
   npm run build
   ```
2. Deploy the `dist` folder to your hosting platform (e.g., Netlify).
3. Configure redirects for SPA:
   - For Netlify, add a `_redirects` file in the `public` folder with the content:
     ```
     /*    /index.html   200
     ```

---

## Scripts

- **`npm run dev`**: Starts the development server.
- **`npm run build`**: Builds the project for production.
- **`npm run lint`**: Lints the codebase.
- **`npm run preview`**: Serves the production build locally.

---

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Added a new feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Create a pull request.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Acknowledgments

- [React](https://reactjs.org/) for the core library.
- [Firebase](https://firebase.google.com/) for backend support.
- [Netlify](https://www.netlify.com/) for hosting.
- [Tailwind CSS](https://tailwindcss.com/) for styling.
- [CKEditor](https://ckeditor.com/) for rich-text editing.

---


Feel free to contribute to the project or raise issues for any bugs or feature requests!

