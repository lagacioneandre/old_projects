// models
import { SortModel } from './sort.model';
import { BaseResourceModel } from './base-resource.model';

export class PageableModel extends BaseResourceModel {
	public offset?: number;
	public pageNumber?: number;
	public pageSize?: number;
	public paged?: boolean;
	public sort?: SortModel;
	public unpaged?: boolean;

	constructor() {
		super();
	}
}
