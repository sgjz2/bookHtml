# DesignBook Pages

This folder contains the complete static build of *The Meaning of Design*.

## Publish with GitHub Pages

1. Create a public GitHub repository named `design-art-book`.
2. Upload the contents of this folder to the repository root.
3. Open `Settings > Pages` in the repository.
4. Under `Build and deployment`, select `Deploy from a branch`.
5. Select the `main` branch and the `/(root)` folder, then save.
6. Open `https://YOUR-USERNAME.github.io/design-art-book/` after deployment completes.

Upload the contents of this folder, not the folder itself and not only the ZIP file.

The `.nojekyll` file must remain in the repository root.

## Update the site

Rebuild the book, replace the published files with the latest `dist` output, and push the changes to GitHub.

No server, Node runtime, CDN, or external API is required.
