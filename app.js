const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ROUTES FIRST - to ensure EJS handles the pages
app.get('/', (req, res) => {
    res.render('index');
});

const pages = [
    { path: '/services', title: 'Services', headline: 'Our Strategic Intelligence', description: 'Bespoke AI solutions designed for the luxury saree industry.' },
    { path: '/industries', title: 'Industries', headline: 'Sectors We Transform', description: 'From traditional looms to global digital retail.' },
    { path: '/agency', title: 'Agency', headline: 'The Neural Laboratory', description: 'Our philosophy blends century-old craftsmanship with future-tech.' },
    { path: '/our-team', title: 'Our Team', headline: 'The Architects of Silk', description: 'A diverse group of AI researchers, designers, and textile experts.' },
    { path: '/blogs', title: 'Blogs', headline: 'Silk & Intelligence', description: 'Insights, trends, and the future of Varanasi silk.' },
    { path: '/careers', title: 'Careers', headline: 'Join the Legacy', description: 'We are always looking for visionary minds to join our mission.' },
    { path: '/connect', title: 'Connect', headline: 'Start a Conversation', description: 'Let us discuss how we can elevate your brand to the global stage.' },
    { path: '/book-now', title: 'Book Now', headline: 'Secure a Consultation', description: 'Direct access to our strategic partners for your digital transformation.' }
];

pages.forEach(page => {
    app.get(page.path, (req, res) => {
        res.render('page', {
            pageTitle: page.title,
            pageHeadline: page.headline,
            pageDescription: page.description
        });
    });
});

// STATIC FILES SECOND - to serve CSS, JS, and Assets
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`Narizari Multi-Page Server is running on http://localhost:${PORT}`);
});
