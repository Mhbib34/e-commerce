/*
  Warnings:

  - Added the required column `brand` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `products` ADD COLUMN `brand` VARCHAR(100) NOT NULL;
