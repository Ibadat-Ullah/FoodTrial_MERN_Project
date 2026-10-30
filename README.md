# FoodTrial

FoodTrial is a restaurant-menu and ordering website with an administrative panel. The frontend is a React single-page app built with Vite. The backend is an Express API which stores records in MongoDB through Mongoose.

This guide describes the code as it currently works: application startup, the visible controls, the routes each control opens, the requests sent to the backend, and the files that define them. It is also a map for deciding where to make changes.

## 1. Start the project

The project has independent frontend and backend package manifests. Start each in a separate terminal.

Terminal 1 — backend:

```powershell
cd "D:\university\5th Semester\Web Technologies\project\foodtrial\backend"
npm run dev
```

Terminal 2 — frontend:

```powershell
cd "D:\university\5th Semester\Web Technologies\project\foodtrial\frontend"
npm run dev
```

Open the Vite URL printed in the frontend terminal, usually `http://localhost:5173`.

The frontend API client uses `http://localhost:5000/api`. The backend uses port `5000` and reads `MONGO_URI` from the private `backend/.env` file. Keep that file private; do not copy its contents into source files, screenshots, documentation, or commits.

### Startup sequence

```text
Browser loads frontend/index.html
  → frontend/src/main.jsx mounts React and BrowserRouter
  → frontend/src/App.jsx renders route handling and hash scrolling
  → frontend/src/routes/AppRoutes.jsx chooses a page from the URL
```

The backend starts at `backend/server.js`:

```text
Load private backend/.env
  → configure Express, CORS, JSON parsing, and uploaded-image hosting
  → register API route files
  → register not-found and error responses
  → connect to MongoDB
  → start listening on port 5000 after MongoDB connects
```

The backend will exit instead of starting if the database URI is missing or MongoDB cannot be reached. If it reports `EADDRINUSE`, another process is already listening on port 5000.

## 2. Project layout

```text
backend/
  server.js                  Express setup, database connection, API registration
  controllers/               Request handling and shared CRUD logic
  models/                    MongoDB document schemas
  routes/                    URL and HTTP-method to controller mapping
  uploads/                   Food images uploaded through the API
  package.json               Backend scripts and dependencies

frontend/
  index.html                 Browser document and React mount element
  src/
    main.jsx                 React entry point and BrowserRouter
    App.jsx                  App-level components
    routes/                  Frontend URL-to-page mapping
    pages/                   Full pages (storefront, admin overview, users)
    components/
      landing/               Storefront sections and ordering UI
      admin/                 Admin layout and data management UI
      common/                Reusable buttons, forms, tables, modal, links
    api/                     Axios client and API request helpers
    schemas/                 Frontend form validation and resource definitions
    data/                    Static slideshow and fallback menu content
    assets/                  Images and brand assets
    styles.css               Global styles and Tailwind entry point
```

There is no root `package.json`; install/run scripts belong to each app. `node_modules`, build output, and uploaded images are not source-code modules.

## 3. Frontend navigation and routes

`frontend/src/routes/AppRoutes.jsx` is the route map:

| Browser URL | Screen |
|---|---|
| `/` | Storefront |
| `/admin` | Admin overview |
| `/admin/foods` | Food table |
| `/admin/orders` | Order table |
| `/admin/payments` | Payment table |
| `/admin/riders` | Rider table |
| `/admin/users` | Read-only registered-users table |
| `/admin/:resource/new` | Add form for a resource with a separate form |
| `/admin/:resource/:id/edit` | Edit form for a resource with a separate form |
| `/admin/:resource/:id/delete` | Delete confirmation for a resource with a separate form |
| Any unmatched URL | Not-found page |

`/admin/:resource` is a shared route. `ResourcePage.jsx` reads the `resource` URL value and looks it up in `schemas/adminResources.js`. This lets Foods, Orders, Payments, and Riders share the same table behavior without four nearly identical page components.

`/admin/users` has a dedicated route and page because users are displayed read-only and do not use the configurable CRUD table.

## 4. Storefront: what appears and what each control does

`pages/LandingPage.jsx` assembles the storefront in this visual order:

1. Navbar
2. Hero carousel
3. Highlights
4. Food menu
5. Footer
6. Floating assistant

### 4.1 Navbar

File: `frontend/src/components/landing/Navbar.jsx`

Desktop, from left to right:

- **FoodTrial logo:** Returns to `/`. The shared logo is in `components/common/BrandLogo.jsx`.
- **Home:** Returns to `/`.
- **Menu:** Scrolls to the element with ID `menu`.
- **About:** Scrolls to the element with ID `about` in the footer.
- **Contact:** Scrolls to the element with ID `contact` in the footer.
- **Admin:** Navigates directly to `/admin`; there is no login screen in the current frontend route tree.

On narrow/mobile layouts, the desktop link row and desktop Admin button are hidden. A **☰ menu button** appears at the right. Tapping it opens a dropdown containing Home, Menu, About, Contact, and Admin. Selecting a link closes the dropdown.

Section navigation is implemented by `components/common/SectionLink.jsx`. It navigates to `/#section` and scrolls to the target. `components/common/ScrollToHash.jsx`, mounted by `App.jsx`, also handles scrolling when the URL hash changes through navigation or a direct link.

### 4.2 Hero carousel

File: `frontend/src/components/landing/Hero.jsx`  
Slide content: `frontend/src/data/storefrontContent.js`

The hero is the large, full-width image area at the top. Each slide provides a background image, a title, and a subtitle. The image and text change together.

Controls and behavior:

- **Explore the menu:** Button below the title and subtitle; scrolls to the menu section.
- **‹ Previous slide:** Circular button vertically centered at the left edge. Moves to the prior slide; from the first slide, wraps to the last.
- **› Next slide:** Circular button vertically centered at the right edge. Moves to the next slide; from the last slide, wraps to the first.
- **Slide dots:** Row at the bottom center. There is one button per slide. Click a dot to select that exact slide. The active dot is longer and colored; inactive dots are small circles.
- **Automatic advance:** Moves to the next slide every 3.5 seconds.
- **Pause on hover:** Automatic advance pauses while the pointer is over the hero and resumes after it leaves.

The carousel is frontend-only. It does not call the backend.

### 4.3 Highlights

File: `frontend/src/components/landing/Highlights.jsx`

The strip under the hero has three informational cards:

- **Made fresh**
- **Big on flavor**
- **At your door**

They are presentation-only. They are not links or buttons.

### 4.4 Menu

File: `frontend/src/components/landing/Menu.jsx`

When the component mounts, it requests `GET /api/foods`. It filters out records where `available` is `false`. It initially displays at most eight food cards.

If the API request fails, or the API responds with an empty list, the page displays the static fallback foods from `data/storefrontContent.js`. If the API returns foods, those database records are used instead.

Menu controls:

- **Questions? Get in touch:** Link beside the menu heading; scrolls to the footer contact section.
- **View more:** Button centered below the card grid. Adds eight to the number of visible foods and appears only when there are more foods to show.

### 4.5 Food cards

File: `frontend/src/components/landing/FoodCard.jsx`

Each card contains, top to bottom:

1. Food image
2. Category badge over the image, if the food has a category
3. Name and price
4. Short description
5. **Order now** button spanning the bottom of the card

The image URL helper in `api/apiClient.js` turns a stored relative path such as `/uploads/example.jpg` into a complete URL using the API server address. Clicking **Order now** opens an `OrderDialog` for that specific food.

### 4.6 Checkout dialog

Files: `components/landing/OrderDialog.jsx`, `components/common/Modal.jsx`  
Validation: `schemas/checkout.js`

The dialog starts with the selected food name and price, then shows:

- **Your name** text field
- **Phone** telephone field
- **Delivery address** multi-line field
- **Payment method** dropdown:
  - Cash on delivery
  - Card (recorded as pending)
  - Online (recorded as pending)
- **Place order** submit button

The Zod schema in `schemas/checkout.js` checks the values before submit. It requires a name of at least two characters, a phone number of at least seven characters, an address of at least five characters, and one of the supported payment methods.

Checkout request sequence:

```text
Click Place order
  → frontend validates checkout fields
  → POST /api/orders
  → backend validates and stores the order in MongoDB
  → frontend receives the saved order and its MongoDB ID
  → POST /api/payments with that ID, amount, method, and pending status
  → show order confirmation
```

The order currently contains one food item with quantity `x 1`; there is no multi-item cart.

Error paths:

- If `POST /api/orders` fails, the dialog displays an error and does not create a payment record.
- If the order saves but `POST /api/payments` fails, the order already exists. The dialog explains that and offers **Retry payment record**. Retrying sends the payment request again using the saved order.
- When both requests succeed, a confirmation displays the last six characters of the order ID.

After success, **Done** resets the form and closes the dialog. The modal’s **×** button, click-outside behavior, and Escape-key behavior also close it when no request is currently submitting. Modal behavior is in `components/common/Modal.jsx`.

The selected Card or Online method does not charge a card or contact a payment provider; it only creates a pending payment record.

### 4.7 Footer

File: `frontend/src/components/landing/Footer.jsx`

The footer has four columns:

1. **Brand and description:** Logo returns to the homepage.
2. **Quick links:** Home, Menu, About us, Admin.
3. **Say hello:** Email and phone links plus hours.
4. **Follow the good stuff:** Social-media icon links open external sites in a new tab.

The footer’s `about` and `contact` element IDs are the destinations used by the navbar section links.

### 4.8 Floating assistant

File: `frontend/src/components/landing/ChatbotLauncher.jsx`

The circular assistant button is fixed at the bottom-right of the viewport.

- Click it to open the assistant panel.
- Click it again or click the panel’s **×** to close the panel.

This is currently a static “coming soon” placeholder. It does not call an AI or backend service.

## 5. Admin: screen layout and controls

The Admin link in the storefront navigates to `/admin`.

### 5.1 Admin layout

File: `frontend/src/components/admin/AdminLayout.jsx`

The shared layout includes:

- A sidebar on the left on desktop.
- A mobile sidebar drawer on small screens.
- A top bar above the page content.
- A **View all data** dropdown at the right of that top bar.
- The selected admin page below the top bar.

### 5.2 Sidebar

File: `frontend/src/components/admin/Sidebar.jsx`

From top to bottom:

- **FoodTrial name/mark:** Navigates to `/admin`.
- Workspace banner: informational text.
- **Overview:** Navigates to the admin dashboard.
- **Foods row:** Expands or collapses a submenu.
  - **Add food:** Opens `/admin/foods/new`.
  - **Update food:** Opens `/admin/foods?view=all&manage=update`.
  - **Remove food:** Opens `/admin/foods?view=all&manage=remove`.
- **Riders row:** Expands or collapses its submenu.
  - **Add rider:** Opens `/admin/riders/new`.
  - **Update rider:** Opens `/admin/riders?view=all&manage=update`.
  - **Remove rider:** Opens `/admin/riders?view=all&manage=remove`.
- **Visit storefront:** Navigates back to `/`.

On mobile, a **☰** button opens the drawer. An **×** button inside it or the dark overlay outside it closes the drawer.

Orders and Payments do not have sidebar submenus. They are accessible from the dashboard cards and the View all data dropdown.

### 5.3 View all data dropdown

File: `frontend/src/components/admin/ViewAllDataMenu.jsx`

Click **View all data** in the top bar to open a menu containing:

- Foods
- Orders
- Payments
- Riders
- Registered users

Selecting an entry navigates to that page and closes the menu. Clicking outside or pressing Escape also closes the menu.

### 5.4 Dashboard

File: `frontend/src/pages/admin/Dashboard.jsx`

The dashboard requests all Foods, Orders, Payments, and Riders records to calculate their counts. It shows four clickable cards:

- Foods → `/admin/foods?view=all`
- Orders → `/admin/orders?view=all`
- Payments → `/admin/payments?view=all`
- Riders → `/admin/riders?view=all`

Each card shows an icon, count, label, description, and “Manage …” text. If any count request fails, an error banner is shown above the cards. The “Good to know” panel below them is informational.

### 5.5 Shared resource list/table

Files: `components/admin/ResourcePage.jsx`, `components/common/DataTable.jsx`  
Resource definitions: `schemas/adminResources.js`

`ResourcePage` reads the resource name from the route and gets its title, endpoint, fields, validation schema, and columns from `resourceConfigs`.

On the resource page:

- **View all …** toggles the table’s visibility.
- The table has the configured data columns.
- If the current resource permits row actions, action buttons appear at the far-right of each row.
- A loading panel appears while the API request is pending.
- If no records exist, a configured empty-state message is shown.
- Errors appear in a red alert; successful create/update/delete actions can show a green notice.

Table columns:

| Page | Columns |
|---|---|
| Foods | Name, Category, Price, Available |
| Orders | Customer, Phone, Total, Status |
| Payments | Order ID, Amount, Method, Status |
| Riders | Name, Phone, Vehicle, Status |

Row actions:

- **Update/Edit:** Opens an edit form. Foods and Riders use full pages; Orders and Payments use a modal form.
- **Remove/Delete:** Foods and Riders open a separate confirmation page. Other configurable resources use a browser confirmation, then send a DELETE request.
- In “Update” mode, the table hides the delete action.
- In “Remove” mode, the table hides the edit action.

### 5.6 Create and edit forms

Files: `components/admin/ResourceFormPage.jsx`, `components/common/ResourceForm.jsx`  
Fields and labels: `schemas/adminResources.js`  
Validation: `schemas/food.js`, `schemas/rider.js`, `schemas/order.js`, `schemas/payment.js`

Foods and Riders use full-page forms:

- **Back to …** at the top returns to that resource’s table.
- **Fields** appear in the order configured for the resource.
- **Cancel** at the bottom discards changes and returns to the table.
- **Create Food / Create Rider** submits a new record.
- **Save changes** submits an update.
- When editing, the page first requests the existing record by ID and fills in its values.
- For a food photo, selecting a file shows a preview. An existing image is shown when editing if no new file is selected.

The form renderer chooses an input based on each field’s configured type:

- Default/text and number fields use the common `Input` component.
- `textarea` fields use a multi-line editor.
- `select` fields use configured options.
- `checkbox` fields use a checkbox input.
- `file` fields use a file picker and preview.

Food image restrictions shown in the UI and enforced on the server are JPEG, PNG, or WebP, one file, maximum 5 MB.

### 5.7 Delete confirmation

File: `components/admin/ResourceFormPage.jsx` (`ResourceDeletePage`)

For Foods and Riders, the confirmation page shows:

- **Back to …** above the heading.
- A statement naming the record to be removed.
- **Cancel** to return to the table.
- **Remove …** to send the DELETE request.

While deletion is running, the remove button is disabled and changes its label. Success navigates back to the table; an API error is displayed on the page.

### 5.8 Registered users

File: `frontend/src/pages/admin/UserPage.jsx`

The Registered users page calls `GET /api/users` and displays a read-only table with:

- Name
- Email
- Registration date

It has no edit or delete buttons. It shows loading, error, and empty states.

## 6. Frontend API and validation

### API client

File: `frontend/src/api/apiClient.js`

Creates one Axios instance with base URL `http://localhost:5000/api`. It also exports `getAssetUrl`, used to build URLs for images stored by the backend.

### Resource API helpers

File: `frontend/src/api/resourceApi.js`

These helper functions return response data for common operations:

| Helper | Request |
|---|---|
| `getAll(endpoint)` | `GET /:endpoint` |
| `getOne(endpoint, id)` | `GET /:endpoint/:id` |
| `createOne(endpoint, data)` | `POST /:endpoint` |
| `updateOne(endpoint, id, data)` | `PUT /:endpoint/:id` |
| `deleteOne(endpoint, id)` | `DELETE /:endpoint/:id` |

Checkout uses the Axios client directly because it coordinates two different endpoints: create an order, then create its payment record.

### Validation and database schemas

Frontend Zod schemas validate form input before a request is sent:

- `schemas/food.js`: food name, description, price, category, image, availability.
- `schemas/rider.js`: rider name, phone, vehicle number, status.
- `schemas/order.js`: customer details, items, total, status.
- `schemas/payment.js`: order ID, amount, method, status.
- `schemas/checkout.js`: customer name, phone, address, payment method.

Backend Mongoose models independently validate persisted data. Frontend validation improves form feedback; backend validation is still required because API callers can bypass the frontend.

## 7. Backend: routes, controllers, models

### Backend request path

```text
HTTP request
  → route file selects a controller method
  → controller calls a Mongoose model
  → MongoDB reads or writes a document
  → controller sends JSON response
```

### Routes and operations

| Route file | Prefix | Operations |
|---|---|---|
| `backend/routes/foodRoutes.js` | `/api/foods` | List, get one, create, update, delete; create/update also parse image uploads |
| `backend/routes/orderRoutes.js` | `/api/orders` | List, get one, create, update, delete |
| `backend/routes/paymentRoutes.js` | `/api/payments` | List, get one, create, update, delete |
| `backend/routes/riderRoutes.js` | `/api/riders` | List, get one, create, update, delete |
| `backend/routes/userRoutes.js` | `/api/users` | List registered users |
| `backend/routes/authRoutes.js` | `/api/auth` | Register and login handlers |

For the CRUD resources, the routes generally use:

```text
GET    /             list all
GET    /:id          retrieve one
POST   /             create
PUT    /:id          update
DELETE /:id          delete
```

`backend/controllers/createCrudController.js` implements the shared CRUD operations for Food, Order, Payment, and Rider models. The individual resource controller modules provide the model. Food adds a `prepareBody` function so uploaded files become `/uploads/<generated-name>` image URLs.

`backend/controllers/asyncHandler.js` is a small shared helper for Express 4. It forwards rejected async controller promises to the server’s error handler, avoiding an unhandled promise rejection. It is stored with controllers; there is no separate middleware directory.

### Models

| Model file | Data stored |
|---|---|
| `backend/models/Food.js` | Name, description, price, category, image URL, availability, timestamps |
| `backend/models/Order.js` | Customer name, phone, address, items string, total, status, timestamps |
| `backend/models/Payment.js` | Order ID, amount, payment method, payment status, timestamps |
| `backend/models/Rider.js` | Name, phone, vehicle number, availability status, timestamps |
| `backend/models/User.js` | Name, email, timestamps |

Mongoose timestamps add `createdAt` and `updatedAt` to documents. CRUD list results are sorted newest-first.

### Food-image request path

Image parsing is configured next to the food routes in `backend/routes/foodRoutes.js`:

1. Frontend submits the food form as `FormData`.
2. Multer accepts the single file in the `image` field.
3. The route checks MIME type and size.
4. The file receives a generated UUID filename and is written to `backend/uploads`.
5. `foodController` stores the relative `/uploads/<filename>` path in MongoDB.
6. `server.js` serves the uploads directory at the `/uploads` URL path.
7. The frontend uses `getAssetUrl` to display the image.

### Error behavior

The end of `backend/server.js` handles errors:

- A missing route is turned into a 404 error.
- Mongoose validation and invalid-ID errors become client errors.
- Unexpected server errors are logged on the backend and returned with a generic message.
- Async controllers forward failures using `asyncHandler`.

## 8. Features that are placeholders or have limits

- **Admin is not protected:** `/admin` opens without authentication, and backend admin CRUD routes do not require a login. Do not expose this version publicly as a secured admin system.
- **Auth is not real authentication:** Login is a placeholder response. Registration stores name and email only; it does not store or verify a password.
- **Payments are not processed:** Cash, Card, and Online choices create a database record with pending status; no payment provider is integrated.
- **No shopping cart:** Checkout submits one food item with quantity one.
- **Order/payment are separate writes:** The order can remain in MongoDB if the payment-record request fails.
- **Assistant is a placeholder:** It does not use a model or API.
- **Fallback foods are static:** They are shown if the food request fails or returns no records.

## 9. Where to change things

| Desired change | Start here |
|---|---|
| Navbar links, desktop/mobile menu, Admin button | `frontend/src/components/landing/Navbar.jsx` |
| Carousel images, text, controls, timing | `frontend/src/components/landing/Hero.jsx` and `frontend/src/data/storefrontContent.js` |
| Menu request, fallback behavior, visible count, View more | `frontend/src/components/landing/Menu.jsx` |
| Food-card layout or Order now button | `frontend/src/components/landing/FoodCard.jsx` |
| Checkout fields, submit sequence, payment retry | `frontend/src/components/landing/OrderDialog.jsx` |
| Admin URL-to-page routing | `frontend/src/routes/AppRoutes.jsx` |
| Admin sidebar actions and destinations | `frontend/src/components/admin/Sidebar.jsx` |
| Dashboard cards and counts | `frontend/src/pages/admin/Dashboard.jsx` |
| Resource names, form fields, table columns, choices | `frontend/src/schemas/adminResources.js` |
| Field validation rules | Matching file in `frontend/src/schemas/` |
| Shared table rendering | `frontend/src/components/common/DataTable.jsx` |
| Shared form rendering | `frontend/src/components/common/ResourceForm.jsx` |
| API base URL or image URL construction | `frontend/src/api/apiClient.js` |
| API request helpers | `frontend/src/api/resourceApi.js` |
| Backend URL and HTTP methods | Matching file in `backend/routes/` |
| Backend handling for an endpoint | Matching file in `backend/controllers/` |
| Database fields and constraints | Matching file in `backend/models/` |
| CORS, port, DB connection, global errors, uploads hosting | `backend/server.js` |

## 10. A practical way to trace a button

For any visible control, follow these questions:

1. **Where is its text rendered?** Search for the button label under `frontend/src`.
2. **What event runs when clicked?** Look for `onClick`, `onSubmit`, or the link’s `to`.
3. **Does it change route or local state?** Follow `navigate`, `Link`, state setters, or `SectionLink`.
4. **Does it call the API?** Follow the imported API helper or `api.get/post/put/delete`.
5. **Which backend route receives it?** Match the URL prefix and method in `backend/routes`.
6. **Which controller/model handles it?** Follow the route’s controller into `backend/controllers`, then `backend/models`.
7. **How does the UI react?** Find the success, loading, or error state that uses the response.

For example, tracing **Order now**:

```text
FoodCard button
  → sets orderOpen=true
  → renders OrderDialog
  → validates checkoutSchema
  → POST /api/orders
  → orderRoutes.js
  → orderController.js / createCrudController.js
  → Order model
  → MongoDB
  → POST /api/payments
  → Payment model
  → show confirmation or retry/error
```
