# ASOS APP

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## NPM

pre instalaciu dependencies

```bash
npm install
```

ak nejde npm install tak skusit

```bash
npm install --legacy-peer-deps
```

alebo

```bash
npm install --force
```

## Prisma

pre vytvoreni modelu

```bash
npx prisma generate
```

pre vytvoreni migracii

```bash
npx prisma migrate dev
```

pre push zmien do databazy

```bash
npx prisma db push
```

pre vytvoreni seedu

```bash
npx prisma db seed
```

pre graficke zobrazenie databazy

```bash
npx prisma studio
```

## Docker

```bash
docker compose up
```

Ak nemate docker, tak si ho nainstalujte. [Docker Desktop](https://www.docker.com/products/docker-desktop/)

treba si vytvorit .env file podla .env.example a dorobit do neho hodnoty pre POSTGRES_USER, POSTGRES_PASSWORD a POSTGRES_DB

ak nieco nefunguje tak treba skusit

```bash
docker compose down
```

a potom

```bash
docker compose up --build
```

ak sa nieco doinstaluje tak to iste