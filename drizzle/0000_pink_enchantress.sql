CREATE TABLE `document` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text
);
--> statement-breakpoint
CREATE TABLE `version` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text,
	`timestamp` text DEFAULT CURRENT_TIMESTAMP,
	`markdown` blob,
	`documentID` integer,
	FOREIGN KEY (`documentID`) REFERENCES `document`(`id`) ON UPDATE no action ON DELETE no action
);
