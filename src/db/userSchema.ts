

import { pgTable, varchar, text ,integer} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { NEVER } from "zod";


export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),

  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  role: varchar({ length: 255 }).notNull().default("user"),

  name: varchar({ length: 255 }).notNull(),
  address: text(),
});

export const createUsersSchema = createInsertSchema(usersTable).omit({id: NEVER,
    role: true,
});
export const loginUsersSchema = createInsertSchema(usersTable).pick({email: true,
    password: true,
});
