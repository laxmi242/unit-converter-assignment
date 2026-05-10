# UnitConvert - Unit Converter App

A modern, responsive unit converter web application built as part of a frontend assignment.  
The app allows users to convert values across multiple unit categories with real-time results, validation, light/dark theme support, and a scalable component-driven architecture.

## Live Demo

Live App: `https://unit-converter-app-seven.vercel.app/`  
GitHub Repository: `https://github.com/laxmi242/unit-converter-assignment`

---

## Tech Stack

- React
- TypeScript
- Vite
- React Router
- CSS
- Lucide React Icons
- Vercel Analytics
- LocalStorage for theme and recent conversions

---

## Features

### Core Features

- Unit conversion across multiple categories
- Real-time conversion as the user enters a value
- Input validation and clear error messages
- Responsive design for desktop and mobile
- Light and dark theme support
- Recent conversions history
- Header, footer, and sidebar layout
- Category-based navigation
- Copy result functionality
- Scalable conversion architecture

---

## Supported Conversion Categories

The app currently supports the following conversion categories:

### 1. Length

Supported units:

- Millimeter
- Centimeter
- Meter
- Kilometer
- Inch
- Foot
- Yard
- Mile

### 2. Weight

Supported units:

- Milligram
- Gram
- Kilogram
- Tonne
- Ounce
- Pound

### 3. Temperature

Supported units:

- Celsius
- Fahrenheit
- Kelvin

### 4. Time

Supported units:

- Second
- Minute
- Hour
- Day
- Week
- Month
- Year

Note: Month and year conversions are approximate.  
1 month = 30 days and 1 year = 365 days.

---

## Application Pages

### Home Page

The home page introduces the app and allows users to choose the type of unit conversion they want to perform.

It includes:

- Header
- Hero section
- Category cards
- Feature highlights
- Footer

Users can choose a category such as Length, Weight, Temperature, or Time and move to the converter page.

### Converter Page

The converter page contains the main conversion experience.

It includes:

- Header
- Footer
- Expandable/collapsible sidebar
- Category navigation
- Converter card
- Recent conversions
- Quick examples
- Theme support

The sidebar allows users to switch between unit categories easily.

---

## Architecture Overview

The app was designed with reusability and scalability in mind.

Instead of creating separate converter components for Length, Weight, Temperature, and Time, the app uses a common reusable `ConverterCard` component. The selected category data is passed into this component through configuration.

This keeps the UI logic reusable and avoids duplicate code.

---

## Folder Structure

```txt
src/
  components/
    Header
    Footer
    Sidebar
    ConverterCard
    CategoryCard
    RecentConversions
    ThemeToggle

  context/
    ThemeContext

  data/
    converterConfig.ts

  hooks/

  pages/
    HomePage
    ConverterPage

  types/
    converter.ts

  utils/
    conversion.ts
    validation.ts

  App.tsx
  main.tsx
