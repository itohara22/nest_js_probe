# Backend Design Overview – Expense Management System

## 1. Project Overview

This project is a backend system for managing organization-level expenses. It supports multiple organizations (tenants), role-based user access, expense tracking, and expense splitting for shared costs. The system is backend-only and focuses on correctness, data isolation, and scalability.

---

## 2. Core Entities

### User

* Represents a real person who can log in to the system
* A user can belong to multiple organizations
* A user by itself does not own business data

---

### Organization

* Represents a company, team, or group using the system
* All business data (expenses, categories, reports) belongs to an organization
* Acts as the tenant boundary for data isolation

---

### UserOrganization (Membership)

* Represents the relationship between a user and an organization
* Defines the user’s role within that organization
* Enables a many-to-many relationship between users and organizations

Roles are scoped to organizations, not users globally.

---

### Expense

* Represents a single spending event within an organization
* Stores the total amount, description, category, and creation time
* Belongs to exactly one organization
* Define who is responsible for payment

---

### ExpenseSplit

* Represents how an expense is divided among users
* Each split assigns responsibility for part of an expense to a user
* Belongs to exactly one expense
* Cannot exist without an associated expense

---

## 3. Relationships

* A user can belong to multiple organizations
* An organization can have multiple users
* A user has a specific role per organization
* An organization can have multiple expenses
* An expense belongs to one organization
* An expense have one creator (user)
* An expense can have multiple expense splits
* Each expense split is associated with one user

---

## 4. Invariants (Rules That Must Always Hold)

* Every expense must belong to exactly one organization
* Users can only access data belonging to their organizations
* The sum of all expense splits must equal the total expense amount
* A user’s permissions are determined by their role in the organization
* Expense splits cannot exist without a valid expense

---

## 5. Authorization Model (High Level)

* OWNER:
    - Full control over the organization
    - Manage users and roles
    - Create, update, and delete any expense
    - View all expenses and reports

* ADMIN:
    - Create expenses
    - Update and delete any expense within the organization
    - View all expenses and reports

* MEMBER:
    - Create expenses
    - View expenses and reports
    - Update and delete only expenses they created

* Authorization decisions are always scoped to the organization.

---

## 6. Out of Scope (Initial Version)

* Frontend UI
* Payment processing
* Currency conversion
* Audit logs
* Notifications

These may be added in future iterations but are intentionally excluded from the initial scope.
