## Website link : https://pet-adoption-qp10.onrender.com


# 🐾 Pet Adoption Hub

## 📌 Project Overview

Pet Adoption Hub is a user-friendly platform that allows people to explore pet listings, book adoption appointments, and manage adoptions. The system includes admin tools for viewing and deleting appointments.

## 🚀 Features

- ✅ **User Authentication (Signup/Login)**
- ✅ **View Pet Listings**
- ✅ **Book Appointments with Unique Codes**
- ✅ **Admin Panel to View and Delete Appointments**
- ✅ **Secure Password Validation and Email Verification**
- ✅ **Responsive UI with Tailwind CSS**

## 🛠️ Technologies Used

- **Frontend:** HTML5, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Styling:** Tailwind CSS (CDN)
- **Authentication:** bcrypt.js for password hashing
- **Email Verification:** Hunter.io API

## 📂 Folder Structure

```
📁 pet_adoption/
   ├── html_pages/
   │   ├── index.html
   │   ├── signup.html
   │   ├── login.html
   │   ├── home.html
   │   ├── adopt.html
   │   ├── account_confirmation.html
   │   └── view_appointments.html
   ├── js/
   │   ├── adopt.js
   │   ├── appointment.js
   │   ├── signup.js
   │   └── login.js
   ├── media/
   ├── server.js
   ├── database.js
   ├── .env
   ├── package.json
   ├── README.md
   └── vercel.json 
```

## 📥 Installation & Running Locally

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/yourusername/pet_adoption.git
cd pet_adoption
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file in the root folder and add:
```env
MONGO_URI= only available for the admin (contact admin)
HUNTER_API_KEY= contact admin
PORT=3000
```

### 4️⃣ Run the Server
```sh
node server.js
```
App will be available at: [http://localhost:3000](http://localhost:3000)

## 🛤️ Routes Overview

| Route | Description |
|--------|-------------|
| `/` | Homepage (Login/Signup) |
| `/signup` | User Signup |
| `/login` | User Login |
| `/home.html` | Pet Listings Page |
| `/adopt.html` | Book Appointment for Adoption |
| `/view-appointments` | Admin View of Appointments |
| `/delete-appointment` | Admin Deleting an Appointment |

## 📡 Deployment (Render/Vercel)

### Deploying on Render:

1. Push your code to GitHub:
   ```sh
   git add .
   git commit -m "Deploy to Render"
   git push origin main
   ```
2. Go to Render Dashboard → **New Web Service**
3. Connect your GitHub repository
4. Add environment variables (`MONGO_URI`, `HUNTER_API_KEY`, `PORT`)
5. Click **Deploy** 🎉

### Deploying on Vercel:

1. Install Vercel CLI:
   ```sh
   npm install -g vercel
   ```
2. Run Vercel setup:
   ```sh
   vercel
   ```
3. Once deployed, your app will be live on Vercel 🚀

## 🗃️ Database Collections

- **Users**: Stores user details (name, email, hashed password).
- **Appointments**: Stores booked appointment details.

## 📌 Roadmap (Future Updates)
- 🔹 Add a pet search feature
- 🔹 Improve UI with more customization
- 🔹 Implement a notification system for appointments

## 🎉 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss the changes.

## 📜 License
This project is open-source and available under the **MIT License**.
