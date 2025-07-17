# Delightree Assignment - MVP Version

This version contains:

## RBAC-Based Signup & Login

Role-Based Access Control system built in from the start.

### Signup Fields:
- Username
- Password
- Account Type (Dropdown)
  - Admin
  - Auditor
  - Viewer

### Login
- Username
- Password

- Keeps user logged in
- Logout option available

---

## Audit Management

### Audits Tab
- Displays list of audits sorted by creation date
- Tap to view audit details
- Admin users can delete audits

### Create Audit
Multi-step form to create an audit:

**Step 1:**
- Title
- Comment

**Step 2:**
- Security Rating (Star-based)

**Step 3:**
- Audit Types (Multi-checkbox):
  - Security
  - Inventory
  - Compliance
  - Hardware
  - Software
  - Network
  - Performance

On successful creation, redirects to Audit Detail Page

---

## Profile Tab

- Displays current user info
- Options:
  - Edit Profile (change username, password, or role)
  - Logout

---

## Tech Stack

- React Native CLI
- TypeScript
- React Navigation
- React Hook Form + Zod (for validation)
- AsyncStorage (for local storage)
- React Native Vector Icons
- Context API (for auth state)

---

## Known Issues

- Icons may appear as [?] or boxes if vector fonts are not properly linked
- AsyncStorage has no encryption in this MVP — avoid using real credentials


## Getting Started

```bash
npm install
# or
yarn

npx react-native start
npx react-native run-android
# or
npx react-native run-ios
