# myProducts — Project Documentation Hub

This directory holds the strict **Spec-Driven Development (SDD)** specifications for the **myProducts** application: a cross-platform React Native (Expo) + TypeScript app powered by the DummyJSON REST API, built with a Feature-Based architecture and Redux Toolkit. Every source decision—scope, architecture, engineering, design, and feature behavior—is governed by the documents below. Changes to code must trace back to these specs.

---

## Document Index

### Task
| File | Governs |
| :--- | :--- |
| [Task Document Scope](task/Task%20Document%20Scope.md) | Defines the overall feature scope and technical dependencies (navigation, Redux, storage, API). |
| [Task Document Features](task/Task%20Document%20Features.md) | Functional requirements for all five flows: Auth, Navigation, Home, Detail, Cart, Profile. |
| [Task Document Guidelines](task/Task%20Document%20Guidelines.md) | Acceptance criteria, coding-skill compliance, edge cases, and error handling rules. |

### Architecture
| File | Governs |
| :--- | :--- |
| [Core Structure](architecture/Core%20Structure.md) | Feature-Based + Redux architecture, `/src` folder layout, and component hierarchy. |
| [Data Network](architecture/Data%20Network.md) | State slices (`auth`, `product`, `cart`), API architecture, and AsyncStorage persistence. |
| [Standards Security](architecture/Standards%20Security.md) | Strict TypeScript coding standards, typing rules, and security (JWT, credential masking, TLS). |

### Engineering
| File | Governs |
| :--- | :--- |
| [Tech Dependencies](engineering_document/Tech%20Dependencies.md) | Exact library versions and tech stack for React Native, navigation, Redux, and storage. |
| [Build Env](engineering_document/Build%20Env.md) | Build config (`app.json`, `tsconfig` aliases), Node/Expo environment, and scripts. |
| [API Integrations](engineering_document/API%20Integrations.md) | External DummyJSON endpoints and how Axios calls map to Redux thunks. |

### Design
| File | Governs |
| :--- | :--- |
| [Design Document](design/Design%20Document.md) | Design tokens, color palette, typography hierarchy, form validation, and UX interactions. |

### Feature Design
| File | Governs |
| :--- | :--- |
| [Wireframes](feature_design/Wireframes.md) | ASCII UI wireframes for Home, Detail, Cart, Login, and Profile screens. |
| [Feature Design Document](feature_design/Feature%20Design%20Document.md) | Per-screen UI components, text styles, and actions (Login, Home, Detail, Cart, Profile). |
| [Navigation Responsiveness](feature_design/Navigation%20Responsiveness.md) | Bottom tab bar behavior, cart badge, safe-area, and responsive grid rules. |

### Feature Engineering
| File | Governs |
| :--- | :--- |
| [Modules Components](feature_engineering_document/Modules%20Components.md) | Feature module breakdown and shared UI component specifications. |
| [State Redux](feature_engineering_document/State%20Redux.md) | Redux Toolkit slices and the unidirectional dispatch/data flow cycle. |
| [API Storage](feature_engineering_document/API%20Storage.md) | API endpoint mapping tables and AsyncStorage session-lifecycle sync. |

---

## SDD Workflow Mapping

These docs map to the four Spec-Driven Development phases:

| # | Phase | Relevant Documents |
| :-: | :--- | :--- |
| 1 | **Specification** | Task (Scope, Features, Guidelines) · Architecture (Core Structure, Data Network, Standards Security) · Engineering (Tech Dependencies, Build Env, API Integrations) · Design (Design Document) |
| 2 | **Prototyping** | Feature Design (Wireframes, Feature Design Document, Navigation Responsiveness) — drives the static HTML/CSS prototypes in `/prototype` |
| 3 | **Redux / API** | Feature Engineering (State Redux, API Storage) · Engineering (API Integrations) — implement slices, thunks, and persistence |
| 4 | **React Native UI** | Feature Engineering (Modules Components) · Feature Design (all) — build screens/sub-components bound to the Redux store; verify against Architecture & Task acceptance criteria |