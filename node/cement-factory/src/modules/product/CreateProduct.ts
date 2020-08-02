import {Resolver, Mutation, Arg} from "type-graphql"
import {Product} from "./Product";
import {ProductInput} from "./createProduct/ProductInput"
import {prisma} from "../prisma"
import {createWriteStream} from "fs"

@Resolver()
export class CreateProductResolver {

    @Mutation(() => Product, { nullable: true })
    async createProduct(@Arg("data") data: ProductInput): Promise<Product | null> {
        if (data.imageFile) {
            data.image = await new Promise((resolve, reject) => {
                data.imageFile.createReadStream()
                    .pipe(createWriteStream(`${__dirname}/../../../images/${data.imageFile.filename}`))
                    .on("finish", () => resolve(data.imageFile.filename))
                    .on("error", () => reject(data.image))
            })

        } else {
            data.image = "default.png"
        }
        
        return await prisma.product.create({ data })
    }
    
}
