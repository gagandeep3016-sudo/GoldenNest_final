# GoldenNest_final
GoldenNest is a real estate website where users can browse luxury properties across India. It fetches live property data from a public API using HTML, CSS and JavaScript. The main focus of this project is using fetch() to get real-time data and Array HOFs to search, filter and sort that data.

1. Project Purpose
The idea behind GoldenNest is to build a platform where people can explore premium properties like villas, apartments and penthouses across cities like Delhi, Mumbai, Bangalore and more. Users can search by name, filter by category and sort by price. The project is built to show my understanding of how JavaScript works with real APIs and how to display and manipulate that data on a webpage.

2. The API
I am using the DummyJSON API which gives free, structured product data in JSON format. I am using the furniture and home category and treating each item as a luxury property listing.

Base URL: https://dummyjson.com
Endpoint: /products?limit=100
Auth: None — no API key or login needed
Data: Each item has title, price, description, category, rating, stock, thumbnail and images


3. Key Features
These features will all be built using Array HOFs like .map(), .filter() and .sort() — no for loops or while loops:

Search — users can type a property name and results update live using .filter()
Filter — filter properties by category using .filter()
Sort — sort by price low to high or high to low using .sort()
Favourites — like and save properties using localStorage
Dark Mode — toggle between light and dark theme, preference saved in localStorage


4. Technologies

HTML5
CSS3 — Flexbox and Grid for layout
JavaScript ES6+ — fetch(), async/await, Array HOFs
localStorage — for saving user preferences and favourites
Deployment — Netlify or GitHub Pages


5. Setup
Requirements

Git
Any modern browser (Chrome, Firefox, Edge)
VS Code with Live Server extension (optional but recommended)

Clone the repo
bashgit clone https://github.com/gagandeep3016-sudo/GoldenNest_final.git
cd GoldenNest_final
Run it
Just open index.html in your browser. No installation needed since this is plain HTML, CSS and JS.
You can also right click index.html in VS Code and click "Open with Live Server" to see live changes while coding.
6. Bonus Features

Debouncing on the search bar so it doesn't call the API on every single keystroke
Loading spinner while data is being fetched
Pagination to split large property lists into pages
localStorage to remember liked properties and dark mode between sessions


7. Author
Gagandeep
GitHub: @gagandeep3016-sudo
