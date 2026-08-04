# Toolstack

A privacy-first collection of fast browser utilities for developers, creators, and everyday work.

## Run in VS Code

1. Open the `micro-tools` folder in VS Code.
2. Open **Terminal → New Terminal**.
3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL printed in the terminal.

Changes to files inside `app`, `components`, or `lib` will refresh automatically.

## Other commands

```bash
npm run build   # Create a production build
npm run start   # Run the production build
npm run lint    # Check the code
```

## Deploy to Vercel

Push the finished project to GitHub, import that repository in Vercel, and keep the detected framework as **Next.js**. No custom build settings are required.

After choosing the final domain, add this Vercel environment variable so the sitemap uses it:

```text
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Included tools

- JSON formatter and validator
- Base64 encoder/decoder
- URL encoder/decoder
- UUID generator
- SHA hash generator
- Password and passphrase generator
- Word and character counter
- Text case converter
- Lorem ipsum generator
- Regex tester
- HEX/RGB/HSL color converter
- Unix timestamp converter
- Number base converter
- Private image compressor
- PNG, JPG and WebP converter
- Plain-background remover with precision controls
- PNG/JPG images to PDF
- PDF merger with file reordering
- PDF page extractor

MongoDB and Cloudinary can be added later when accounts, saved history, shared files, or persistent image storage are introduced.
