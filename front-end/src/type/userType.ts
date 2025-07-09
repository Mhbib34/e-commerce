export type User = {
	id?: string;
	email?: string;
	username?: string;
	name?: string;
	isAccountVerified?: boolean;
	role?: string;
	currentPassword?: string;
	newPassword?: string;
	confirmPassword?: string;
};
