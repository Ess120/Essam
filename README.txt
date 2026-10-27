ESSAM DIGITAL HUB — WHATSAPP + EMAIL VERSION
================================================

This version does not use Supabase, a database, a login system, or an admin page.

CONTACT DETAILS
- WhatsApp: +234 9020397402
- Email: essamtechnology76@gmail.com

HOW THE FORMS WORK
1. A visitor fills in the client enquiry, partner application, or talent registration form.
2. The visitor presses the submit button.
3. The site validates required fields and displays WhatsApp and email options.
4. If they choose WhatsApp, WhatsApp opens with their details in a prewritten message to ESSAM.
5. If they choose email, their default mail app opens with the details in a draft addressed to ESSAM.
6. The visitor must press Send in WhatsApp or their email app. The website cannot silently send a message from a visitor's device.

IMPORTANT LIMITATION
A normal static HTML/CSS/JavaScript website cannot automatically deliver an email or WhatsApp message in the background without a backend or a form service. This version uses direct links so you can manually reply to each person. A visitor can close the app without sending, so check that they press Send.

FILES
- index.html: home page
- services.html: service descriptions
- client-request.html: buyer/client enquiry form
- partners.html: marketing partner application
- talent.html: talent registration
- styles.css: responsive design
- app.js: form validation and WhatsApp/email message creation

NO ADMIN PAGE
The admin page and Supabase setup files have been removed.

TEST
Open index.html in a browser. Fill in each form with test details and try both send options. Do not submit test messages to your real inbox unless you want them there.

PUBLISH
Upload these files to your hosting provider or GitHub Pages. Keep all HTML, CSS, and JS files in the same folder. No API keys or backend configuration are required.
