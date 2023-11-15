``` mermaid
sequenceDiagram
	browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
	server-->>browser: HTML-code
	browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
	server-->>browser: main.css
	browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
	server-->>browser: main.js

	note over browser: browser starts executing js-code<br/>that requests JSON data from server

	browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
	server-->>browser: [{ content: "exemple", date: "2023-11-15" }, ...]

	note over browser: browser executes the event handler<br/>that renders notes to display

	note over browser: the user writes in the text field

	note over browser: the user clicks on the save button

	browser->>server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note
	server-->>browser: HTTP response: 302 Found

	note over server: server execute the code for POST:<br/>"app.post('/new_note', (req, res) => { [...] }"

	note over server: server redirects to /exampleapp/notes<br/>(the same page, this will reload the page with the new information)

	browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
	server-->>browser: HTML-code
	browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
	server-->>browser: main.css
	browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
	server-->>browser: main.js

	note over browser: browser starts executing js-code<br/>that requests JSON data from server

	browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
	server-->>browser: [{ content: "test", date: "2023-11-15" }, ...]

	note over browser: browser executes the event handler<br/>that renders notes to display
```
