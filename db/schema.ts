import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const startupTable = pgTable("startup", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar().notNull(),
  img: varchar().notNull(),
  description: varchar().notNull(),
  singleFund: integer().notNull(),
  totalTarget: integer().notNull(),
  email: varchar().notNull()

});

export type Startup =  typeof startupTable.$inferSelect
export type NewStartup =  typeof startupTable.$inferInsert


export const paymentTable = pgTable("payment", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: varchar().notNull(),
  startup_id: integer().notNull(),
  creditCard_num: integer(),
  holder_name: varchar(),
  cvv:integer(),
  upi_id:varchar(),
  quantity:integer().default(1),
  amount:integer().notNull()

});


export type Payment =  typeof paymentTable.$inferSelect
export type NewPayment =  typeof paymentTable.$inferInsert