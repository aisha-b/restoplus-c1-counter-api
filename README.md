# Counter API

## Installation

### :point_right: Clone the repository from github

```bash
git clone git@github.com:aisha-b/restoplus-c1-counter-api.git
npm install
```

### :point_right: Setup DB

Create .env file then enter your MongoDB URI:

DB_URI = 'YOUR_DATABASE_URI'

## Run

### :point_right: Start and run on port 4000

```bash
npm start
```

### :point_right: Start and run in development mode

```bash
npm run dev
```

## Endpoints

### :point_right: Start Counter

```javascript
fetch('http://localhost:4000/start', {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((response) => console.log(response))
```

### :point_right: Get Count

```javascript
fetch('http://localhost:4000/count/get', {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((response) => console.log(response))
```

### :point_right: Update Count

```javascript
fetch('http://localhost:4000/count/update', {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
		count: newCount,
	}),
})
  .then((response) => response.json())
  .then((response) => console.log(response))
```
