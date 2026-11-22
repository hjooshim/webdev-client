This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Run Assignment 5 locally

Check out the `a5` branch of this repository and the
[Express server](https://github.com/hjooshim/webdev-server/tree/a5) in sibling directories.
Run `npm ci` and `npm run dev` in each directory with Node.js 22 or later.

Next.js runs on port 3000 and Express runs on port 4000. Open
[Lab 5](http://localhost:3000/labs/lab5) or the
[Dashboard](http://localhost:3000/dashboard). Data written through Kambaz
survives a browser refresh while Express is running.

Run `node --test scripts/verify-a5.mjs` with both services running to check Lab 5
and the Kambaz API proxy. To check the deployment, set `A5_BASE_URL` to the
Vercel preview URL and `NEXT_PUBLIC_HTTP_SERVER` to the public Express URL.

Set `NEXT_PUBLIC_HTTP_SERVER` to the public HTTPS Express origin in the Vercel
A5 preview environment before deploying. This value is built into the client.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
