/*
  Warnings:

  - You are about to drop the `WeatherData` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "favorites" TEXT[];

-- DropTable
DROP TABLE "WeatherData";
