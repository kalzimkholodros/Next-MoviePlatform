# NextAI Movie Platform 🎬

A modern movie streaming platform built with cutting-edge technologies, offering a seamless and engaging user experience with real-time content updates and beautiful animations.

![Project Preview](public/images/preview.png)

## 🚀 Features

- **Modern Authentication System**
  - Secure user authentication
  - JWT token-based sessions
  - Real-time auth state management

- **Dynamic Content Loading**
  - Server-side rendering for optimal performance
  - Real-time content updates
  - Infinite scroll implementation

- **Interactive UI Components**
  - Smooth animations with Framer Motion
  - Responsive design for all devices
  - Beautiful gradient effects
  - Modern glassmorphism design

- **Advanced Movie Features**
  - Like/Dislike functionality
  - Movie and TV series categorization
  - Dynamic search with instant results
  - Rating system

## 🛠️ Tech Stack

- **Frontend**
  - Next.js 14
  - TypeScript
  - Tailwind CSS
  - Framer Motion
  - Material UI Icons

- **Backend**
  - Node.js
  - Express
  - MongoDB
  - JWT Authentication

## 🏗️ Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/nextai.git
cd nextai
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

5. Start the backend server:
```bash
cd backend
npm install
npm run dev
```

## 🌐 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## 📦 Project Structure

```
nextai/
├── src/
│   ├── app/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── page.tsx
│   ├── styles/
│   └── types/
├── backend/
│   ├── models/
│   ├── routes/
│   └── server.js
├── public/
│   └── images/
└── package.json
```

## 🔥 Key Features in Detail

### Authentication System
- Secure JWT-based authentication
- Protected routes and API endpoints
- Real-time auth state management
- Persistent sessions

### Movie Platform Features
- Dynamic content loading with SSR
- Advanced search functionality
- Like/Dislike system with real-time updates
- Responsive movie grid layout
- Beautiful hover effects and animations

### UI/UX Features
- Modern glassmorphism design
- Smooth page transitions
- Interactive components
- Gradient animations
- Mobile-first responsive design

## 🚀 Performance Optimizations

- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Server-side rendering for better SEO
- Optimized animations for better performance
- Efficient state management

## 📱 Mobile Responsiveness

The platform is fully responsive and provides an optimal viewing experience across a wide range of devices:
- Desktop monitors
- Laptops
- Tablets
- Mobile phones

## 🔒 Security Features

- JWT token authentication
- Protected API routes
- Secure password hashing
- CORS protection
- Rate limiting
- XSS protection

## 🎯 Future Improvements

- [ ] Implement user profiles
- [ ] Add watchlist functionality
- [ ] Integrate recommendation system
- [ ] Add social features (comments, sharing)
- [ ] Implement progressive web app (PWA)
- [ ] Add dark/light theme toggle

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
