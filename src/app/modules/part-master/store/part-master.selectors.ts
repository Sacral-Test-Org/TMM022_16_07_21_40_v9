// src/app/modules/part-master/store/part-master.selectors.ts

import { createSelector, createFeatureSelector } from '@ngrx/store';
import { PartMasterState } from './part-master.reducer';

// Feature Selector
const selectPartMasterState = createFeatureSelector<PartMasterState>('partMaster');

// Selectors for Edit Button State
export const selectEditButtonState = createSelector(
  selectPartMasterState,
  (state: PartMasterState) => state.editButtonState
);

// Selectors for UNIT_ID Field Interactions
export const selectUnitIdFieldState = createSelector(
  selectPartMasterState,
  (state: PartMasterState) => state.unitIdFieldState
);

// Selectors for Part Description Field Interactions
export const selectPartDescriptionFieldState = createSelector(
  selectPartMasterState,
  (state: PartMasterState) => state.partDescriptionFieldState
);

// Selectors for Part Number Field Interactions
export const selectPartNumberLov = createSelector(
  selectPartMasterState,
  (state: PartMasterState) => state.partNumberLov
);

export const selectPartNumberValidation = createSelector(
  selectPartMasterState,
  (state: PartMasterState) => state.partNumberValidation
);

// Selectors for Line ID Field Interactions
export const selectLineIdFieldState = createSelector(
  selectPartMasterState,
  (state: PartMasterState) => state.lineIdFieldState
);

// Selectors for Group ID Field Interactions and Validations
export const selectGroupIdFieldState = createSelector(
  selectPartMasterState,
  (state: PartMasterState) => state.groupIdFieldState
);

export const selectGroupIdValidation = createSelector(
  selectPartMasterState,
  (state: PartMasterState) => state.groupIdValidation
);
