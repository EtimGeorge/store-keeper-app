# Project Implementation Plan: StoreKeeper App

This document outlines the development plan for the StoreKeeper application, based on the Product Requirements Document (PRD) and the Firebase-centric technical summary. The plan is divided into phases, starting with project setup and backend development, followed by frontend implementation for different user roles.

## Phase 1: Project Setup & Foundation

**Objective:** Establish the core infrastructure, project structure, and security foundations.

1.  **Initialize Project:**
    *   Set up a new Git repository for version control.
    *   Create a monorepo structure to hold the mobile app, web admin dashboard, and cloud functions.
    *   Initialize a Node.js project (`npm init -y`).

2.  **Firebase Project Setup:**
    *   Create a new project in the Firebase console.
    *   Set up a **Cloud Firestore** database.
    *   Enable **Firebase Authentication** with Email/Password and Phone Number providers.
    *   Enable **Cloud Storage** for file uploads.
    *   Enable **Cloud Functions**.

3.  **Authentication & User Roles:**
    *   **Data Model:** Create a `users` collection in Firestore to store user profiles. Each document will be keyed by the Firebase Auth `uid` and will contain fields like `role` (`admin`, `staff`, `accountant`), `storeId`, and `name`.
    *   **Security Rules:** Implement initial Firestore Security Rules. The default should be to deny all access. Create rules that allow users to read their own profile and then expand from there.

## Phase 2: Backend Development (Firestore & Cloud Functions)

**Objective:** Build the data structure and serverless logic that will power the application.

1.  **Core Data Modeling (Firestore):**
    *   Design and implement the primary Firestore collections:
        *   `stores`: To hold information about each business/location.
        *   `products`: For all item details (SKU, name, price, image URL from Cloud Storage).
        *   `inventory`: To track stock quantities per product per location.
        *   `sales`: For all transaction records, including items, totals, payment method, and tax details.
        *   `financialLedger`: A log of all debits and credits for accounting purposes.

2.  **Backend Logic (Cloud Functions):**
    *   Develop and deploy Cloud Functions for critical, secure operations:
        *   **User Management:** A function to assign custom claims (roles) to users upon creation to enforce role-based access in security rules.
        *   **Tax Calculation:** An `onWrite` function for the `sales` collection that automatically calculates VAT, WHT, etc., based on Nigerian tax laws and updates the sale document.
        *   **Payment Verification:** An HTTP-triggered function to act as a webhook endpoint for Paystack/Flutterwave. This function will securely verify payment success and update the corresponding sale document in Firestore.
        *   **Reporting:** Develop on-demand HTTP-triggered functions that admins can call to generate complex reports (P&L, Balance Sheet). The function will query the `financialLedger`, perform calculations, and can save the result to Cloud Storage as a PDF.
        *   **Inventory Valuation (FIFO):** A scheduled function (e.g., runs nightly) to process transactions and calculate the Cost of Goods Sold (COGS) using FIFO logic, updating a `financialSummary` document.

## Phase 3: Frontend Development - Mobile App (Staff/POS)

**Objective:** Create the primary tool for daily operations, focusing on offline capability and ease of use for non-technical staff.

1.  **Framework & Setup:**
    *   Choose a cross-platform framework (React Native is recommended).
    *   Integrate the Firebase SDK and configure it for offline persistence.

2.  **Core Features:**
    *   **Authentication:** Implement login screens for staff.
    *   **POS Interface:**
        *   Build an intuitive interface for adding items to a cart.
        *   Enable processing sales, which write directly to Firestore. The UI must update instantly, relying on Firestore's offline capabilities.
        *   Integrate with payment gateways for card payments and provide clear instructions for USSD/cash payments.
    *   **Inventory Management:**
        *   Allow staff to check stock levels (reads from Firestore).
        *   Implement forms for recording new stock deliveries and processing returns/adjustments.
    *   **Offline-First Implementation:** Rigorously test all core features without an internet connection to ensure business continuity.

## Phase 4: Frontend Development - Web Dashboard (Admin)

**Objective:** Build the centralized control panel for business owners and accountants.

1.  **Framework & Setup:**
    *   Choose a web framework (React is recommended).
    *   Set up **Firebase Hosting** for deployment.
    *   Integrate the Firebase SDK.

2.  **Core Features:**
    *   **Authentication:** Implement login for admin and accountant roles.
    *   **Real-Time Dashboard:**
        *   Display live KPIs (e.g., total sales, top products) using Firestore's `onSnapshot` real-time listeners.
    *   **User Management:** Create an interface for admins to invite/add new staff and assign roles.
    *   **Financial Reporting:**
        *   Build a section where admins can request and view financial reports generated by the Cloud Functions.
    *   **Inventory Oversight:**
        *   Provide a comprehensive view of all products and their stock levels across all locations.
        *   Implement the UI for bulk product uploads (CSV to Cloud Storage, processed by a Cloud Function).

## Phase 5: Testing, Deployment & Iteration

**Objective:** Ensure the application is stable, secure, and ready for users.

1.  **Testing:**
    *   Write unit tests for all Cloud Functions.
    *   Conduct thorough end-to-end testing of both the mobile and web apps, with a special focus on offline functionality and data synchronization conflicts.
    *   Test Firestore Security Rules using the Firebase emulator suite.

2.  **Deployment:**
    *   Deploy all Firestore rules, Cloud Functions, and the web app via the Firebase CLI.
    *   Package the mobile app for release on the Google Play Store and Apple App Store.

3.  **Feedback & Iteration:**
    *   Establish a feedback mechanism (e.g., in-app support chat or form).
    *   Monitor app stability and performance using **Firebase Crashlytics** and **Performance Monitoring**.
    *   Plan for a phased rollout of advanced features (e.g., Bill of Materials, CRM integration) based on user feedback.
