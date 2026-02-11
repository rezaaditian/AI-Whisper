# Whisper AI - Audio Transcription App

A modern Next.js application that leverages OpenAI's Whisper API for high-quality audio transcription with a beautiful, responsive UI.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd whisper-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```bash
   OPENAI_API_KEY=your_openai_api_key_here
   ```
   
   **Important**: Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production with Turbopack
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Design & Tech Architecture

### Component Library & UI System
- **shadcn/ui** - Modern, accessible component library built on Radix UI primitives
- **Tailwind CSS v4** - Utility-first CSS framework with JIT compilation for optimal bundle size

### Performance & Developer Experience
- **Next.js 15** - Latest React framework with App Router and Turbopack for fast builds
- **TypeScript 5** - Static type checking for better code quality and developer experience
- **Turbopack** - Rust-based bundler for significantly faster development builds

### Design Rationale & Trade-offs

**Speed & Consistency Benefits:**
- **shadcn/ui + Radix**: Pre-built accessible components eliminate custom accessibility implementations
- **Tailwind CSS**: Utility classes provide consistent spacing, colors, and responsive design
- **Component composition**: Reusable UI primitives reduce development time and ensure consistency

**Technical Trade-offs:**
- **Bundle size**: shadcn/ui components add some overhead but provide production-ready accessibility
- **Learning curve**: Tailwind utility classes require initial learning but accelerate development
- **Vendor lock-in**: Radix UI components are framework-agnostic, providing flexibility

**Architecture Decisions:**
- **App Router**: Modern Next.js routing with server components for better performance
- **TypeScript**: Adds build-time safety at the cost of initial development speed
- **Turbopack**: Faster builds in development, though still in beta

## 📁 Project Structure

```
src/
├── app/           # Next.js App Router pages and API routes
├── components/    # Reusable UI components (shadcn/ui + custom)
├── hooks/         # Custom React hooks
├── lib/           # Utility functions and configurations
├── contexts/      # React context providers
└── types/         # TypeScript type definitions
```

## 🔧 Configuration Files

- `components.json` - shadcn/ui configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `next.config.ts` - Next.js configuration

## 🚀 Deployment

The app is optimized for deployment on Vercel with Next.js 15 features. Build and deploy commands are configured for production use.
