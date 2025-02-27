# Token Tracker
- [APP- PREVIEW](https://my-turborepo-webapp-smoky.vercel.app/)

A modern cryptocurrency tracking application built with Next.js and TurboRepo, featuring real-time price updates, detailed token information, and a responsive user interface.

## Project Overview

This application allows users to:
- View top cryptocurrencies by price
- Track real-time price updates
- Filter and sort token data
- View detailed token information including supply and 24h volume
- Responsive design for all devices

## Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **Data Fetching**: Axios
- **UI Components**: Shadcn/ui
- **Build Tool**: TurboRepo
- **API**: CryptoCompare

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm (recommended) or npm
- Git

### Environment Setup

1. Create a `.env.local` file in the `apps/webapp` directory:

```env
NEXT_PUBLIC_CRYPTOCOMPARE_API_KEY=your_api_key_here
```

2. Replace `your_api_key_here` with your CryptoCompare API key. You can get one at [CryptoCompare](https://www.cryptocompare.com/cryptopian/api-keys).

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev:webapp
```

The application will be available at `http://localhost:3000`.

## Project Structure

```
apps/
  ├── webapp/               # Main Next.js application
  │   ├── src/
  │   │   ├── components/  # Reusable UI components
  │   │   ├── modules/     # Feature-specific components
  │   │   ├── lib/        # Utilities and helpers
  │   │   └── types/      # TypeScript type definitions
  │   └── .env.local      # Environment variables
  └── docs/                # Documentation site
packages/
  ├── ui/                  # Shared UI components
  ├── eslint-config/      # ESLint configuration
  └── typescript-config/   # TypeScript configuration
```

## Available Scripts

- `npm dev` - Start development server
- `npm build` - Build for production
- `npm lint` - Run ESLint
- `npm test` - Run tests
- `npm clean` - Clean build outputs

## Development

### Remote Caching

This project uses Turborepo's Remote Caching feature. To enable it:

1. Create a Vercel account
2. Run `npx turbo login`
3. Link your repository: `npx turbo link`

### Adding New Features

1. Create a new branch
2. Implement your feature
3. Add tests if applicable
4. Submit a pull request

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Turborepo](https://turbo.build/repo)
- [Next.js](https://nextjs.org/)
- [CryptoCompare API](https://www.cryptocompare.com/api/)
- [Shadcn/ui](https://ui.shadcn.com/)
