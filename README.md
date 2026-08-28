# mini-crm

A small, Salesforce-style CRM (Accounts / Contacts / Deals) built on top of
[mini-framework](https://github.com/pariad84/mini-framework)'s `mini.js` -- a minimal,
schema-driven CRUD framework distilled to eight essentials. See that repo's README for what
the eight essentials are and why they exist.

`mini.js` here is copied unchanged from mini-framework at the point this repo was started.
It's the framework layer and knows nothing CRM-specific; the CRM itself lives in `app.js`
(not yet written), the same way `mini-framework`'s Task Tracker and Recipe Box example apps
sit on top of it without mini.js ever reaching back into them.

## Why a separate repo

mini-framework's own principle is to stay small enough to read in one sitting, and a real
CRM (auth, deal pipelines, reporting) is a different scope than "framework + toy example app."
Splitting it out keeps mini-framework focused on validating the framework itself, while this
repo is free to grow the way a real app does.

## Status

Just started: `mini.js` is in place, `app.js` (the CRM) is next.

## Running it

No build step, no dependencies -- serve this directory with any static file server, e.g.:

```
npx serve .
```
