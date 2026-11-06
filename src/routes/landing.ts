import { Hono } from "hono";

export const landing = new Hono();

const landingHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ridgewood Retreats — Modern Short-Let Bookings</title>
  <style>
    :root {
      --primary: #2d5a27;
      --primary-hover: #1e3d1a;
      --accent: #d4a373;
      --bg-color: #f8f9fa;
      --card-bg: #ffffff;
      --text-main: #1f2937;
      --text-muted: #4b5563;
      --border-color: #e5e7eb;
      --font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      --spacing-xs: 0.5rem;
      --spacing-sm: 1rem;
      --spacing-md: 1.5rem;
      --spacing-lg: 2.5rem;
      --spacing-xl: 4rem;
      --border-radius: 12px;
      --shadow-sm: 0 1px 3px rgba(0,0,0,0.1);
      --shadow-md: 0 4px 6px -1px rgba(0,0,0,0.1);
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: var(--font-family);
      background-color: var(--bg-color);
      color: var(--text-main);
      line-height: 1.6;
    }

    a {
      color: var(--primary);
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }

    header {
      background-color: var(--card-bg);
      border-bottom: 1px solid var(--border-color);
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .nav-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: var(--spacing-sm) var(--spacing-md);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      font-size: 1.4rem;
      font-weight: 700;
      color: var(--primary);
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .nav-links {
      display: flex;
      gap: var(--spacing-md);
      list-style: none;
      align-items: center;
    }

    .nav-links a {
      font-weight: 500;
      font-size: 0.95rem;
      color: var(--text-main);
      transition: color 0.2s ease;
    }

    .nav-links a:hover {
      color: var(--primary);
      text-decoration: none;
    }

    .hero {
      background: linear-gradient(135deg, #1e3d1a 0%, #2d5a27 100%);
      color: #ffffff;
      padding: var(--spacing-xl) var(--spacing-md);
      text-align: center;
    }

    .hero-content {
      max-width: 800px;
      margin: 0 auto;
    }

    .hero h1 {
      font-size: 2.75rem;
      font-weight: 800;
      margin-bottom: var(--spacing-sm);
      line-height: 1.2;
    }

    .hero p {
      font-size: 1.2rem;
      color: #e2e8f0;
      margin-bottom: var(--spacing-lg);
    }

    .cta-group {
      display: flex;
      gap: var(--spacing-sm);
      justify-content: center;
      flex-wrap: wrap;
    }

    .btn {
      display: inline-block;
      padding: 0.75rem 1.5rem;
      border-radius: var(--border-radius);
      font-weight: 600;
      font-size: 1rem;
      transition: background-color 0.2s ease, transform 0.1s ease;
    }

    .btn-primary {
      background-color: var(--accent);
      color: #1f2937;
    }

    .btn-primary:hover {
      background-color: #c39262;
      text-decoration: none;
    }

    .btn-secondary {
      background-color: rgba(255, 255, 255, 0.15);
      color: #ffffff;
      border: 1px solid rgba(255, 255, 255, 0.3);
    }

    .btn-secondary:hover {
      background-color: rgba(255, 255, 255, 0.25);
      text-decoration: none;
    }

    main {
      max-width: 1200px;
      margin: 0 auto;
      padding: var(--spacing-xl) var(--spacing-md);
    }

    .section-title {
      font-size: 2rem;
      font-weight: 700;
      text-align: center;
      margin-bottom: var(--spacing-xs);
      color: var(--text-main);
    }

    .section-subtitle {
      text-align: center;
      color: var(--text-muted);
      margin-bottom: var(--spacing-lg);
      font-size: 1.05rem;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: var(--spacing-md);
      margin-bottom: var(--spacing-xl);
    }

    .card {
      background-color: var(--card-bg);
      border-radius: var(--border-radius);
      padding: var(--spacing-md);
      border: 1px solid var(--border-color);
      box-shadow: var(--shadow-sm);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .card:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }

    .card-icon {
      font-size: 2rem;
      margin-bottom: var(--spacing-xs);
    }

    .card h3 {
      font-size: 1.25rem;
      margin-bottom: var(--spacing-xs);
      color: var(--primary);
    }

    .card p {
      color: var(--text-muted);
      font-size: 0.95rem;
    }

    .api-section {
      background-color: var(--card-bg);
      border-radius: var(--border-radius);
      padding: var(--spacing-lg);
      border: 1px solid var(--border-color);
      box-shadow: var(--shadow-sm);
    }

    .code-block {
      background-color: #1e1e1e;
      color: #d4d4d4;
      padding: var(--spacing-md);
      border-radius: 8px;
      overflow-x: auto;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 0.9rem;
      margin-top: var(--spacing-xs);
      margin-bottom: var(--spacing-md);
    }

    footer {
      background-color: var(--card-bg);
      border-top: 1px solid var(--border-color);
      padding: var(--spacing-lg) var(--spacing-md);
      text-align: center;
      color: var(--text-muted);
      font-size: 0.9rem;
    }

    .footer-links {
      display: flex;
      justify-content: center;
      gap: var(--spacing-md);
      margin-bottom: var(--spacing-sm);
    }

    @media (max-width: 640px) {
      .hero h1 {
        font-size: 2rem;
      }
      .nav-links {
        gap: var(--spacing-xs);
      }
    }
  </style>
</head>
<body>
  <header>
    <nav class="nav-container">
      <div class="logo">🌲 Ridgewood Retreats</div>
      <ul class="nav-links">
        <li><a href="/rooms">Rooms</a></li>
        <li><a href="/health">Health</a></li>
        <li><a href="#amenities">Amenities</a></li>
        <li><a href="#api">API Docs</a></li>
      </ul>
    </nav>
  </header>

  <section class="hero">
    <div class="hero-content">
      <h1>Serene Escapes, Unforgettable Stays</h1>
      <p>Discover hand-crafted short-let retreats nestled in lush natural landscapes. Book directly or integrate via our REST API.</p>
      <div class="cta-group">
        <a href="/rooms" class="btn btn-primary">Browse Available Rooms</a>
        <a href="/health" class="btn btn-secondary">API Status Check</a>
      </div>
    </div>
  </section>

  <main>
    <section id="amenities">
      <h2 class="section-title">Why Stay With Us</h2>
      <p class="section-subtitle">Crafted for relaxation, designed for modern comfort</p>
      <div class="features-grid">
        <article class="card">
          <div class="card-icon">🌲</div>
          <h3>Pristine Locations</h3>
          <p>Tucked away in quiet woodlands with mountain views, hiking trails, and clear night skies.</p>
        </article>
        <article class="card">
          <div class="card-icon">🏡</div>
          <h3>Luxury Cabins</h3>
          <p>Fully furnished private retreats equipped with high-speed Wi-Fi, hot tubs, and modern kitchens.</p>
        </article>
        <article class="card">
          <div class="card-icon">⚡</div>
          <h3>Real-time Pricing</h3>
          <p>Dynamic seasonal rates and instant booking availability via our high-performance API.</p>
        </article>
        <article class="card">
          <div class="card-icon">🌿</div>
          <h3>Eco-Friendly</h3>
          <p>Solar-powered living spaces with zero-waste initiatives and sustainable water systems.</p>
        </article>
      </div>
    </section>

    <section id="api" class="api-section">
      <h2 class="section-title">Developer & API Resources</h2>
      <p class="section-subtitle">Interact with our service endpoints programmatically</p>
      
      <h3>Available Rooms Endpoint</h3>
      <p>Fetch active room inventory directly via GET requests:</p>
      <div class="code-block">curl -X GET https://api.ridgewoodretreats.com/rooms</div>

      <h3>Create a Booking (POST /bookings)</h3>
      <p>To reserve a room, issue a POST payload with guest details and dates:</p>
      <div class="code-block">curl -X POST https://api.ridgewoodretreats.com/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "room_id": "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
    "guest_name": "Jane Doe",
    "guest_email": "jane@example.com",
    "check_in": "2025-06-01",
    "check_out": "2025-06-05"
  }'</div>

      <h3>Cancel a Booking (DELETE /bookings/:id)</h3>
      <p>Soft delete an existing booking by sending a DELETE request with the booking ID:</p>
      <div class="code-block">curl -X DELETE https://api.ridgewoodretreats.com/bookings/BOOKING_UUID</div>
    </section>
  </main>

  <footer>
    <div class="footer-links">
      <a href="/rooms">Rooms API</a>
      <a href="/health">Health Check</a>
      <a href="#api">Documentation</a>
    </div>
    <p>&copy; ${new Date().getFullYear()} Ridgewood Retreats. All rights reserved.</p>
  </footer>
</body>
</html>`;

landing.get("/", (c) => {
  return c.html(landingHtml);
});
