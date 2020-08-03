import { Resolver, Mutation, Arg } from "type-graphql";
import { Product } from "./Product";
import { ProductInput } from "./createProduct/ProductInput";
import { prisma } from "../prisma";
import { createWriteStream } from "fs";
import { GraphQLUpload } from "graphql-upload";
import { Upload } from "src/types/Upload";

@Resolver()
export class CreateProductResolver {
    @Mutation(() => Product, { nullable: true })
    async createProduct(
        @Arg("data") data: ProductInput,
        @Arg("image", () => GraphQLUpload, { nullable: true }) image: Upload
    ): Promise<Product | null> {
        if (image) {
            data.image = await new Promise((resolve, reject) => {
                image
                    .createReadStream()
                    .pipe(
                        createWriteStream(
                            `${__dirname}/../../../images/${image.filename}`
                        )
                    )
                    .on("finish", () => resolve(image.filename))
                    .on("error", () => reject(data.image));
            });
        } else {
            data.image = "default.png";
        }

        return await prisma.product.create({ data });
    }
}
