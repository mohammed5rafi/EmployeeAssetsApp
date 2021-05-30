import { Injectable } from '@angular/core';

@Injectable()
export class EmployeeAssetsGlobalvariables {
  MasterCategory: any = null;
  public sortCategoryCodes(CategoryCodes) {
    return CategoryCodes.sort(
      (a, b) => a.customsCategoryCode - b.customsCategoryCode
    );
  }

  public filterCategoryCodes(CategoryCodes, filterValue) {
    return CategoryCodes.filter((option) =>
      option.code.startsWith(filterValue)
    );
  }
}
