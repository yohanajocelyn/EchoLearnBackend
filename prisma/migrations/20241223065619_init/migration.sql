-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "token" VARCHAR(100),
    "totalScore" INTEGER NOT NULL DEFAULT 0,
    "profilePicture" VARCHAR(100),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notes" (
    "id" SERIAL NOT NULL,
    "word" VARCHAR(100) NOT NULL,
    "meaning" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "songs" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "artist" VARCHAR(100) NOT NULL,
    "genre" VARCHAR(100) NOT NULL,
    "image" VARCHAR(100) NOT NULL,
    "lyrics" TEXT NOT NULL,

    CONSTRAINT "songs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "listening_sections" (
    "id" SERIAL NOT NULL,
    "emptyLyric" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "songId" INTEGER NOT NULL,

    CONSTRAINT "listening_sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attempts" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "listeningSectionId" INTEGER NOT NULL,
    "correctAnswer" TEXT NOT NULL,
    "attemptedAnswer" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "attemptedAt" TIMESTAMP(3) NOT NULL,
    "isComplete" BOOLEAN NOT NULL,

    CONSTRAINT "attempts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "listening_sections" ADD CONSTRAINT "listening_sections_songId_fkey" FOREIGN KEY ("songId") REFERENCES "songs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attempts" ADD CONSTRAINT "attempts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attempts" ADD CONSTRAINT "attempts_listeningSectionId_fkey" FOREIGN KEY ("listeningSectionId") REFERENCES "listening_sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;
