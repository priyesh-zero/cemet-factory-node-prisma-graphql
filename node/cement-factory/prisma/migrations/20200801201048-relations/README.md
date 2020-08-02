# Migration `20200801201048-relations`

This migration has been generated at 8/1/2020, 8:10:48 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."CartItem" DROP CONSTRAINT "CartItem_pkey",
DROP COLUMN "id",
ADD COLUMN "quantity" integer  NOT NULL ,
ADD PRIMARY KEY ("userId", "productId");

ALTER TABLE "public"."Product" ADD COLUMN "createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN "updatedAt" timestamp(3)  NOT NULL ;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200731145401-init..20200801201048-relations
--- datamodel.dml
+++ datamodel.dml
@@ -2,36 +2,41 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
 }
 model User {
-    id           Int    @default(autoincrement())    @id
-    email        String @unique
+    id           Int            @default(autoincrement())    @id
+    email        String         @unique
     firstName    String
     lastName     String
     phone        String
     password     String
+    Cart         CartItem[]
 }
 model Product {
-    id           Int    @default(autoincrement())    @id
-    name         String
-    image        String
-    description  String
-    quantity     Int
-    price        Int
+    id              Int         @default(autoincrement())    @id
+    name            String
+    image           String
+    description     String
+    quantity        Int
+    price           Int
+    interestedUser  CartItem[]
+    createdAt       DateTime    @default(now())
+    updatedAt       DateTime    @updatedAt
 }
 model CartItem {
-    id           Int        @default(autoincrement())    @id
     userId       Int
     user         User       @relation(fields: [userId], references: [id])
     productId    Int
     product      Product    @relation(fields: [productId], references: [id])
+    quantity     Int
+    @@id([userId, productId])
 }
```


