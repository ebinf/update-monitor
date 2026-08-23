/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Server` will be added. If there are existing duplicate values, this will fail.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Release" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "remoteId" INTEGER NOT NULL,
    "remoteVersion" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "hidden" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT,
    "releaseNotes" TEXT,
    "publishedAt" DATETIME,
    "prerelease" BOOLEAN,
    "link" TEXT,
    CONSTRAINT "Release_remoteId_fkey" FOREIGN KEY ("remoteId") REFERENCES "Remote" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Release" ("hidden", "id", "link", "name", "prerelease", "publishedAt", "releaseNotes", "remoteId", "remoteVersion", "version") SELECT "hidden", "id", "link", "name", "prerelease", "publishedAt", "releaseNotes", "remoteId", "remoteVersion", "version" FROM "Release";
DROP TABLE "Release";
ALTER TABLE "new_Release" RENAME TO "Release";
CREATE UNIQUE INDEX "Release_remoteId_remoteVersion_key" ON "Release"("remoteId", "remoteVersion");
CREATE TABLE "new_Service" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "serverId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "remoteId" INTEGER,
    "installedVersion" TEXT,
    "lastChecked" DATETIME,
    CONSTRAINT "Service_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "Server" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Service_remoteId_fkey" FOREIGN KEY ("remoteId") REFERENCES "Remote" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Service" ("id", "installedVersion", "lastChecked", "name", "remoteId", "serverId") SELECT "id", "installedVersion", "lastChecked", "name", "remoteId", "serverId" FROM "Service";
DROP TABLE "Service";
ALTER TABLE "new_Service" RENAME TO "Service";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Server_name_key" ON "Server"("name");
