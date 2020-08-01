# Migration `20200731145401-init`

This migration has been generated at 7/31/2020, 2:54:01 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."User" (
"id" SERIAL,
"email" text  NOT NULL ,
"firstName" text  NOT NULL ,
"lastName" text  NOT NULL ,
"phone" text  NOT NULL ,
"password" text  NOT NULL ,
PRIMARY KEY ("id"))

CREATE TABLE "public"."Product" (
"id" SERIAL,
"name" text  NOT NULL ,
"image" text  NOT NULL ,
"description" text  NOT NULL ,
"quantity" integer  NOT NULL ,
"price" integer  NOT NULL ,
PRIMARY KEY ("id"))

CREATE TABLE "public"."CartItem" (
"id" SERIAL,
"userId" integer  NOT NULL ,
"productId" integer  NOT NULL ,
PRIMARY KEY ("id"))

CREATE UNIQUE INDEX "User.email" ON "public"."User"("email")

ALTER TABLE "public"."CartItem" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."CartItem" ADD FOREIGN KEY ("productId")REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200731145401-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,37 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "postgresql"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model User {
+    id           Int    @default(autoincrement())    @id
+    email        String @unique
+    firstName    String
+    lastName     String
+    phone        String
+    password     String
+}
+
+model Product {
+    id           Int    @default(autoincrement())    @id
+    name         String
+    image        String
+    description  String
+    quantity     Int
+    price        Int
+}
+
+model CartItem {
+    id           Int        @default(autoincrement())    @id
+    userId       Int
+    user         User       @relation(fields: [userId], references: [id])
+    productId    Int
+    product      Product    @relation(fields: [productId], references: [id])
+}
```


