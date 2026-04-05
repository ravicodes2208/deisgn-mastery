# 🎓 Design Mastery - Learning Platform

A comprehensive learning platform for mastering Low-Level Design (LLD), High-Level Design (HLD), OOPs, SOLID Principles, and Design Patterns with **C++** and **Java** side-by-side comparisons.

## 📋 Project Overview

```
Learning Path:
┌─────────────────────────────────────────────────────────────────┐
│  Language Fundamentals → OOPs → SOLID → Design Patterns → LLD → HLD  │
└─────────────────────────────────────────────────────────────────┘
```

### Key Features

- ⚔️ **Side-by-Side Comparison**: Learn C++ and Java simultaneously
- 📊 **3 Difficulty Levels**: Basic, Intermediate, and Advanced for each topic
- 💪 **Practice Questions**: Hands-on exercises with solutions in both languages
- 📈 **Progress Tracking**: Track your learning journey
- 🌙 **Dark/Light Theme**: Easy on the eyes

## 🚀 Quick Start

```bash
# Navigate to the learning platform
cd learning-platform

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:3000`

## 📁 Project Structure

```
low-level-design/
├── ARCHITECTURE.md           # Detailed architecture documentation
├── README.md                 # This file
├── content/                  # Raw content files
│   └── topics/
│       └── fundamentals/
│           └── classes.json  # First topic: Classes & Objects
└── learning-platform/        # React Application
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── common/       # Navbar, Sidebar, etc.
    │   │   ├── content/      # CodeBlock, ComparisonTable, etc.
    │   │   └── practice/     # QuestionCard, etc.
    │   ├── pages/            # Home, TopicPage, PracticePage
    │   ├── context/          # Theme & Progress contexts
    │   ├── data/             # JSON content files
    │   └── styles/           # CSS files
    ├── package.json
    ├── tailwind.config.js
    └── vite.config.js
```

## 📚 Learning Path Content

### Phase 1: Language Fundamentals
| Topic | Status | Difficulty Levels |
|-------|--------|-------------------|
| Classes & Objects | ✅ Complete | Basic, Intermediate, Advanced |
| Constructors & Destructors | 🚧 Coming | - |
| Access Modifiers | 🚧 Coming | - |
| Static Members | 🚧 Coming | - |
| Memory Management | 🚧 Coming | - |
| Exception Handling | 🚧 Coming | - |

### Phase 2: OOPs Concepts
- Encapsulation
- Inheritance
- Polymorphism
- Abstraction
- Composition vs Inheritance

### Phase 3: SOLID Principles
- Single Responsibility (SRP)
- Open/Closed (OCP)
- Liskov Substitution (LSP)
- Interface Segregation (ISP)
- Dependency Inversion (DIP)

### Phase 4: Design Patterns
- Creational: Singleton, Factory, Builder, Prototype
- Structural: Adapter, Decorator, Facade, Proxy
- Behavioral: Observer, Strategy, Command, State

### Phase 5: Low-Level Design
- Parking Lot System
- Library Management
- Elevator System
- Chess Game
- ATM Machine

### Phase 6: High-Level Design
- URL Shortener
- Twitter/X Design
- Chat System
- Video Streaming
- E-Commerce Platform

## 🎨 UI Preview

### Topic Page Structure
```
┌─────────────────────────────────────────────────────────────────┐
│  📦 Classes & Objects                    [Mark Complete ✓]       │
├─────────────────────────────────────────────────────────────────┤
│  [Basic] [Intermediate] [Advanced]                               │
│                                                                  │
│  [Concepts] [Code Examples] [Comparison] [Practice (4)]          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────┐ ┌─────────────────────┐                │
│  │ C++ Code            │ │ Java Code           │                │
│  │ class Car {         │ │ class Car {         │                │
│  │   private:          │ │   private String    │                │
│  │     string brand;   │ │     brand;          │                │
│  │ };                  │ │ }                   │                │
│  └─────────────────────┘ └─────────────────────┘                │
│                                                                  │
│  📊 Comparison Table                                             │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Aspect          │ C++              │ Java              │   │
│  │ Object Creation │ Car c; (stack)   │ new Car() (heap)  │   │
│  │ Memory          │ Manual (delete)  │ Garbage Collection│   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## 📝 Topic Content Structure

Each topic JSON file follows this structure:

```json
{
  "id": "classes",
  "title": "Classes & Objects",
  "levels": {
    "basic": {
      "concepts": [...],
      "cppCode": { "code": "...", "explanation": "..." },
      "javaCode": { "code": "...", "explanation": "..." },
      "comparison": [...],
      "practiceQuestions": [...]
    },
    "intermediate": { ... },
    "advanced": { ... }
  },
  "keyDifferences": [...],
  "bestPractices": [...],
  "commonMistakes": [...]
}
```

## 🛠️ Technology Stack

| Technology | Purpose |
|------------|---------|
| React 18 | UI Framework |
| Vite | Build Tool |
| Tailwind CSS | Styling |
| React Router | Navigation |
| Prism.js | Syntax Highlighting |
| Lucide React | Icons |
| Zustand | State Management |

## 🔜 Next Steps

1. **Add More Topics**: Implement constructors, access modifiers, etc.
2. **Interactive Code Editor**: Allow users to edit and run code
3. **Quiz System**: Add MCQs for each topic
4. **Certificate Generation**: Award certificates upon completion
5. **Mobile Responsive**: Optimize for mobile devices

## 📄 License

This is a personal learning project.

---

**Start Learning**: Open the app and begin with **Classes & Objects**!

```bash
cd learning-platform && npm install && npm run dev
```
