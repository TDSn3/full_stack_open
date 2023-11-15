With `E` in **ex`E`mpleapp** of `https://studies.cs.helsinki.fi/exempleapp/spa`

``` mermaid
sequenceDiagram
	browser->>server: HTTP GET https://studies.cs.helsinki.fi/exempleapp/spa
	server-->>browser: HTTP response status code: 404 Not Found<br/>HTTP response body: HTML error page 404
```

With `A` in **ex`A`mpleapp** of `https://studies.cs.helsinki.fi/exampleapp/spa`

``` mermaid
sequenceDiagram
	browser->>server: HTTP GET https://studies.cs.helsinki.fi/exempleapp/spa
	server-->>browser: 
```
