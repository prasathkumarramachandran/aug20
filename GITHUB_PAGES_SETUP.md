# GitHub Pages Setup

## What to Publish

Use the `docs/` folder as the GitHub Pages source. It contains only the candidate-facing page and required assets:

- `index.html`
- `app.js`
- `styles.css`
- `Gemini_Generated_Image_7ed2jc7ed2jc7ed2.png`
- `.nojekyll`

Do not publish `interviewer.html` through GitHub Pages if you want to keep the interviewer scoring page private.

## Enable GitHub Pages

1. Push this repository to GitHub.
2. Open the repository in GitHub.
3. Go to `Settings` > `Pages`.
4. Under `Build and deployment`, choose `Deploy from a branch`.
5. Select your branch, usually `main`.
6. Select the `/docs` folder.
7. Click `Save`.

GitHub will publish the candidate page at a URL like:

```text
https://<your-github-user>.github.io/<repository-name>/
```

Share only that URL with candidates.

## Privacy Note

GitHub Pages for a public repository is public on the internet. It is not password-protected. If you only share the URL, it behaves like an unlisted page, but anyone with the link can view it.

If you need real access control, use one of these options instead:

- Make the repository private and confirm your GitHub plan supports private GitHub Pages.
- Host the candidate page behind authentication, such as SharePoint, Azure Static Web Apps with authentication, Netlify password protection, or another controlled hosting option.
- Keep the candidate page in GitHub Pages only if the content is safe for candidates to access.