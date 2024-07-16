import { createAction, props } from '@ngrx/store';

// Actions for the 'Edit' button functionality
export const editButtonClicked = createAction('[Part Master] Edit Button Clicked');

// Actions for handling the UNIT_ID field interactions
export const unitIdDoubleClick = createAction('[Part Master] UNIT_ID Double Click');
export const unitIdClick = createAction('[Part Master] UNIT_ID Click');
export const validateUnitId = createAction('[Part Master] Validate UNIT_ID');

// Actions for handling the Part Description field interactions
export const partDescriptionDoubleClick = createAction('[Part Master] Part Description Double Click');
export const partDescriptionClick = createAction('[Part Master] Part Description Click');
export const validatePartDescription = createAction('[Part Master] Validate Part Description');

// Actions for handling the part number field interactions
export const partNumberDoubleClick = createAction('[Part Master] Part Number Double Click');
export const partNumberClick = createAction('[Part Master] Part Number Click');
export const validatePartNumber = createAction('[Part Master] Validate Part Number');

// Actions for handling the 'Line ID' field interactions
export const lineIdDoubleClick = createAction('[Part Master] Line ID Double Click');
export const lineIdClick = createAction('[Part Master] Line ID Click');
export const validateLineId = createAction('[Part Master] Validate Line ID');

// Actions for handling the Group ID field interactions and validations
export const groupIdDoubleClick = createAction('[Part Master] Group ID Double Click');
export const groupIdClick = createAction('[Part Master] Group ID Click');
export const validateGroupId = createAction('[Part Master] Validate Group ID');