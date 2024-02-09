-- CreateTable
CREATE TABLE "Metainfo" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" JSONB[],

    CONSTRAINT "Metainfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Metainfo_title_key" ON "Metainfo"("title");
