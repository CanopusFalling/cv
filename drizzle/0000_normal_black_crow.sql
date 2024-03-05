CREATE TABLE `version` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text,
	`country_id` integer,
	FOREIGN KEY (`country_id`) REFERENCES `document`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `document` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `nameIdx` ON `document` (`name`);