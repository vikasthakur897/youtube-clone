import { db } from "@/db";
import { categories } from "@/db/schema";
import { baseProcedure , createTRPCRouter} from "@/trpc/init";

export const categoriesRouter = createTRPCRouter({
    list: baseProcedure.query(async () => {
        const allCategories = await db.select().from(categories);  
        return allCategories;
    }),
});