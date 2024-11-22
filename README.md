# ChatVPC

This is a [T3 Stack](https://create.t3.gg/) project for the Worcester Polytechnic Institute Venice Project Center. This is a chat bot that uses VPC collected data to answer user questions.

## Prerequisites

This app uses `pnpm` for a package manager. If you do not already have `pnpm` installed yet, run the following command: 

```sh
npm install -g pnpm
```

You may need to use `sudo npm install -g pnpm` if you get a permissions error.

## Running locally

You must create a new `.env` file and add all your enviroment variables in order to run the app.
This file is in the `.gitignore`, do not ever push your enviroment variables to github!!

To make this `.env` file, run the following command:

```sh
cp .env.example .env
```

You must collect the following enviroment variables from other websites:

- [Pinecone](https://www.pinecone.io/)
- [Gemini](https://ai.google.dev/aistudio)

To run this app locally, run the following command:

```sh
pnpm run dev
```

If you are not familiar with the different technologies used in this project, please refer to the respective docs.

- [Next.js](https://nextjs.org)
- [Prisma](https://prisma.io)
    - We use [Supabase](https://supabase.com) to host our Postges database.
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)
- [ShadCN](https://ui.shadcn.com/)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)

## How do I deploy this?

Follow the T3 deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.

## Contributers

- [Mina Boktor](https://github.com/minaboktor2628)
- [James Walden](https://github.com/jdwalden74)
- [Krishna Garg](https://github.com/kgkhs001)
- [Lucas Lamenha](https://github.com/jlamenha)

## Important links

- [WPI homepage](https://www.wpi.edu/)
