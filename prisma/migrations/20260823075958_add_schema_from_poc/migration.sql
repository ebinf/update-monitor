-- CreateTable
CREATE TABLE "Remote" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "config" TEXT NOT NULL,
    "latestId" INTEGER,
    "lastFetched" DATETIME,
    "isFetching" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Remote_latestId_fkey" FOREIGN KEY ("latestId") REFERENCES "Release" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Release" (
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
    CONSTRAINT "Release_remoteId_fkey" FOREIGN KEY ("remoteId") REFERENCES "Remote" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Service" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "serverId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "remoteId" INTEGER,
    "installedVersion" TEXT,
    "lastChecked" DATETIME,
    CONSTRAINT "Service_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "Server" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Service_remoteId_fkey" FOREIGN KEY ("remoteId") REFERENCES "Remote" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Server" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Remote_latestId_key" ON "Remote"("latestId");

-- CreateIndex
CREATE UNIQUE INDEX "Remote_type_config_key" ON "Remote"("type", "config");

-- CreateIndex
CREATE UNIQUE INDEX "Release_remoteId_remoteVersion_key" ON "Release"("remoteId", "remoteVersion");
