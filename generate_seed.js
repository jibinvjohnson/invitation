const fs = require('fs');

const categories = [
  { name: 'Christian Wedding', slug: 'christian-wedding', icon: '💍', styles: ['Church aesthetic', 'Elegant cross motifs', 'White and gold luxury', 'Floral minimal', 'Modern luxury typography'] },
  { name: 'Hindu Wedding', slug: 'hindu-wedding', icon: '🌺', styles: ['Royal Indian aesthetic', 'Mandala patterns', 'Temple themes', 'Red and gold palettes', 'Traditional luxury'] },
  { name: 'Muslim Wedding', slug: 'muslim-wedding', icon: '🕌', styles: ['Islamic geometric patterns', 'Green and gold luxury', 'Elegant Arabic typography', 'Minimal premium styles', 'Modern nikah'] },
  { name: 'Baptism', slug: 'baptism', icon: '🕊️', styles: ['Soft pastel themes', 'Holy cross symbols', 'Elegant baby celebration', 'White and sky blue tones', 'Minimal pure'] },
  { name: 'Birthday', slug: 'birthday', icon: '🎂', styles: ['Luxury birthday themes', 'Kids colorful themes', 'Adult elegant black and gold', 'Modern minimalist cards', 'Vibrant party'] },
  { name: 'Engagement', slug: 'engagement', icon: '🥂', styles: ['Romantic luxury layouts', 'Soft floral aesthetics', 'Gold typography', 'Modern clean styles', 'Classic elegance'] },
  { name: 'Save The Date', slug: 'save-the-date', icon: '📅', styles: ['Cinematic layouts', 'Countdown aesthetics', 'Photo-focused templates', 'Minimal modern typography', 'Bold date reveal'] },
  { name: 'Anniversary', slug: 'anniversary', icon: '🎉', styles: ['Elegant romantic themes', 'Golden celebration', 'Luxury serif typography', 'Silver jubilee sparkle', 'Timeless love'] },
  { name: 'Baby Shower', slug: 'baby-shower', icon: '👶', styles: ['Cute pastel themes', 'Minimal baby illustrations', 'Soft premium layouts', 'Watercolor aesthetic', 'Stork delivery'] },
  { name: 'Housewarming', slug: 'housewarming', icon: '🏠', styles: ['Modern home aesthetics', 'Elegant typography', 'Warm neutral colors', 'New keys theme', 'Cozy nest'] }
];

const fonts = ['Playfair Display', 'Inter', 'Cinzel', 'Great Vibes', 'Montserrat', 'Cormorant Garamond'];
const themes = [
  '{"primary": "#D4AF37", "secondary": "#FFFFFF"}', 
  '{"primary": "#1A1A1A", "secondary": "#F5F5F5"}',
  '{"primary": "#8B0000", "secondary": "#FFD700"}',
  '{"primary": "#2E8B57", "secondary": "#F0FFF0"}',
  '{"primary": "#FFB6C1", "secondary": "#FFF0F5"}'
];
const featuresList = [
  '["RSVP Tracking", "Music Player", "Photo Gallery"]',
  '["RSVP Tracking", "Map Integration", "Multiple Events"]',
  '["Countdown Timer", "Add to Calendar"]',
  '["Blessings Wall", "Photo Gallery"]',
  '["Gift Registry Link", "Photo Gallery"]'
];

let sql = `-- Clear existing data
TRUNCATE TABLE public.templates CASCADE;
TRUNCATE TABLE public.categories CASCADE;

-- Insert Categories
INSERT INTO public.categories (id, name, slug, icon) VALUES
`;

const categoryUUIDs = {};
categories.forEach((cat, i) => {
  const uuid = `uuid_generate_v5(uuid_ns_url(), 'invitenest.com/category/${cat.slug}')`;
  categoryUUIDs[cat.slug] = uuid;
  sql += `  (${uuid}, '${cat.name}', '${cat.slug}', '${cat.icon}')${i === categories.length - 1 ? ';' : ','}\n`;
});

const layouts = ['collage', 'ripped_paper', 'split_minimal', 'classic'];

sql += `\n-- Insert Templates\nINSERT INTO public.templates (title, description, price, category_id, image_url, preview_image_url, theme_colors, font_style, features, is_trending, is_premium, is_featured, layout_type, layout_config) VALUES\n`;

const templates = [];

categories.forEach(cat => {
  for (let i = 1; i <= 20; i++) {
    const style = cat.styles[Math.floor(Math.random() * cat.styles.length)];
    const title = `${cat.name} - ${style} Edition ${i}`;
    const desc = `A premium ${style.toLowerCase()} design perfectly suited for your ${cat.name.toLowerCase()} celebration.`;
    const price = Math.floor(Math.random() * (4000 - 1000 + 1) + 1000);
    const catId = categoryUUIDs[cat.slug];
    const imgMap = {
      'christian-wedding': '/christian.png',
      'hindu-wedding': '/hindu.png',
      'muslim-wedding': '/christian.png', // fallback
      'baptism': '/baptism.png',
      'birthday': '/birthday.png',
      'engagement': '/engagement.png',
      'save-the-date': '/christian.png',
      'anniversary': '/birthday.png',
      'baby-shower': '/baptism.png',
      'housewarming': '/hero.png'
    };
    const imgUrl = imgMap[cat.slug] || '/hero.png';
    const previewUrl = imgUrl; // Using same for mockup
    const font = fonts[Math.floor(Math.random() * fonts.length)];
    const theme = themes[Math.floor(Math.random() * themes.length)];
    const features = featuresList[Math.floor(Math.random() * featuresList.length)];
    const isTrending = Math.random() > 0.8;
    const isPremium = Math.random() > 0.6;
    const isFeatured = Math.random() > 0.85;
    const layout = layouts[Math.floor(Math.random() * layouts.length)];
    const layoutConfig = '{"image_count": 4, "alignment": "center"}';

    templates.push(`  ('${title}', '${desc}', ${price}, ${catId}, '${imgUrl}', '${previewUrl}', '${theme}', '${font}', '${features}', ${isTrending}, ${isPremium}, ${isFeatured}, '${layout}', '${layoutConfig}')`);
  }
});

sql += templates.join(',\n') + ';\n';

fs.writeFileSync('supabase_seed.sql', sql);
console.log('Seed file generated with 200 templates.');
