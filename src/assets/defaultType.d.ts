declare module "common-types" {
	type DefaultData = {
		id: number;
		title: string;
		image: string;
		status: number;
		link: string;
	};

	type EditType = "Edit" | "Add";
}
