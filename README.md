# 🎓 StudyNotion — Full-Stack EdTech Platform

StudyNotion is a full-stack educational technology platform designed to make online learning accessible and interactive. It connects students and instructors through a centralized platform where students can explore courses, learn from instructors, track their progress, and manage their learning journey.

Built using the MERN stack, StudyNotion combines a React frontend with a Node.js and Express backend, MongoDB for data storage, and integrations for cloud media management, email notifications, and online payments.

## ✨ Features

### 👨‍🎓 Student Features

* **User Authentication:** Register, log in, and securely manage your account.
* **Email Verification:** Verify user accounts through email-based verification.
* **Course Discovery:** Browse available courses and explore different categories.
* **Course Details:** View course descriptions, instructor information, ratings, and course content.
* **Course Enrollment:** Access courses through the platform's enrollment and payment workflows.
* **Learning Interface:** View course sections, subsections, and video content.
* **Progress Tracking:** Track learning progress through enrolled courses.
* **Ratings and Reviews:** Share feedback and review courses.
* **Profile Management:** Update personal information and profile pictures.
* **Password Management:** Reset forgotten passwords and update account credentials.

### 👨‍🏫 Instructor Features

* **Course Creation:** Create and publish educational courses.
* **Course Management:** Edit course information and manage existing courses.
* **Content Organization:** Structure courses into sections and subsections.
* **Media Uploads:** Upload course-related media using Cloudinary integration.
* **Instructor Dashboard:** View course information and performance statistics.
* **Course Editing:** Update course details and learning materials.

### 🔐 Platform Features

* JWT-based authentication and protected routes.
* Password hashing using bcrypt.
* Email notifications using Nodemailer.
* MongoDB database integration using Mongoose.
* Cloudinary integration for media storage.
* Razorpay integration for payment processing.
* Contact form functionality.
* Redux Toolkit for frontend state management.
* Responsive user interface built with React and Tailwind CSS.

## 🛠️ Tech Stack

### Frontend

| Technology      | Purpose                              |
| --------------- | ------------------------------------ |
| React           | Component-based user interface       |
| Vite            | Development server and build tool    |
| Tailwind CSS    | Styling and responsive layouts       |
| React Router    | Client-side navigation               |
| Redux Toolkit   | Global state management              |
| React Redux     | Connecting React components to Redux |
| Axios           | HTTP requests to backend APIs        |
| React Hook Form | Form handling and validation         |
| React Hot Toast | Notifications and user feedback      |
| React Icons     | UI icons                             |

### Backend

| Technology         | Purpose                          |
| ------------------ | -------------------------------- |
| Node.js            | JavaScript runtime               |
| Express.js         | REST API and server-side routing |
| MongoDB            | NoSQL database                   |
| Mongoose           | Database schemas and queries     |
| JSON Web Token     | Authentication                   |
| bcrypt             | Password hashing                 |
| Cloudinary         | Cloud-based media storage        |
| Razorpay           | Payment integration              |
| Nodemailer         | Email delivery                   |
| OTP Generator      | One-time password generation     |
| Cookie Parser      | Cookie handling                  |
| dotenv             | Environment variable management  |
| express-fileupload | File upload handling             |

## 🏗️ Application Architecture

```text
                    StudyNotion
                        |
             +----------+----------+
             |                     |
             v                     v
       React Frontend         Express Backend
          (Vite)                 (Node.js)
             |                     |
             |                 REST APIs
             |                     |
             |         +-----------+-----------+
             |         |           |           |
             v         v           v           v
          Redux     MongoDB    Cloudinary   Razorpay
          State     Database   Media Store  Payments
                        |
                        v
                  Email Services
                   (Nodemailer)
```

## 📁 Project Structure

```text
Study-notion-/
│
├── public/
│   └── Static public assets
│
├── src/
│   ├── assets/
│   │   └── Images and media
│   │
│   ├── components/
│   │   ├── common/
│   │   └── core/
│   │       ├── Dashboard/
│   │       ├── HomePage/
│   │       └── ViewCourse/
│   │
│   ├── data/
│   │   └── Navigation and application data
│   │
│   ├── hooks/
│   │   └── Custom React hooks
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Catalog.jsx
│   │   ├── Contact.jsx
│   │   ├── CourseDetails.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   └── ViewCourse.jsx
│   │
│   ├── services/
│   │   ├── apiconnector.js
│   │   ├── apis.js
│   │   └── operations/
│   │
│   ├── slices/
│   │   └── Redux state slices
│   │
│   ├── utils/
│   │   └── Helper functions
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── Server/
│   ├── config/
│   │   ├── database.js
│   │   ├── cloudinary.js
│   │   └── razorpay.js
│   │
│   ├── controllers/
│   │   ├── Auth.js
│   │   ├── Course.js
│   │   ├── Categories.js
│   │   ├── Payments.js
│   │   ├── Profile.js
│   │   ├── RatingAndReview.js
│   │   └── ResetPassword.js
│   │
│   ├── mail/
│   │   └── templates/
│   │
│   ├── middlewares/
│   │   └── auth.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Course.js
│   │   ├── Category.js
│   │   ├── Section.js
│   │   └── SubSection.js
│   │
│   ├── routes/
│   │   ├── User.js
│   │   ├── Course.js
│   │   ├── Profile.js
│   │   ├── Payments.js
│   │   └── Contact.js
│   │
│   ├── utils/
│   ├── index.js
│   └── package.json
│
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 Getting Started

Follow these instructions to run the project locally.

### Prerequisites

Make sure you have installed:

* Node.js
* npm
* MongoDB, either locally or through MongoDB Atlas
* A Cloudinary account for media uploads
* A Razorpay account for payment functionality
* SMTP or email service credentials for email functionality

### 1. Clone the Repository

```bash
git clone https://github.com/7471ashish/Study-notion-.git
```

Navigate into the project directory:

```bash
cd Study-notion-
```

### 2. Install Frontend Dependencies

From the project root, run:

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file inside the `Server` directory.

Example configuration:

```env
PORT=4000

MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret

RAZORPAY_KEY=your_razorpay_key_id
RAZORPAY_SECRET=your_razorpay_key_secret

MAIL_HOST=your_smtp_host
MAIL_USER=your_email_address
MAIL_PASS=your_email_or_smtp_password
```

**Important:** These are example placeholders. Check the backend configuration files and controllers to confirm the exact environment variable names required by your implementation.

Never commit your actual credentials or `.env` file to GitHub.

### 4. Install Backend Dependencies

Open a terminal and navigate to the backend directory:

```bash
cd Server
npm install
```

### 5. Start the Backend Server

While inside the `Server` directory, run:

```bash
npm run dev
```

The backend uses port `4000` by default unless another port is specified in the environment variables.

### 6. Start the Frontend

Open a second terminal in the project root:

```bash
npm run dev
```

Vite will display a local development URL in your terminal, usually:

```text
http://localhost:5173
```

Open this URL in your browser.

### Run Both Servers Together

The root `package.json` also defines a script for starting the frontend and backend concurrently:

```bash
npm run devu
```

Run this command from the project root after installing the dependencies and configuring the environment variables.

## 🔌 Backend API Routes

The Express backend organizes its endpoints into the following route groups:

| Base Route        | Purpose                                    |
| ----------------- | ------------------------------------------ |
| `/api/v1/auth`    | Authentication and user account operations |
| `/api/v1/profile` | Profile management                         |
| `/api/v1/course`  | Course browsing, creation, and management  |
| `/api/v1/payment` | Payment-related operations                 |
| `/api/v1/reach`   | Contact form functionality                 |

Refer to the files inside `Server/routes/` for the individual endpoints and their expected request formats.

## 🔒 Security

The project includes several security-related mechanisms:

* JWT-based authentication.
* Password hashing using bcrypt.
* Protected backend routes.
* Environment-based configuration for sensitive credentials.
* Email verification and password reset workflows.

### Security Best Practices

* Never upload API keys, database credentials, or payment secrets to a public repository.
* Use strong, unique values for JWT secrets.
* Restrict CORS to trusted frontend origins in production.
* Validate incoming requests and uploaded files.
* Verify payment transactions on the backend.
* Use HTTPS when deploying publicly.
* Apply appropriate authorization checks to protected resources.

## 🧪 Available Scripts

### Frontend

Run these commands from the repository root.

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Starts the Vite development server       |
| `npm run build`   | Builds the frontend for production       |
| `npm run preview` | Previews the production build            |
| `npm run lint`    | Runs ESLint                              |
| `npm run server`  | Starts the backend using the root script |
| `npm run devu`    | Starts frontend and backend concurrently |

### Backend

Run these commands from the `Server` directory.

| Command       | Description                      |
| ------------- | -------------------------------- |
| `npm run dev` | Starts the backend using Nodemon |
| `npm start`   | Starts the backend using Node.js |

## 🔮 Future Improvements

Potential enhancements include:

* Automated testing for authentication, course management, and payments.
* API documentation with example requests and responses.
* Improved centralized error handling and logging.
* Enhanced frontend loading and error states.
* Production deployment documentation.
* CI workflows for automated linting and build verification.
* Improved accessibility and mobile responsiveness.

## 🤝 Contributing

Contributions and suggestions are welcome!

1. Fork the repository.
2. Create a new feature branch.
3. Implement your changes.
4. Test the application.
5. Submit a pull request describing your improvements.

## 👨‍💻 Author

**Ashish Bansal**

* GitHub: [@7471ashish](https://github.com/7471ashish)
* Project Repository: [StudyNotion](https://github.com/7471ashish/Study-notion-)

---

⭐ If you find this project useful, consider giving the repository a star!
