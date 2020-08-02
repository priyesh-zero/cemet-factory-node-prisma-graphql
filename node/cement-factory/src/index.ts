import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();
import { ApolloServer } from "apollo-server-express";

import express from "express";

import { buildSchema } from "type-graphql";
import { RegisterResolver } from "./modules/user/Register";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";
import { redis } from "./redis";
import { LoginResolver } from "./modules/user/Login";
import { MeResolver } from "./modules/user/Me";
import { InfoResolver } from "./modules/user/Info";
import {ProductInfoResolver} from "./modules/product/ProductInfo";
import {CreateProductResolver} from "./modules/product/CreateProduct"

const main = async () => {
    const schema = await buildSchema({
        resolvers: [RegisterResolver, LoginResolver, MeResolver, InfoResolver, ProductInfoResolver, CreateProductResolver]
    });

    const apolloServer = new ApolloServer({
        schema,
        context: ({ req }: any) => ({ req })
    });

    const app = express();

    const RedisStore = connectRedis(session);

    app.use(
        cors({
            credentials: true,
            origin: process.env.CLIENT_HOST
        })
    );

    app.use(
        session({
            store: new RedisStore({
                client: redis
            }),
            name: process.env.SESSION_NAME,
            secret: process.env.SESSION_SECRET!,
            resave: false,
            saveUninitialized: false,
            cookie: {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 1000 * 60 * 60 * 24 // 1 day
            }
        })
    );

    apolloServer.applyMiddleware({ app });

    app.listen(4000, () => {
        console.log("Server started on PORT 4000");
    });
};

main().catch(err => console.error("Main Error: ", err.message));
