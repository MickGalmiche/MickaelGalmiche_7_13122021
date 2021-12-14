-- CreateTable
CREATE TABLE `comment` (
    `id_comment` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATE NOT NULL,
    `content` TEXT NOT NULL,
    `fk_user` INTEGER NOT NULL,
    `fk_post` INTEGER NOT NULL,

    INDEX `comment_FK`(`fk_user`),
    INDEX `comment_FK_1`(`fk_post`),
    PRIMARY KEY (`id_comment`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `post` (
    `id_post` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATE NOT NULL,
    `content` TEXT NOT NULL,
    `title` VARCHAR(100) NOT NULL,
    `fk_user` INTEGER NOT NULL,

    INDEX `post_FK`(`fk_user`),
    PRIMARY KEY (`id_post`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id_user` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(100) NOT NULL,
    `user_password` VARCHAR(100) NOT NULL,
    `firstname` VARCHAR(100) NOT NULL,
    `lastname` VARCHAR(100) NOT NULL,
    `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `comment_FK_1` FOREIGN KEY (`fk_post`) REFERENCES `post`(`id_post`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `comment_FK` FOREIGN KEY (`fk_user`) REFERENCES `user`(`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `post` ADD CONSTRAINT `post_FK` FOREIGN KEY (`fk_user`) REFERENCES `user`(`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;
