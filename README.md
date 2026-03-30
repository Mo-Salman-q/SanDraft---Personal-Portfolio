# Personal Portfolio

A modern, highly-responsive, single-page personal portfolio built with pure HTML/CSS/JS and a Node.js backend. 
Designed specifically to showcase projects, your professional experience, and technical skills while providing a fully functional "Contact Me" email form directly on the page!

## Key Features
- **Fully Responsive Custom Design**: A beautiful grid-based layout that reacts and stacks intelligently across desktop, tablet, and mobile views.
- **Dark Mode Aesthetics**: Modern dark-themed styling utilizing deep contrast, CSS micro-animations, and vivid accent colors.
- **Dynamic Contact Form**: Seamless user experience! Send inquiries directly to your real email inbox without a clunky page reload using the built-in `fetch` API request state handling.
- **Secure Backend Email Service**: Powered by Nodemailer and Express to securely route and handle contact form payloads.
- **Smooth Navigation**: Employs a fixed sidebar (on desktop), incredibly smooth scrolling anchor links, and an auto-fading Top Navigation bar based on user scroll position.

## Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher)
- npm (Node Package Manager)
- A Gmail account with a 16-character "App Password" generated (for the Contact Form capabilities)

## Setup Instructions

1. **Install Dependencies**
   Navigate your terminal into the root project folder and run:
   ```bash
   npm install
   ```
   *This automatically installs Express, Nodemailer, and Dotenv.*

2. **Configure Environment Variables**
   Ensure an `.env` file exists directly in your root folder with the following credentials setup:
   ```env
   PORT=3000
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-google-app-password
   ```

3. **Start the Express Server**
   Spin up your backend service locally using:
   ```bash
   node server.js
   ```
   *(Or run `nodemon server.js` if you prefer hot-reloading backend changes)*

4. **View the Application**
   Open your preferred browser and navigate to: [http://localhost:3000](http://localhost:3000)

## Project Structure
- `server.js` — The backbone backend server logic and Nodemailer routing endpoints.
- `public/` — The directory containing static web assets explicitly served to the client browser.
  - `index.html` — The core structured layout containing your portfolio components.
  - `css/style.css` — All global layout stylings, specific component designs, flexbox/grids, and responsive media queries.
  - `images/` — Contains your static local imagery (e.g., profile photo, project thumbnails).
- `.env` — Extremely critical environment configuration (Keep this out of version control!)

## Customization Guide
- **Personal Data**: Simply open `public/index.html` to easily edit your name, custom tagline, and social profile hyperlink endpoints.
- **Images**: Drag any new thumbnails into your `public/images/project/` folder, and link their filenames up inside the HTML `<img src="/public/images/project/YOUR-IMAGE.png">` tags to update your cards.
- **Theming**: You can radically change the vibe of the entire portfolio simply by editing the main colored CSS Tokens in `:root` near the top of `public/css/style.css` (for example, tweak `--primary-orange` to change the entire accent scheme).

## License
Open-sourced and explicitly designed for awesome individual developers!
