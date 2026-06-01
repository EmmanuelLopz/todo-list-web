# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev        # start dev server (Vite HMR)
yarn build      # type-check then bundle for production
yarn lint       # run ESLint
yarn preview    # preview production build locally
```

No test runner is configured yet.

## Architecture

Entry point: `src/main.tsx` → `src/App.tsx` → `src/router/AppRouter.tsx`

**Routing** (`src/router/AppRouter.tsx`): React Router v7 `BrowserRouter`. `Header` renders outside `<Routes>` so it persists across all pages. Current routes: `/` (Home), `/about` (About).

**Pages** (`src/pages/`): Each page lives in its own folder. All pages are barrel-exported from `src/pages/index.ts` — import pages from there, not directly from their files.

**Components** (`src/components/`): Each component is colocated in its folder. We use tailwind for all styles in our app.

**Styling**: Use Tailwind tailwindcss@3.4.19 version to style everything in the project.

**State**: Currently local `useState` in pages — no global store. Data is hardcoded in `Home.tsx`; API integration is in progress (branch `feature/hu-03-get-lists`).

## Conventions

- New components go in `src/components/<ComponentName>/`
- New pages go in `src/pages/<PageName>/` and must be added to `src/pages/index.ts` and `src/router/AppRouter.tsx`.
- TypeScript strict mode is on; avoid `any`.
- Backend was made in Java Quarkus


## Current available endpoints in Java Quarkus Backend

 - http://localhost:8080/auth/login => POST to login a user
 BODY: 
 {
  "email": "emmanuel@gmail.com",
  "password": "XXXXXXXX"
}
 - http://localhost:8080/lists => GET to obtain all lists
 - http://localhost:8080/tasks?listId=a5f4f870-49dd-11f1-ac87-737f2333944d => GET of all tasks given a listId
 - /list => POST to create a new list
 BODY:
 {
    "colorId": "06e52fa6-5a64-11f1-8d56-51d33280ed21",
    "description": "Topics related to CNNA 1 certification.",
    "title": "Internet Network I"
 }
 - /lists/{id} => DELETE a list given its uuid
 - /lists/{id} => PUT to modify a list, given its uuid
 - /tasks => GET to obtain all tasks
 - /tasks => POST to create a new task
 BODY: 
 {
    "title": "XXX",
    "description": "XXXXX",
    "listId": "XXXXXXX",
    "priorityID": "XXXXXXX",
    "dueDate": ""2026-05-31T20:06:14"
 }
 - /tasks/{id} => DELETE a task given its uuid
 - /tasks/{id} => PUT to modify a task, given its uuid
 BODY: 
 {
    "title": "XXX",
    "description": "XXXXX",
    "listId": "XXXXXXX",
    "priorityID": "XXXXXXX",
    "dueDate": ""2026-05-31T20:06:14"
 }


## Database attached to the project

Here it is the database model in MySQL that makes this to work

-- COLOR
CREATE TABLE IF NOT EXISTS color (
  id          BINARY(16)   NOT NULL,
  name        VARCHAR(50)  NOT NULL,
  hexadecimal CHAR(6)      NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_color_name (name)
) ENGINE=InnoDB;

-- PRIORITY
CREATE TABLE IF NOT EXISTS priority (
  id    BINARY(16)   NOT NULL,
  name  VARCHAR(50)  NOT NULL,
  level INT          NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_priority_name (name),
  UNIQUE KEY uq_priority_level (level)
) ENGINE=InnoDB;

-- USER
CREATE TABLE IF NOT EXISTS `user` (
  id                 BINARY(16)    NOT NULL,
  first_name         VARCHAR(100)  NOT NULL,
  paternal_last_name VARCHAR(100)  NOT NULL,
  maternal_last_name VARCHAR(100)  NOT NULL,
  email              VARCHAR(254)  NOT NULL,
  firebase_uuid      VARCHAR(128)  NOT NULL,
  role               VARCHAR(5)    NOT NULL,
  active             BOOLEAN       NOT NULL,
  created_at         DATETIME      NOT NULL,
  updated_at         DATETIME      NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB;

-- LIST
CREATE TABLE IF NOT EXISTS list (
  id          BINARY(16)    NOT NULL,
  title       VARCHAR(100)  NOT NULL,
  description VARCHAR(300)  NULL,
  active      BOOLEAN       NOT NULL,
  created_at  DATETIME      NOT NULL,
  updated_at  DATETIME      NOT NULL,

  user_id     BINARY(16)    NOT NULL,
  color_id    BINARY(16)    NULL,

  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES `user`(id),
  FOREIGN KEY (color_id) REFERENCES color(id)
) ENGINE=InnoDB;

-- TASK
CREATE TABLE IF NOT EXISTS task (
  id          BINARY(16)    NOT NULL,
  title       VARCHAR(100)  NOT NULL,
  description VARCHAR(300)  NULL,
  completed   BOOLEAN       NOT NULL,
  created_at  DATETIME      NOT NULL,
  updated_at  DATETIME      NOT NULL,
  due_date    DATETIME      NULL,

  list_id     BINARY(16)    NOT NULL,
  priority_id BINARY(16)    NULL,

  PRIMARY KEY (id),
  FOREIGN KEY (list_id) REFERENCES list(id),
  FOREIGN KEY (priority_id) REFERENCES priority(id)

) ENGINE=InnoDB;
