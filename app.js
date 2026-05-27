// Narizari Agency - Luxury AI Laboratory
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
    { path: '/ecommerce-marketing', title: 'eCommerce & Marketing', headline: 'Full-Suite Tactical Co-Pilot', description: 'Platform management, performance campaigns, SEO and analytics.' },
    { path: '/digital-marketing', title: 'Intelligent Marketing', headline: 'High-ROAS Paid Campaigns', description: 'Precision audience targeting and advanced funnel optimization.' },
    { path: '/branding', title: 'Creative Couture', headline: 'Cinematic Storytelling & Visual DNA', description: 'Bespoke film shoots and editorial visual assets directed in Varanasi.' },
    { path: '/industries', title: 'Industries', headline: 'Sectors We Transform', description: 'From traditional looms to global digital retail.' },
    { path: '/agency', title: 'Agency', headline: 'The Neural Laboratory', description: 'Our philosophy blends century-old craftsmanship with future-tech.' },
    { path: '/our-team', title: 'Our Team', headline: 'The Architects of Silk', description: 'A diverse group of AI researchers, designers, and textile experts.' },
    { path: '/about', title: 'About Us', headline: 'The Legacy & Neural Loom', description: 'At home, with us. Weaving tradition and intelligence.' },
    { path: '/blogs', title: 'Blogs', headline: 'Silk & Intelligence', description: 'Insights, trends, and the future of Varanasi silk.' },
    { path: '/careers', title: 'Careers', headline: 'Join the Legacy', description: 'We are always looking for visionary minds to join our mission.' },
    { path: '/connect', title: 'Connect', headline: 'Start a Conversation', description: 'Let us discuss how we can elevate your brand to the global stage.' },
    { path: '/book-now', title: 'Book Now', headline: 'Secure a Consultation', description: 'Direct access to our strategic partners for your digital transformation.' }
];

pages.forEach(page => {
    app.get(page.path, (req, res) => {
        if (page.path === '/services') {
            res.render('services', {
                pageTitle: page.title,
                pageHeadline: page.headline,
                pageDescription: page.description,
                path: page.path
            });
        } else if (page.path === '/ecommerce-marketing') {
            res.render('ecommerce-marketing', {
                pageTitle: page.title,
                pageHeadline: page.headline,
                pageDescription: page.description,
                path: page.path
            });
        } else if (page.path === '/digital-marketing') {
            res.render('digital-marketing', {
                pageTitle: page.title,
                pageHeadline: page.headline,
                pageDescription: page.description,
                path: page.path
            });
        } else if (page.path === '/branding') {
            res.render('branding', {
                pageTitle: page.title,
                pageHeadline: page.headline,
                pageDescription: page.description,
                path: page.path
            });
        } else if (page.path === '/about') {
            res.render('about', {
                pageTitle: page.title,
                pageHeadline: page.headline,
                pageDescription: page.description,
                path: page.path
            });
        } else if (page.path === '/book-now') {
            res.render('book-now', {
                pageTitle: page.title,
                pageHeadline: page.headline,
                pageDescription: page.description,
                path: page.path
            });
        } else {
            res.render('page', {
                pageTitle: page.title,
                pageHeadline: page.headline,
                pageDescription: page.description,
                path: page.path
            });
        }
    });
});

// STATIC FILES SECOND - to serve CSS, JS, and Assets
app.use(express.static(path.join(__dirname, 'public')));

// Export for Vercel
module.exports = app;

// Listen only if not running as a Vercel function
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Narizari Multi-Page Server is running on http://localhost:${PORT}`);
    });
}
