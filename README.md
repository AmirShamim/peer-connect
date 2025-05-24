# PeerConnect

> _A modern student networking platform built with React_

[![React](https://img.shields.io/badge/React-19.x-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC.svg)](https://tailwindcss.com/)

## 🎯 Overview

PeerConnect is a React-powered student networking application designed to help college students discover and connect with peers beyond their immediate academic circles. Think of it as a streamlined, student-focused version of LinkedIn that facilitates meaningful connections through shared interests, skills, and project collaboration opportunities.

## 🚀 Live Demo

[View PeerConnect in Action](https://amirshamim.github.io/peer-connect/)

## 📋 Table of Contents

- [Problem & Solution](#-problem--solution)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Key Components](#-key-components)
- [Development Highlights](#-development-highlights)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)

## 🎯 Problem & Solution

### The Challenge

College students often struggle to discover and network with peers outside their immediate classes or social circles, limiting opportunities for collaboration, skill sharing, and academic growth.

### Our Solution

PeerConnect provides a dedicated platform where students can:

- **Build comprehensive profiles** showcasing their skills, interests, and academic background
- **Discover fellow students** through intelligent search and filtering capabilities
- **Establish meaningful connections** with peers who share similar interests or complementary skills
- **Track shared interests** and identify potential collaboration opportunities

## ✨ Features

### 🔐 Authentication & Profile Management

- Secure mock authentication system with session persistence
- Comprehensive profile creation including personal details, skills, and bio
- Real-time profile editing with form validation
- Automatic skill tracking for intelligent matching

### 🔍 Student Discovery

- Grid-based browsing interface with 50+ diverse student profiles
- Real-time search functionality by name and keywords
- Department-based filtering for targeted discovery
- Progressive loading with "Load More" pagination
- Detailed student cards with connection status indicators

### 🤝 Connection Management

- Streamlined connect/disconnect workflow with confirmation dialogs
- Dynamic connection status tracking (pending, connected, not connected)
- Real-time UI updates with smooth loading animations
- User-friendly confirmation modals for disconnection actions

### 📊 Dashboard Analytics

- Real-time connection count tracking
- Intelligent skills matching calculations across your network
- Shared project areas identification and statistics
- Clean, card-based metrics display with professional styling

### 🎨 User Experience

- **Mobile-first responsive design** that works beautifully on all devices
- **Professional typography** using Google Fonts (Playfair Display, Space Grotesk, Inter)
- **Consistent color palette** with carefully chosen accessible colors
- **Smooth animations** and micro-interactions for enhanced user engagement
- **Accessibility features** including ARIA labels and semantic HTML structure

## 🛠 Technology Stack

### Frontend Framework

- **React 18.x** - Modern functional components with hooks
- **Vite** - Lightning-fast development and build tool
- **JavaScript (ES6+)** - Clean, modern syntax and features

### Styling & Design

- **Tailwind CSS** - Utility-first CSS framework for rapid development
- **Google Fonts** - Professional typography (Playfair Display, Space Grotesk, Inter)
- **Custom CSS** - Enhanced styling for specific components and animations

### State Management & Data

- **React Hooks** - Efficient local state management with useState and useEffect
- **localStorage** - Client-side data persistence for user sessions and preferences
- **Mock Data** - Comprehensive dataset with 50+ realistic student profiles

## 🚀 Getting Started

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/AmirShamim/peer-connect.git
   cd peer-connect
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see PeerConnect in action!

### Building for Production

```bash
npm run build
# or
yarn build
```

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Shared components (Button, Navbar, etc.)
│   └── layout/          # Layout-specific components
├── features/            # Feature-specific components
│   ├── auth/           # Authentication pages and logic
│   ├── dashboard/      # Dashboard and analytics
│   ├── discovery/      # Student browsing and search
│   ├── connections/    # Connection management
│   └── profile/        # Profile management
├── services/           # Business logic and API calls
├── data/              # Mock data and constants
```

## 🔧 Key Components

### StudentCard Component

The heart of student discovery, featuring:

- Dynamic connection state management
- Smooth animations and loading states
- Unified connect/disconnect interface
- Professional card design with hover effects

### Dashboard Analytics

Real-time metrics including:

- Total connections counter
- Skills matching algorithm with intelligent parsing
- Shared project areas calculation
- Visual statistics with engaging animations

### Search & Filter System

Advanced discovery features:

- Real-time search with instant results
- Department-based filtering
- Efficient client-side algorithms
- Smooth user experience with loading states

## 💡 Development Highlights

### Technical Achievements

- **Component Architecture**: 15+ modular, reusable components with clear separation of concerns
- **State Synchronization**: Efficient callback-based updates ensuring consistency across components
- **Performance Optimization**: Client-side search algorithms with optimized re-renders
- **Error Handling**: Graceful degradation with fallback avatars and comprehensive error states

### Advanced Features

- **Smart Skills Matching**: Sophisticated string parsing and Set-based algorithms for accurate skill comparisons
- **Real-time Search**: Instant client-side filtering with multiple criteria support
- **Data Persistence**: Seamless localStorage integration for user sessions and preferences
- **Responsive Design**: Mobile-first approach ensuring consistent experience across all devices

### Code Quality Standards

- Clean, maintainable code with consistent formatting
- Comprehensive component documentation
- Efficient React hooks implementation
- Modern JavaScript best practices

## 🛤 Roadmap

### Phase 1: Backend Integration

- [ ] Real authentication system with JWT tokens
- [ ] PostgreSQL/MongoDB database integration
- [ ] RESTful API development
- [ ] User data synchronization

### Phase 2: Potential Enhanced Features

- [ ] Real-time messaging system between connected students
- [ ] Advanced search with AI-powered ranking algorithms
- [ ] Project collaboration workspaces
- [ ] Campus event discovery and organization

### Phase 3: Advanced Capabilities

- [ ] WebSocket integration for real-time features
- [ ] Progressive Web App (PWA) functionality
- [ ] AI-powered connection recommendation engine
- [ ] Mobile app development (React Native)

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**

- GitHub: [@AmirShamim](https://github.com/AmirShamim)
- LinkedIn: [Amir Shamim](https://www.linkedin.com/in/amir-shamim-4057b8282/)
- Email: amirshamim412@gmail.com

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first approach
- Google Fonts for beautiful typography
- The open-source community for inspiration and resources

---

<div align="center">
  <p>Built with ❤️ for students, by students</p>
  <p>⭐ Star this repo if you found it helpful!</p>
</div>
