import fs from "fs";
import { bannerContent } from "./assets/js/content-config.js";
import { bannerSizes } from "./assets/js/sizes.js";
import { tokens } from "./assets/js/design-tokens.js";

const generateBannerHTML = (size) => {
  const isSmallWidth = size.width <= 660;
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Banner ${size.width}x${size.height}</title>
    <style>
      body {
        margin:0;
        font-family:${tokens.fonts.body};
      }
      .banner {
        width:${size.width}px;
        height:${size.height}px;
        display:flex;
        flex-direction: ${isSmallWidth ? "column" : "row"};
        align-items:center;
        background-color:${tokens.colors.background};
        border: 1px solid #ddd;
        box-sizing:border-box;
        padding: ${tokens.spacing.medium};
      }
      .banner img {
        max-width: ${isSmallWidth ? "100%" : "30%"};
        max-height: ${size.height - 20}px;
        object-fit: cover;
        margin-right: ${isSmallWidth ? "0" : tokens.spacing.medium};
        margin-bottom: ${isSmallWidth ? tokens.spacing.medium : "0"};
      }
      .text {
        flex: 1;
      }
      .text h1 {
        font-family: ${tokens.fonts.heading};
        font-size: 1.2em;
        color: ${tokens.colors.primary};
        margin:0 0 ${tokens.spacing.small} 0;
      }
      .text h2 {
        font-family: ${tokens.fonts.subheading};
        font-size: 1em;
        color: ${tokens.colors.secondary};
        margin:0 0 ${tokens.spacing.small} 0;
      }
      .text p {
        margin:0 0 ${tokens.spacing.small} 0;
        color:${tokens.colors.text};
        font-size: 0.9em;
      }
      .cta {
        display:inline-block;
        padding: ${tokens.spacing.small} ${tokens.spacing.medium};
        background-color: ${bannerContent.brandColor};
        color:#fff;
        text-decoration:none;
        border-radius: ${tokens.borderRadius};
      }
      .cta:hover {
        background-color: ${tokens.colors.ctaHover};
      }
    </style>
  </head>
  <body>
    <div class="banner">
      <img src="${bannerContent.image}" alt="Banner Image" />
      <div class="text">
        <h1>${bannerContent.h1}</h1>
        <h2>${bannerContent.h2}</h2>
        <p>${bannerContent.p}</p>
        <a href="#" class="cta">${bannerContent.cta}</a>
      </div>
    </div>
  </body>
  </html>
  `;
};

// Generate all banners
bannerSizes.forEach(size => {
  const html = generateBannerHTML(size);
  fs.writeFileSync(`banners/banner_${size.width}x${size.height}.html`, html);
  console.log(`Generated banner_${size.width}x${size.height}.html`);
});
