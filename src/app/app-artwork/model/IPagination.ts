export interface IPagination {
	current_page: number;
	limit: number;
	next_url?: string;
	offset?: number;
	total: number;
	total_pages?: number;
}
