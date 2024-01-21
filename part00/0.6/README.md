``` mermaid
sequenceDiagram
	browser->>server: HTTP GET https://studies.cs.helsinki.fi/exempleapp/spa
	server-->>browser: HTML-code
	browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
	server-->>browser: main.css
	browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa.js
	server-->>browser: main.js

	note over browser: browser starts executing js-code<br/>that requests JSON data from server

	browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
	server-->>browser: [{ content: "exemple", date: "2023-11-17" }, ...]

	note over browser: browser executes the event handler<br/>that renders notes to display

	note over browser: the user writes in the text field

	note over browser: the user clicks on the save button

	browser->>server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa

	note over server: server execute js-code<br/>creat new note in JSON

	server-->>browser: HTTP response: 201 Created<br/>HTTP body: new note in JSON

	note over browser: browser js-code execute redrawNotes()<br/>this will refresh the note list without reloading the page 

```
