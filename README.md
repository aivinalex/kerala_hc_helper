# High Court Helper

A web application to search and retrieve cause lists from the Kerala High Court website for multiple advocates.

## Features

- **Advocate Search**: Search for advocates by name with autocomplete suggestions
- **Multi-Advocate Selection**: Select multiple advocates to search simultaneously
- **Cause List Retrieval**: Fetch case details for selected advocates on a specific date
- **Rate Limiting**: Built-in delays to avoid overwhelming the court website

## Tech Stack

**Frontend:**

- Vanilla JavaScript (ES6+)
- HTML/CSS
- Tailwind CSS
- Fetch API

**Backend:**

- Node.js
- Fastify (web framework)
- @fastify/static (static file serving)
- Cheerio (HTML parsing)
- fetch-cookie (session management)
- tough-cookie (cookie handling)

## Project Structure

```
highcourt helper/
├── backend/
│   ├── services/
│   │   ├── AdvocateServices.js    # Advocate search logic
│   │   └── causeListService.js    # Cause list fetching logic
│   ├── routes/
│   │   └── apiRoutes.js           # API endpoints
│   ├── helpers/
│   │   ├── helperModule.js        # Shared utilities
│   │   └── causelistParser.js     # HTML parsing logic
│   └── server.js                  # Server entry point
├── public/
│   ├── module/
│   │   ├── advocateModule.js      # Advocate UI logic
│   │   ├── causelistModule.js     # Cause list UI logic
│   │   ├── helperModule.js        # Frontend utilities
│   │   ├── nodeModule.js          # DOM element references
│   │   └── initEventListenerModule.js  # Event handlers
│   ├── app.js                     # Frontend entry point
│   ├── index.html                 # Main HTML file
│   ├── output.css                 # Compiled Tailwind CSS
│   └── updateDom.css              # Custom styles
├── input.css                      # Tailwind source
├── package.json
└── README.md
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/aivinalex/kerala_hc_helper

```

2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
node backend/server.js
```

Or use nodemon for development:

```bash
nodemon backend/server.js
```

4. Open browser and navigate to:

```
http://localhost:3000/home
```

## API Endpoints

### GET `/api/advocates`

Search for advocates by name.

**Query Parameters:**

- `name` (required): Advocate name (min 3 characters)

**Response:**

```json
{
  "count": 2,
  "results": [{ "label": "John Doe", "keyval": "12345" }]
}
```

### POST `/api/causelist`

Fetch cause list for multiple advocates.

**Request Body:**

```json
{
  "advocates": [{ "label": "John Doe", "keyval": "12345" }],
  "date": "2024-02-10"
}
```

**Response:**

```json
{
  "results": [
    {
      "advocate": "John Doe",
      "caselist": [...]
    }
  ]
}
```

## How It Works

1. **User searches for advocates** - Frontend sends request to `/api/advocates`
2. **Backend queries court website** - Fetches advocate data with session cookies
3. **User selects advocates and date** - Multiple advocates can be selected
4. **Frontend requests cause list** - Sends POST to `/api/causelist`
5. **Backend fetches data sequentially** - With random delays (1-3s) between requests
6. **HTML parsing** - Cheerio extracts case data from court website HTML
7. **Results returned** - Parsed case data sent back to frontend

## Configuration

**Delay Settings** (in `causeListService.js`):

- Between requests: 1000-2000ms (random)

**Court Website:**

- Base URL: `https://hckinfo.keralacourts.in/digicourt/index.php`

## Development

The project uses ES6 modules throughout. No build step required.

**Key Design Patterns:**

- Modular architecture with separation of concerns
- Debounced search for better UX
- Abortable fetch requests to cancel outdated searches
- Session management with cookie persistence
- Lazy initialization of court API session

## License

MIT
