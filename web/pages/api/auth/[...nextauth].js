import NextAuth from 'next-auth'
import { signIn } from 'next-auth/client'
import Provider from 'next-auth/providers'

export default NextAuth({
    providers: [
        Provider.Google({
            clientId: `${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`,
            clientSecret: `${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET}`,
            authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
        })
    ],
    callbacks: {
        async redirect(url, baseUrl) {
            return url.startsWith(baseUrl)
                ? url
                : baseUrl
        },
    }
})
