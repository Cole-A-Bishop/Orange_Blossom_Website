# TODO: Publish the Site & Create a QR Code

## 1. Buy a domain
- Recommended registrar: [Namecheap](https://namecheap.com) (cheap, simple UI, easy DNS editing)
- Alternative: Cloudflare Registrar (sold at-cost)
- Name idea: `orangeblossomrvservices.com` or `orangeblossomrv.com`

## 2. Enable GitHub Pages
- Go to the repo on github.com → **Settings** → **Pages**
- Under "Build and deployment": Source = "Deploy from a branch", Branch = `main`, folder = `/ (root)` → Save
- Free URL available immediately: `https://cole-a-bishop.github.io/Orange_Blossom_Website/`

## 3. Connect the custom domain
- In the same Pages settings page, enter the custom domain (e.g. `www.orangeblossomrvservices.com`) in the "Custom domain" field
- GitHub will auto-create a `CNAME` file in the repo — ask Copilot to add it once the domain is picked

## 4. Update DNS at the registrar
- `www` subdomain → CNAME record → `cole-a-bishop.github.io`
- Apex/root domain (no `www`) → four A records →
  - `185.199.108.153`
  - `185.199.109.153`
  - `185.199.110.153`
  - `185.199.111.153`
- Wait for DNS propagation (~10 min to a few hours)
- Check "Enforce HTTPS" in Pages settings once DNS resolves

## 5. Generate the QR code
- Use a free QR generator (e.g. qr-code-generator.com) pointed at the final live URL
- Test-scan it with a phone before printing business cards
- Ask Copilot to generate the QR code PNG locally once the final URL is confirmed

## Placeholders still to update on the site
- Real email address (currently `your-email@example.com`)
- Real phone number (currently `(000) 000-0000`, used in Contact section and the sticky Call Now button)
- Logo image (currently a placeholder box)
