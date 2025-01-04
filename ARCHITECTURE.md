# PhysioEngine React Architecture

## Project Overview

PhysioEngine is a modern web application designed for physiotherapists to administer and analyze standardized medical questionnaires. The application supports KOOS, HOOS, DASH, and satisfaction questionnaires.

### Key Features

- Dynamic questionnaire rendering with conditional logic
- Automated scoring calculations
- Visual result presentation with charts
- Dark mode support
- Mobile-responsive design

## Core Technologies

- **React 18.3** - UI framework
- **TypeScript 5.6** - Type safety
- **Vite 6.0** - Build tool and development server
- **React Router 7.0** - Client-side routing
- **Tailwind CSS 3.4** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Chart.js 4.4** - Data visualization
- **Lucide React** - Icon system
- **Firebase 10.x** - Backend and database services
  - Realtime Database for questionnaire responses
  - Analytics for usage tracking

## Directory Structure

```
physioengine-react/
├── src/
│   ├── app/                    # Application core setup
│   │   └── router.tsx         # Route definitions
│   ├── routes/                # Route components and handlers
│   ├── assets/                # Static assets
│   │   └── questionnaires/    # Questionnaire data files
│   ├── data/                  # Data models and constants
│   ├── components/
│   │   ├── ui/               # Base UI components
│   │   ├── layout/           # Layout components
│   │   ├── marketing/        # Marketing components
│   │   ├── dynamic-readers/  # Dynamic form components
│   │   │   └── questionnaires/
│   │   ├── forms/           # Form components
│   │   ├── features/        # Feature-specific components
│   │   └── theme-provider.tsx
│   ├── lib/
│   │   ├── types/           # TypeScript type definitions
│   │   ├── calculators/     # Score calculation logic
│   │   ├── utils/          # Utility functions
│   │   └── firebase.ts     # Firebase configuration and services
│   ├── pages/
│   │   ├── home/           # Home page components
│   │   └── questionnaires/ # Questionnaire pages
│   └── styles/
│       └── globals.css     # Global styles and Tailwind directives
├── public/                  # Static public assets
└── node_modules/           # Dependencies
```

### Configuration Files

- `vite.config.ts` - Vite bundler configuration
  - Path aliases (@/ for src/)
  - Build optimization settings
  - Development server settings
- `tailwind.config.js` - Tailwind CSS configuration
  - Custom theme settings
  - Dark mode configuration
  - Component class strategies
- TypeScript Configuration
  - `tsconfig.json` - Base TypeScript config
  - `tsconfig.app.json` - App-specific config
  - `tsconfig.node.json` - Node environment config
- `eslint.config.js` - Code quality rules
- `postcss.config.js` - CSS processing
- `.cursorrules` - Cursor IDE configuration
- Environment Configuration
  - `.env` - Environment variables (not in git)
  - `.env.example` - Example environment variables
  - Firebase configuration in environment variables

### Data Flow

1. Questionnaire data defined in `/assets/questionnaires/`
2. Rendered through `DynamicQuestionnaireForm` component
3. Responses stored in:
   - localStorage for offline access
   - Firebase Realtime Database for persistence
4. Processed by calculator functions
5. Results displayed in dedicated results pages

### Firebase Integration

- Configuration in `src/lib/firebase.ts`
- Services:
  - Realtime Database for questionnaire responses
  - Analytics for usage tracking
- Environment Variables:
  - API keys and configuration in `.env`
  - Example configuration in `.env.example`
- Data Structure:
  - Questionnaire responses stored by type
  - User sessions tracked
  - Results persistence

## Component Organization

### Core Components

- `components/ui/` - Base UI components (button, dialog, input, etc.)
- `components/layout/` - Layout components (Header)
- `components/marketing/` - Marketing components (Hero, Features, ValueProposition)
- `components/dynamic-readers/` - Dynamic form components
  - `DynamicQuestionnaireForm` - Generic dynamic form handling
  - `DynamicResultsReader` - Dynamic results display
  - `MobileQuestionnaireReader` - Mobile-optimized questionnaire view
- `components/features/` - Feature-specific components
  - `charts/` - Reusable chart components
    - `QuestionnaireBarChart` - Theme-aware bar chart for questionnaire results
  - `questionnaires/` - Questionnaire feature components
    - `QuestionnaireList` - Displays available questionnaires in grid/list view
    - `QuestionnaireDynamicPanel` - Dynamic content panel for questionnaire details
    - `QuestionnaireQrPanel` - QR code generation and management
    - `QuestionnaireSidebar` - Navigation and filtering sidebar with category management
- `theme-provider.tsx` - Theme management and dark mode support

### Dynamic Component System

The application now uses a dynamic component system that:

- Renders questionnaires based on type parameter
- Handles results display through dynamic readers
- Supports mobile-first responsive design
- Integrates QR functionality seamlessly
- Uses shared components for consistent UI/UX

### Layout System

- Mobile-first responsive design
- Adaptive header and sidebar for large displays (>1536px)
- Content optimized for ultra-wide displays (up to 2000px)
- Dynamic panels: 50/50 split on desktop, full-screen on mobile

### Marketing Components

- `Hero` - Main landing section
- `Features` - Feature showcase with icons
- `ValueProposition` - Product benefits section

### Type System

- `questionnaire.types.ts` - Central type definitions for all questionnaires
- Supports:
  - Radio button questions
  - Text input fields
  - Conditional rendering
  - Section-based organization

### Questionnaire System

#### Homepage Features

- Dynamic layout with grid/list view toggle
- Sidebar navigation with filtering capabilities
- Detailed questionnaire preview panel
- Mobile-responsive design
- Category-based filtering and search
- Interactive cards/list items with quick actions

#### Form Functionality

- Generic form component supporting:
  - Regular radio button questions
  - Text input fields
  - Conditional rendering based on previous answers
- Section-based scoring with interpretations
- Modular calculator system
- Dark mode compatible UI components
- Mobile-responsive layout

### Calculator Implementation

Each questionnaire has a dedicated calculator that:

- Processes section-specific scores
- Handles special cases (e.g., text responses)
- Provides score interpretations
- Supports result visualization

### Theme Implementation

- CSS variables for colors (defined in globals.css)
- System preference detection
- Light/dark mode toggle in Header
- Persistent theme selection

## Routing Structure

```typescript
/                           # Home page
├── /questionnaires         # Questionnaire section
│   ├── /                  # Questionnaire home/list page
│   ├── /:type            # Dynamic questionnaire form
│   └── /:type/results    # Dynamic results view
├── /cranial              # Cranial section
├── /contact             # Contact page
├── /faq                # FAQ page
├── /fill               # Dynamic QR fill page
└── /home              # Marketing home page
```

### Dynamic Routing

The new routing structure implements a dynamic approach where:

- `/:type` parameter handles all questionnaire types (KOOS, HOOS, DASH, etc.)
- Results are handled through dynamic components rather than static routes
- QR code functionality is integrated into the dynamic system

### Data Flow

1. Questionnaire data defined in `/assets/questionnaires/`
2. Rendered through `DynamicQuestionnaireForm` component
3. Responses stored in localStorage
4. Processed by calculator functions
5. Results displayed in dedicated results pages

## Development Guidelines

### Component Architecture

#### Questionnaire Homepage Components

1. `QuestionnaireList`
   - Handles grid/list view rendering
   - Manages questionnaire item display
2. `QuestionnaireSidebar`
   - Provides navigation and filtering
   - Manages category selection
3. `QuestionnaireDynamicPanel`
   - Displays questionnaire details and preview
   - Manages questionnaire actions

### Adding a New Questionnaire

1. Create questionnaire data file in `src/assets/questionnaires/[name]_swedish.ts`
2. Implement calculator in `src/lib/calculators/[name].ts`
3. Create page components in `src/pages/questionnaires/[name]/`
4. Add routes to `router.tsx`
5. Update `QuestionnaireHomePage.tsx`

### Code Conventions

- Use PascalCase for components and interfaces
- Use camelCase for functions and variables
- Use explicit type annotations for props
- Organize imports with absolute paths using @/ alias
- Organize imports:
  1. React/external libraries
  2. Internal components (@/components)
  3. Types (@/lib/types)
  4. Utils (@/lib/utils)

## Resources

### Documentation

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Radix UI](https://www.radix-ui.com)
- [React Router](https://reactrouter.com)

### Questionnaire References

- [KOOS Official Site](http://www.koos.nu/)
- [HOOS Official Site](http://www.koos.nu/)
- [DASH Outcome Measure](https://dash.iwh.on.ca/)

## Planned Features

### Core Features

- Multi-language support
- Backend integration
- PDF export functionality
- User authentication
- Administrative features

### Technical Improvements

- Service worker for offline support
- Response caching mechanism
- React.lazy for route splitting
- Chart rendering optimization

### Security & Compliance

- Data encryption
- GDPR compliance features
- Data retention policies
- Audit logging
