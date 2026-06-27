# Design Refinement Plan – Netradeep Eye Hospital

We will enhance the visual design, contrast, and layout of the Netradeep Eye Hospital website located in `d:\DEMO WEBSITES\hospital\eye`.

## Proposed Changes

### Assets & Images
- Copy the four high-quality AI-generated doctor images from the artifact directory to the website folder:
  - `doctor-rajesh.png`
  - `doctor-priya.png`
  - `doctor-arjun.png`
  - `doctor-ananya.png`

### Styles (`style.css`)

#### [MODIFY] [style.css](file:///d:/DEMO%20WEBSITES/hospital/eye/style.css)
- **Doctor Images**:
  - Update `.doctor-img--1`, `.doctor-img--2`, `.doctor-img--3`, and `.doctor-img--4` to display the newly copied portrait images (`background-image: url('doctor-rajesh.png')` etc.) instead of the pure gradient backgrounds.
  - Remove the fallback emojis (`👨‍⚕️` and `👩‍⚕️`) from the pseudo-elements (`::before`) to show the clean portraits.
  - Ensure the images are centered, fit perfectly, and scale smoothly on hover.
- **Hero Section Visibility**:
  - Raise `.hero-bg-img` opacity to make the background eye-care imagery more visible and premium.
  - Tweak `.hero-overlay` gradient color and opacity to ensure the text remains legible while revealing the background depth.
- **Footer Styling & Contrast**:
  - Fix social button backgrounds (`.footer-social-btn`): replace dark-themed semi-transparent white backgrounds with clean, high-contrast light-theme styling (e.g. using `var(--blue-pale)` background and `var(--blue-primary)` icon color, transitioning to a solid gradient on hover).
  - Fix the footer bottom border (`.footer-bottom` border-top) to use a light-theme border color (`rgba(0, 87, 217, 0.1)`) instead of `rgba(255,255,255,0.07)`.
  - Style the certification badges (`.cert-badge`) with high-contrast, premium styling matching the hospital theme instead of low-contrast dark placeholders.
- **Navbar & Navigation**:
  - Ensure links are easily readable against the hero section under all scroll states.

## Verification Plan

### Manual Verification
- Review the layout, images, and contrast in the web browser.
- Verify that doctor portrait images display correctly and scale on hover.
- Verify that social media links and certification badges in the footer have premium aesthetics with sufficient contrast.
