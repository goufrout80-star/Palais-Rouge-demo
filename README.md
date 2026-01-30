# Palais Rouge Immobilier - Luxury Real Estate Platform

A premium real estate platform built with Next.js 16, featuring multilingual support (French, English, Arabic) and multi-currency functionality (MAD, USD, EUR).

## 🚀 Features

- **Luxury Design**: Elegant burgundy/cream color palette inspired by premium real estate platforms
- **Multilingual**: Full i18n support with French as default language
- **Multi-Currency**: Automatic currency conversion with smart rounding logic
- **Responsive**: Mobile-first design with Tailwind CSS
- **Animations**: Smooth transitions with Framer Motion
- **SEO Optimized**: Static site generation for fast loading

## 🛠️ Tech Stack

- **Frontend**: Next.js 16.1.1, React 19.2.3, TypeScript 5
- **Styling**: Tailwind CSS 3.4.1
- **Animations**: Framer Motion 12.0.0
- **Icons**: Lucide React 0.468.0
- **Backend**: Node.js with Express (API routes)
- **Database**: Prisma ORM (PostgreSQL)

## 🌐 Deployment

### Netlify Deployment Steps:

1. **Connect Repository**
   - Go to [Netlify](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub/GitLab/Bitbucket repository

2. **Configure Build Settings**
   ```
   Build command: next build
   Publish directory: .next
   ```

3. **Environment Variables**
   Add the following environment variables in Netlify dashboard:
   ```
   NODE_ENV=production
   NEXT_PUBLIC_API_URL=https://your-domain.netlify.app/api
   DATABASE_URL=your-database-connection-string
   JWT_SECRET=your-jwt-secret-key
   NEXTAUTH_SECRET=your-nextauth-secret
   ```

4. **Install Plugin**
   The `netlify.toml` file includes the Next.js plugin configuration

5. **Deploy**
   - Push to your main branch
   - Netlify will automatically deploy your site

## 📁 Project Structure

```
raz-estates/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── admin/          # Admin dashboard
│   │   ├── agent/          # Agent dashboard
│   │   ├── login/          # Authentication
│   │   └── properties/     # Property listings
│   ├── components/         # React components
│   │   ├── layout/        # Navbar, Footer
│   │   ├── property/      # Property cards
│   │   └── ui/           # UI components
│   ├── context/           # React Context providers
│   ├── hooks/            # Custom hooks
│   └── lib/              # Utilities
├── backend/              # API routes
│   └── src/
│       └── routes/       # API endpoints
└── public/              # Static assets
```

## 🎨 Design System

**Color Palette:**
- Primary: `#8B1538` (Deep Burgundy)
- Background: `#FAF9F7` (Cream)
- Text: `#1A1818` (Charcoal)
- Accents: `#C4A35A` (Rose Gold)

**Typography:**
- Display: Playfair Display (headings)
- Body: DM Sans (body text)

## 🌍 Internationalization

Supports 3 languages:
- 🇫🇷 French (default)
- 🇺🇸 English  
- 🇸🇦 Arabic

Features:
- Automatic language detection
- Currency conversion (MAD ↔ USD ↔ EUR)
- Smart rounding for Moroccan Dirham
- RTL support for Arabic

## 💰 Currency Conversion

Smart conversion logic:
- MAD amounts over 700 are rounded to nearest 1000
- Real-time exchange rates
- Automatic formatting based on locale

## 📱 Responsive Breakpoints

- Mobile: 0-768px
- Tablet: 768-1024px  
- Desktop: 1024px+

## 🚀 Performance Optimizations

- Static site generation (SSG)
- Image optimization
- Code splitting
- Lazy loading
- Prefetching

## 🔧 Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

## 📄 License

This project is proprietary software for Palais Rouge Immobilier.

---

**Built with ❤️ for luxury real estate in Morocco**