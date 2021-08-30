This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Nextjs: v11.1.0
Nodejs: 14.17.5

This nextjs application has these features:

1. As a user I want to create a profile. 
2. As a user I want to Sign-in to my profile. 
3. As a user I want to view other users' profiles 
4. As a user I want the ability to "like" other user's profiles. 
5. As a user I want to be notified when I get a "like"

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Make sure to start the [https://github.com/AvdiuAndin/strapiSocialMedia](Strapi server) on port 1337
The application environment variables are static(hard coded)

This application implements all the features mentioned above.
Start by registering two users and then test the application.

If you want to test the notification feature open two tabs. One must be in Igcognito mode and then try to like the user on the other tab.