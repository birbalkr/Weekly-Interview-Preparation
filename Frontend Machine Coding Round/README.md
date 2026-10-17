# Interview Practice Tracker

Frontend Machine Coding Round — Section 4.

## Live demo

[Open the Interview Practice Tracker](https://birbalkr.github.io/Weekly-Interview-Preparation/Frontend%20Machine%20Coding%20Round/)

## Problem statement

Build a responsive dashboard where a student can track weekly interview-preparation work.

- **Time limit:** 2.5 hours
- **Stack:** HTML, CSS, and JavaScript
- **Backend:** Not required

## Features

- Dashboard metrics for total questions, completed DSA problems, completed interview questions, and overall progress.
- Add questions with a title, category, difficulty, and status.
- Categories: DSA, Git, and Technical.
- Difficulty levels: Easy, Medium, and Hard.
- Statuses: Pending, In Progress, and Completed.
- Search questions by title.
- Filter by category, status, and difficulty.
- Update a question's status or delete it.
- Machine-coding status tracker for the current week's build.
- LocalStorage persistence across browser refreshes.
- Responsive desktop and mobile layouts.
- Empty state when no questions exist.
- No-search-results state when filters return no matches.
- Form validation for required question titles.

## Setup

No package installation or build step is required.

1. Clone the repository:

   ```bash
   git clone https://github.com/birbalkr/Weekly-Interview-Preparation.git
   ```

2. Open the project folder:

   ```text
   Frontend Machine Coding Round/index.html
   ```

3. Open `index.html` in a browser, or serve the repository with any static web server.

## Usage

1. Add a question from the form.
2. Change its status as you make progress.
3. Use search and filters to focus your review.
4. Mark the machine-coding project status separately.
5. Refresh the page to confirm that browser persistence is working.

## Assumptions

- This is a frontend-only practice application; no login, backend, or shared database is needed.
- Questions are stored in the browser's LocalStorage, so data is local to the current browser and device.
- The initial sample questions demonstrate the dashboard and can be deleted.
- “Completed interview questions” includes completed Git and Technical questions.
- The progress percentage is calculated as completed questions divided by total stored questions.
- The machine-coding status is stored separately from the question list.

## AI usage note

AI may be used as a learning assistant to understand concepts, debug, compare approaches, or get hints. The final implementation should be understood by the learner and be explainable in an interview.
