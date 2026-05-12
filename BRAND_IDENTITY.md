# Varanasi Silk AI: Brand Color Identity (Version 4 Final)

This document establishes the official visual identity for the **Varanasi Silk AI Agency**. Use these tokens and guidelines to maintain consistency across all web, social, and AI-generated assets.

---

## 1. Core Color Palette
The brand is defined by a deep, sophisticated wine-red gradient that represents the rich heritage of Banarasi silk, paired with muted gold for luxury and off-white for clarity.

### **The Signature Gradient**
Used for backgrounds, hero sections, and primary branding.
- **Gradient CSS**: `linear-gradient(135deg, #24090D 0%, #351015 30%, #4A1820 65%, #6A2A38 100%)`
- **Key Hex Codes**:
    - `Base Black-Red`: `#24090D`
    - `Deep Maroon`: `#351015`
    - `Royal Wine`: `#4A1820`
    - `Vibrant Berry Accent`: `#6A2A38`

### **Accent & Neutral Colors**
- **Primary Accent (Gold-Dim)**: `#A68D6A` (Used for borders, icons, and emphasized text)
- **Secondary Neutral (Off-White)**: `#E5E5E5` (Used for body text and contrast)
- **Background Deep**: `#180508` (Used for solid sections)

---

## 2. Typography
A blend of classic serif and modern sans-serif fonts to bridge the gap between tradition and AI.

- **Headlines (Pure Luxury)**: `Cormorant Garamond` (Lightweight, elegant serif)
- **Sub-Headlines & Branding**: `Italiana` (Modern fashion-inspired serif)
- **Body & Functional Text**: `Inter` (Extra Light weight)

---

## 3. AI Prompting Kit (Copy & Paste)

Use these snippets to generate consistent brand assets with tools like Midjourney, DALL-E, or Adobe Firefly.

### **For Imagery (Sarees & Interiors)**
> "A high-end luxury [OBJECT], captured in dramatic minimalist studio lighting. The color palette follows a deep wine-red aesthetic (#24090D, #4A1820) with subtle gold accents (#A68D6A). High-fashion editorial photography style, cinematic texture, 8k resolution, ultra-premium brand aesthetic."

### **For UI/UX Elements**
> "Modern minimalist website UI for a luxury agency. Deep maroon background gradient, glassmorphism cards, gold-dim borders, Playfair Display typography. High-fidelity editorial layout, sophisticated and tech-forward."

---

## 4. Visual Identity Summary
![Brand Style Tile](/Users/nihalkumar/.gemini/antigravity/brain/6064fd98-ee1c-476c-bca0-b60a82476bdd/brand_style_tile_v4_1778568642702.png)

---

## 5. Design Tokens (CSS)
```css
:root {
  --brand-gradient: linear-gradient(135deg, #24090D 0%, #351015 30%, #4A1820 65%, #6A2A38 100%);
  --accent-gold: #A68D6A;
  --text-main: #E5E5E5;
  --bg-deep: #24090D;
}
```
