import { createReducer, on } from '@ngrx/store';
import * as PartMasterActions from './part-master.actions';

export interface PartMasterState {
  mode: string;
  partStatus: string;
  globalParameter: number;
  unitId: string;
  unitName: string;
  groupId: string;
  groupName: string;
  lineId: string;
  lineDesc: string;
  partId: string;
  partNo: string;
  partDesc: string;
  saveButtonEnabled: boolean;
  editButtonEnabled: boolean;
}

export const initialState: PartMasterState = {
  mode: 'Create Mode',
  partStatus: '',
  globalParameter: 0,
  unitId: '',
  unitName: '',
  groupId: '',
  groupName: '',
  lineId: '',
  lineDesc: '',
  partId: '',
  partNo: '',
  partDesc: '',
  saveButtonEnabled: true,
  editButtonEnabled: true,
};

export const partMasterReducer = createReducer(
  initialState,
  on(PartMasterActions.editButtonClicked, (state) => ({
    ...state,
    mode: 'Edit Mode',
    partStatus: 'A',
    globalParameter: 1,
    editButtonEnabled: false,
  })),
  on(PartMasterActions.unitIdDoubleClick, (state) => ({
    ...state,
    // Logic to display LOV based on globalParameter
  })),
  on(PartMasterActions.unitIdClick, (state) => ({
    ...state,
    saveButtonEnabled: false,
    unitName: '',
    groupId: '',
    groupName: '',
    lineId: '',
    lineDesc: '',
    partId: '',
    partNo: '',
    partDesc: '',
  })),
  on(PartMasterActions.validateUnitId, (state, { unitId, unitName }) => {
    if (!unitId || !unitName) {
      // Display error message
      return state;
    }
    // Logic to validate unitId and unitName
    return {
      ...state,
      unitId,
      unitName,
    };
  }),
  on(PartMasterActions.partDescClick, (state) => ({
    ...state,
    saveButtonEnabled: false,
    partDesc: '',
  })),
  on(PartMasterActions.validatePartDesc, (state, { partDesc }) => {
    if (!partDesc) {
      // Display error message
      return state;
    }
    return {
      ...state,
      partDesc,
    };
  }),
  on(PartMasterActions.partNumberDoubleClick, (state) => ({
    ...state,
    // Logic to display LOV for part number selection
  })),
  on(PartMasterActions.partNumberClick, (state) => ({
    ...state,
    saveButtonEnabled: false,
    partId: '',
    partNo: '',
    partDesc: '',
  })),
  on(PartMasterActions.validatePartNumber, (state, { partNo }) => {
    if (!partNo) {
      // Display error message
      return state;
    }
    // Logic to validate part number
    return {
      ...state,
      partNo,
    };
  }),
  on(PartMasterActions.lineIdDoubleClick, (state) => ({
    ...state,
    // Logic to display LOV for line ID selection
  })),
  on(PartMasterActions.lineIdClick, (state) => ({
    ...state,
    saveButtonEnabled: false,
    lineId: '',
    lineDesc: '',
    partId: '',
    partNo: '',
    partDesc: '',
  })),
  on(PartMasterActions.validateLineId, (state, { lineId, lineDesc }) => {
    if (!lineId || !lineDesc) {
      // Display error message
      return state;
    }
    // Logic to validate lineId and lineDesc
    return {
      ...state,
      lineId,
      lineDesc,
    };
  }),
  on(PartMasterActions.groupIdDoubleClick, (state) => ({
    ...state,
    // Logic to display LOV for group ID selection
  })),
  on(PartMasterActions.groupIdClick, (state) => ({
    ...state,
    saveButtonEnabled: false,
    groupId: '',
    groupName: '',
    lineId: '',
    lineDesc: '',
    partId: '',
    partNo: '',
    partDesc: '',
  })),
  on(PartMasterActions.validateGroupId, (state, { groupId, groupName }) => {
    if (!groupId || !groupName) {
      // Display error message
      return state;
    }
    // Logic to validate groupId and groupName
    return {
      ...state,
      groupId,
      groupName,
    };
  })
);