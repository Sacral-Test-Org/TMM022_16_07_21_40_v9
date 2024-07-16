import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class FormInitializationService {
  private globalParameter: number = 0;

  constructor(private http: HttpClient) {}

  maximizeMainWindow(): void {
    // Logic to maximize the main window
    window.moveTo(0, 0);
    window.resizeTo(screen.width, screen.height);
  }

  setPartMasterWindowToNormalSize(): void {
    // Logic to set the 'PART_MASTER' window to normal size
    // Assuming PART_MASTER is a modal or a separate window
    const partMasterWindow = document.getElementById('PART_MASTER');
    if (partMasterWindow) {
      partMasterWindow.style.width = 'auto';
      partMasterWindow.style.height = 'auto';
    }
  }

  setMainWindowTitle(): void {
    document.title = 'T K A P - [IS]';
  }

  populateScreenName(screenName: string): void {
    const screenNameField = document.getElementById('SCREENNAME');
    if (screenNameField) {
      screenNameField.textContent = screenName;
    }
  }

  setSysDate(): void {
    const currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    const sysDateField = document.getElementById('SYSDATE');
    if (sysDateField) {
      sysDateField.textContent = currentDate;
    }
  }

  initializeGlobalParameter(): void {
    this.globalParameter = 0;
  }

  setModeField(): void {
    const modeField = document.getElementById('MODE');
    if (modeField) {
      modeField.textContent = this.globalParameter === 0 ? 'Create Mode' : 'Edit Mode';
    }
  }

  setCursorStyleToDefault(): void {
    document.body.style.cursor = 'default';
  }

  disableSaveButton(): void {
    const saveButton = document.getElementById('SAVE');
    if (saveButton) {
      saveButton.setAttribute('disabled', 'true');
    }
  }

  enableHdrFields(): void {
    const fields = ['GROUP_ID', 'PARTNO', 'PART_STATUS', 'PART_DESC', 'LINE_ID'];
    fields.forEach(fieldId => {
      const field = document.getElementById(fieldId);
      if (field) {
        field.removeAttribute('disabled');
      }
    });
  }

  enableUnitIdField(): void {
    const unitIdField = document.getElementById('UNIT_ID');
    if (unitIdField && unitIdField.hasAttribute('disabled')) {
      unitIdField.removeAttribute('disabled');
    }
  }

  moveToUnitIdField(): void {
    const unitIdField = document.getElementById('UNIT_ID');
    if (unitIdField) {
      unitIdField.focus();
    }
  }

  resetForm(): void {
    const formFields = document.querySelectorAll('.form-field');
    formFields.forEach(field => {
      (field as HTMLInputElement).value = '';
    });
  }

  executeWhenNewFormInstanceTrigger(): void {
    // Logic to execute the 'WHEN-NEW-FORM-INSTANCE' trigger
    this.maximizeMainWindow();
    this.setPartMasterWindowToNormalSize();
    this.setMainWindowTitle();
    this.populateScreenName('Current Form Name'); // Replace with actual form name
    this.setSysDate();
    this.initializeGlobalParameter();
    this.setModeField();
    this.setCursorStyleToDefault();
    this.disableSaveButton();
    this.enableHdrFields();
    this.enableUnitIdField();
    this.moveToUnitIdField();
  }

  resetFormToEditMode(): void {
    this.resetForm();
    this.globalParameter = 1;
    this.setModeField();
    const partStatusField = document.getElementById('PART_STATUS');
    if (partStatusField) {
      partStatusField.textContent = 'A';
    }
  }

  initializeUnitIdField(): void {
    // Logic for initializing the UNIT_ID field
    const unitIdField = document.getElementById('UNIT_ID');
    if (unitIdField) {
      unitIdField.addEventListener('dblclick', () => {
        if (this.globalParameter === 0) {
          // Display LOV for selecting a unit
          this.displayLovForSelectingUnit();
        } else if (this.globalParameter === 1) {
          // Display LOV for editing a unit
          this.displayLovForEditingUnit();
        }
      });

      unitIdField.addEventListener('click', () => {
        const saveButton = document.getElementById('SAVE');
        if (saveButton && !saveButton.hasAttribute('disabled')) {
          saveButton.setAttribute('disabled', 'true');
        }
        this.clearRelatedFields();
        unitIdField.focus();
      });
    }
  }

  resetUnitIdField(): void {
    // Logic for resetting the UNIT_ID field
    const unitIdField = document.getElementById('UNIT_ID');
    if (unitIdField) {
      unitIdField.value = '';
    }
  }

  private displayLovForSelectingUnit(): void {
    // Logic to display LOV for selecting a unit
    // After selection, move to GROUP_ID field
    const groupIdField = document.getElementById('GROUP_ID');
    if (groupIdField) {
      groupIdField.focus();
    }
  }

  private displayLovForEditingUnit(): void {
    // Logic to display LOV for editing a unit
    // After selection, move to GROUP_ID field
    const groupIdField = document.getElementById('GROUP_ID');
    if (groupIdField) {
      groupIdField.focus();
    }
  }

  private clearRelatedFields(): void {
    const fieldsToClear = ['UNIT_NAME', 'GROUP_ID', 'GROUP_NAME', 'LINE_ID', 'LINE_DESC', 'PART_ID', 'PARTNO', 'PART_DESC'];
    fieldsToClear.forEach(fieldId => {
      const field = document.getElementById(fieldId);
      if (field) {
        (field as HTMLInputElement).value = '';
      }
    });
  }
}
