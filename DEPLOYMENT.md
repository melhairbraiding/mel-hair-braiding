# Mel Hair Braiding Website Publishing Guide

This site is ready for Netlify hosting with an editable admin area.

## What you will have

- Public website: `https://melhairbraiding.com`
- Admin editor: `https://melhairbraiding.com/admin`
- Editable content file: `content/site.json`
- Image uploads: `assets/uploads`

## Publish on Netlify

1. Create a GitHub account if you do not already have one.
2. Create a new GitHub repository for this website.
3. Upload these website files to the repository.
4. Create a Netlify account.
5. In Netlify, choose **Add new site** then **Import an existing project**.
6. Connect the GitHub repository.
7. Leave the build command blank.
8. Leave the publish directory as the project root.
9. Deploy the site.

## Turn on the login editor

1. In Netlify, open the site dashboard.
2. Go to **Identity** and enable Identity.
3. Set registration to **Invite only**.
4. Go to **Services** under Identity and enable **Git Gateway**.
5. Invite yourself as a user.
6. Accept the invite from your email.
7. Visit `/admin` on the live site and log in.

## Connect melhairbraiding.com

1. Buy `melhairbraiding.com` from a domain registrar or through Netlify.
2. In Netlify, open **Domain management**.
3. Add `melhairbraiding.com` as a custom domain.
4. Follow Netlify's DNS instructions.

After DNS finishes updating, the website will be public at `melhairbraiding.com`.
