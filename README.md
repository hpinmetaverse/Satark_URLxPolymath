# SatarkURL

A comprehensive cybersecurity analysis platform for PCAP file analysis and network traffic visualization. Built with React, TypeScript, and modern charting libraries.

## Features

- **PCAP File Analysis**: Upload and analyze network traffic capture files (.pcap, .pcapng)
- **Interactive Dashboards**: Real-time data visualization with charts and graphs
- **Attack Detection**: Identify security threats including:
  - SQL Injection attacks
  - Cross-Site Scripting (XSS)
  - Server-Side Request Forgery (SSRF)
  - Brute force attempts
  - Path traversal attacks
- **Data Export**: Export analysis results in CSV and JSON formats
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Interactive Charts**: Powered by amCharts5 and Recharts

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- Git

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/Satark_URLxPolymath.git
cd Satark_URLxPolymath
```

2. Navigate to the frontend directory:

```bash
cd frontend
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open your browser and visit `http://localhost:3000`

## Project Structure

```
Satark_URLxPolymath/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/           # Reusable UI components
│   │   │   └── Navbar.tsx    # Navigation component
│   │   ├── pages/
│   │   │   ├── home/         # Dashboard and analytics
│   │   │   ├── pcap/         # PCAP upload and analysis
│   │   │   ├── contact/      # Contact page
│   │   │   ├── footerbar/    # Footer component
│   │   │   └── 404/          # 404 error page
│   │   ├── lib/
│   │   │   └── utils.ts      # Utility functions
│   │   ├── App.tsx           # Main app component
│   │   └── main.tsx          # App entry point
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
├── .gitignore
├── LICENSE
└── README.md
```

## 🛠️ Technology Stack

### Frontend

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router Dom** - Client-side routing
- **Framer Motion** - Animation library

### Data Visualization

- **amCharts5** - Advanced charting library
- **Recharts** - React charting library
- **amCharts5 Geodata** - Geographic data visualization

### UI Components

- **Radix UI** - Headless UI components
- **Lucide React** - Icon library
- **class-variance-authority** - CSS class management
- **clsx** - Conditional CSS classes

### Development Tools

- **ESLint** - Code linting
- **TypeScript ESLint** - TypeScript-specific linting
- **Vite Plugin React** - React support for Vite

## Features Overview

### Dashboard

The main dashboard provides:

- **Bar Charts**: Network traffic analysis
- **Pie Charts**: Attack type distribution
- **XY Charts**: Timeline-based threat visualization
- **Real-time Metrics**: Live security monitoring

### PCAP Analysis

Upload and analyze network capture files:

- File validation (max 10MB)
- Drag & drop interface
- Real-time processing status
- Detailed threat analysis
- Export capabilities

### Attack Detection

The platform identifies various security threats:

- **SQL Injection**: Database attack attempts
- **XSS**: Cross-site scripting vulnerabilities
- **SSRF**: Server-side request forgery
- **Brute Force**: Password cracking attempts
- **Path Traversal**: Directory traversal attacks

## UI/UX Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dark/Light Mode**: Adaptive color scheme
- **Interactive Charts**: Hover effects and drill-down capabilities
- **Toast Notifications**: Real-time feedback
- **Loading States**: Progress indicators for file processing
- **Internationalization**: Multi-language support with i18next

## Available Scripts

In the `frontend` directory:

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

### Vite Configuration

The project uses Vite with:

- React plugin for JSX support
- Tailwind CSS integration
- Path aliases (`@/` for `src/`)
- Development server on port 3000

## Deployment

### Production Build

```bash
cd frontend
npm run build
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
