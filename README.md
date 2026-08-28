# mini-crm

A small, Salesforce-style CRM (Accounts / Contacts / Deals) built on top of
[mini-framework](https://github.com/pariad84/mini-framework)'s `mini.js` -- a minimal,
schema-driven CRUD framework distilled to eight essentials. See that repo's README for what
the eight essentials are and why they exist.

`mini.js` here is copied unchanged from mini-framework at the point this repo was started.
It's the framework layer and knows nothing CRM-specific; the CRM itself lives in `app.js`,
the same way `mini-framework`'s Task Tracker and Recipe Box example apps sit on top of it
without mini.js ever reaching back into them. `app.js` follows Recipe Box's nav+router,
multi-page shape rather than Task Tracker's floating popups: a nav bar (Home / Accounts /
Contacts / Deals / Stages) and hash routing swap page sections in and out.

## Why a separate repo

mini-framework's own principle is to stay small enough to read in one sitting, and a real
CRM (auth, deal pipelines, reporting) is a different scope than "framework + toy example app."
Splitting it out keeps mini-framework focused on validating the framework itself, while this
repo is free to grow the way a real app does.

## Status

Accounts, Contacts, Deals, and Stages are all in place with full CRUD (create/edit/delete),
including resource-reference fields (a Contact references an Account; a Deal references an
Account, a Contact, and a Stage) that auto-resolve to the referenced row's name wherever
they're displayed.

## Running it

No build step, no dependencies. Either serve this directory with any static file server:

```
npx serve .
```

or just open `index.html` directly in a browser (`file:///path/to/mini-crm/index.html`, or
double-click it) -- there's no build step and no server-side code, so it works either way.

It seeds three accounts, three contacts, three deals, and five stages on first run, then opens
on the Home page. Use the nav bar to move between Accounts/Contacts/Deals/Stages; click a row
to edit it in a popup, "+ New ..." to add one, or "Delete" on a row to remove it -- either way
the page's own list refreshes in place, no reload needed.
