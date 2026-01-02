import express from "express";
import fs from "fs";
import path from "path";
import { bannerSizes } from "./sizes.js";
import { tokens } from "./design-tokens.js";

const app = express();
app.use(express.json());
app.use(express.static("."));

app.post("/generate", (req, res) => {
  const content = req.body;
  if (!content) return res.json({ success: false });

  bannerSizes.forEach(size => {
    const isSmallWidth = size.width <= 660;
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Banner ${size.width}x${size.height}</title>
      <style>
        body { margin:0; font-family:${tokens.fonts.body}; }
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
        .text { flex:1; }
        .text h1 { font-family:${tokens.fonts.heading}; font-size:1.2em; color:${content.brandColor}; margin:0 0 8px 0; }
        .text h2 { font-family:${tokens.fonts.subheading}; font-size:1em; color:#ffcc00; margin:0 0 8px 0; }
        .text p { margin:0 0 8px 0; color:#333; font-size:0.9em; }
        .cta { display:inline-block; padding:8px 16px; background-color:${content.brandColor}; color:#fff; text-decoration:none; border-radius:4px; }
        .cta:hover { background-color:#e03e00; }
      </style>
    </head>
    <body>
      <div class="banner">
        <img src="${content.image}" alt="Banner Image" />
        <div class="text">
          <h1>${content.h1}</h1>
          <h2>${content.h2}</h2>
          <p>${content.p}</p>
          <a href="#" class="cta">${content.cta}</a>
        </div>
      </div>
    </body>
    </html>
    `;

    if (!fs.existsSync("banners")) fs.mkdirSync("banners");
    fs.writeFileSync(path.join("banners", `banner_${size.width}x${size.height}.html`), html);
  });

  res.json({ success: true });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));