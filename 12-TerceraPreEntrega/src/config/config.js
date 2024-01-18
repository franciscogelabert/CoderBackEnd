import dotenv from 'dotenv';
dotenv.config();

export const config = {
    mongo: {
        URI: process.env.MONGODB_URI
    },
    admin: {
        usuario: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_PASSWORD,
    },
    GitHub: {
        gitappid:process.env.gitappid,
        clientID: process.env.gitclientid,
        clientSecret: process.env.gitclientsecret,
        callbackURL: process.env.gitcallbackurl,
    },
    persistence: {
        type: process.env.PERSISTENCE,
    }

}

