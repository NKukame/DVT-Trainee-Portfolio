# DVT Trainee Portfolio

## Project Overview
- This platform showcases our unique skills, creativity, and collaborative efforts as we grow into the next generation of software developers.
- Explore our individual portfolios and discover the talents driving our journey toward excellence in technology.​

## Technologies Used
- HTML
- CSS
- React
- Vite
- Git
- Github
- Node.js

## How To Run
- Open Terminal
- run "cd DVT_Trainee_Portfolio"
- run "npm install"
- run "npm install vite --save-dev"
- run "npm run dev"
- click the link provided. It should be called localhost5173. This will redirect you to your browser.
- if you encounter any issues later on, try running "npm update"

### Features
- **Multiple View Modes** – Users can switch between Card View, Grid View, and Carousel View for browsing team portfolios.
- **Dynamic Team Profiles** – Each portfolio card dynamically loads team member details from a JSON file.
- **Hover Effects** – When hovering over a profile, the image fades, and additional details appear smoothly.
- **Animated Grid Interaction** – In Grid View, hovering over one card scales it up while blurring the others.
- **Smooth Carousel Navigation** – In Carousel View, users can navigate through profiles using next/previous buttons.
- **Search Functionality** – Users can search for specific team members using a search input.

### Prisma Commands
- `npx prisma migrate dev` - Migrate the database schema, generate artifacts (e.g. `prisma/client`), and apply the migration to the development database.
- `npx prisma migrate deploy` - Migrate the database schema and apply the migration to the production database.
- `npx prisma db seed` - Run a seed to populate the development database with data.
- `npx prisma generate` to generate the Prisma client
- `npx prisma studio` to see the database interface UI 

### Swagger API Endpoints Documentation 
- `npm run start` run server then follow step 2
- `http://localhost:3000/api-docs` - To view API Endpoints via Swagger (in your browser)