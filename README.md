# Welcome to your Lovable project

## Creator and community interest data

Billing Hub is the canonical destination for creator, promoter, storyteller, supporter, connector, and community-interest submissions. The anonymous form at `/beyondtheyellow` calls a narrow Billing Hub RPC and does not create accounts or require login. See [the workflow, field map, security model, operations, and rollback guide](docs/creator-community-interest-workflow.md) and [the pre-change audit](docs/pre-change-interest-audit-2026-07-17.md).

## Google Ads conversion tracking

Successful clinician-interest registrations use the verified `Therapist Application Submitted` Google Ads conversion action. See [the clinician Google Ads conversion guide](docs/clinician-google-ads-conversion.md) before changing the Ads account, conversion label, or success trigger.

## Project info

**Lovable project**: https://lovable.dev/projects/c758642f-82dd-4b2c-89f4-751876e059fc

**Production site**: https://valorwell.org

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/c758642f-82dd-4b2c-89f4-751876e059fc) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Open the [ValorWell Website project](https://lovable.dev/projects/c758642f-82dd-4b2c-89f4-751876e059fc) and click Share -> Publish, then verify [valorwell.org](https://valorwell.org).

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
