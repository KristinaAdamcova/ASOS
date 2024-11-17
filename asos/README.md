# ASOS APP

## Ako spustit aplikaciu

aplikacia sa po novom spusta pomocou jedneho commandu. Prvykrat treba spustit clean build.

```bash
npm run compose:dev:clean
```

potom staci spustat

```bash
npm run compose:dev
```

ak sa nahodou nejake zmeny nepreniesli tak treba spravit clean build znova

## NPM

pre instalaciu dependencies

```bash
npm install
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

alebo

```bash
docker compose down -v
```

a potom

```bash
docker compose up --build
```

ak sa nieco doinstaluje tak to iste

## Docs k pouzitym packages

- [prisma](https://www.prisma.io/docs/orm)
- [chakra](https://www.chakra-ui.com/docs/components/concepts/overview)
- [chakra templates](https://chakra-templates.vercel.app)
