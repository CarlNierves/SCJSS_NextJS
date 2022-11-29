import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user}: any) {
            if(user?._id) token._id = user._id;
            return token;
        },
        async session({ session, token}: any) {
            if(token?._id) session.user._id = token._id;
            return session;
        },
    },
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {   
                a: {
                    label: "res",
                    type: "string",
                },
                b: {
                    label: "username",
                    type: "string",
                },
                c: {
                    label: "email",
                    type: "string",
                },
                d: {
                    label: "id",
                    type: "string",
                } 
            },
            async authorize(credentials) {
                    
                if(credentials?.a === 'success') {
                    return {
                        _id: credentials?.d,
                        name: credentials?.b,
                        email: credentials?.c,
                    }
                }
                 throw new Error("Invalid email or password");
            },
        }),
    ],
});