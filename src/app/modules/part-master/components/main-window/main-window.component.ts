import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormInitializationService } from '../../services/form-initialization.service';
import { ValidationService } from '../../services/validation.service';
import { SavePartService } from '../../services/save-part.service';
import { LoggerService } from '../../services/logger.service';
import { AppState } from '../../store/part-master.reducer';
import { saveAction, clearAction, editAction } from '../../store/part-master.actions';

@Component({
  selector: 'app-main-window',
  templateUrl: './main-window.component.html',
  styleUrls: ['./main-window.component.css']
})
export class MainWindowComponent implements OnInit {
  title = 'HPMS';
  width = 609;
  height = 300;

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private formInitializationService: FormInitializationService,
    private validationService: ValidationService,
    private savePartService: SavePartService,
    private logger: LoggerService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.title = 'T K A P - [IS]';
    this.formInitializationService.setWindowSize(this.width, this.height);
    this.formInitializationService.setScreenName('TMM022');
    this.formInitializationService.setSysDate();
    this.formInitializationService.initializeGlobalParameter(0);
    this.formInitializationService.setMode();
    this.formInitializationService.setCursorStyle('default');
    this.formInitializationService.disableSaveButton();
    this.formInitializationService.enableFields(['GROUP_ID', 'PARTNO', 'PART_STATUS', 'PART_DESC', 'LINE_ID']);
    this.formInitializationService.enableFieldIfDisabled('UNIT_ID');
    this.formInitializationService.moveToField('UNIT_ID');
  }

  onSave(): void {
    this.logger.log('Save button clicked');
    if (this.validateFields()) {
      if (this.promptSaveConfirmation()) {
        this.savePartDetails();
      }
    }
  }

  onClear(): void {
    this.logger.log('Clear button clicked');
    this.formInitializationService.resetForm();
    this.formInitializationService.executeWhenNewFormInstanceTrigger();
  }

  onEdit(): void {
    this.logger.log('Edit button clicked');
    this.formInitializationService.resetForm();
    this.formInitializationService.setEditMode();
    this.formInitializationService.setPartStatus('A');
    this.formInitializationService.setGlobalParameter(1);
    this.formInitializationService.disableEditButton();
  }

  onExit(): void {
    this.logger.log('Exit button clicked');
    if (confirm('Do you want to exit?')) {
      this.router.navigate(['/home']);
    }
  }

  validateFields(): boolean {
    if (!this.validationService.validateFields()) {
      return false;
    }
    return true;
  }

  promptSaveConfirmation(): boolean {
    return confirm('Do you want to save the details?');
  }

  savePartDetails(): void {
    this.savePartService.savePartDetails().subscribe(
      response => {
        this.logger.log('Part details saved successfully');
      },
      error => {
        this.logger.log('Error saving part details');
      }
    );
  }

  onUnitIdDoubleClick(event: Event): void {
    const globalParameter = this.formInitializationService.getGlobalParameter();
    if (globalParameter === 0) {
      this.formInitializationService.showLov('UNIT_LOV');
    } else {
      this.formInitializationService.showLov('EDIT_UNIT_LOV');
    }
    this.formInitializationService.moveToField('GROUP_ID');
  }

  onUnitIdClick(event: Event): void {
    this.formInitializationService.disableSaveButton();
    this.formInitializationService.clearFields(['UNIT_NAME', 'GROUP_ID', 'GROUP_NAME', 'LINE_ID', 'LINE_DESC', 'PART_ID', 'PARTNO', 'PART_DESC']);
    this.formInitializationService.moveToField('UNIT_ID');
  }

  onNextItem(): void {
    if (!this.validationService.validateUnitIdAndName()) {
      return;
    }
    this.formInitializationService.moveToField('GROUP_ID');
  }

  validateUnitId(): void {
    const globalParameter = this.formInitializationService.getGlobalParameter();
    if (!this.validationService.checkUnitIdAndName(globalParameter)) {
      return;
    }
  }

  handlePartDescriptionClick(event: Event): void {
    this.formInitializationService.disableSaveButton();
    this.formInitializationService.clearField('PART_DESC');
    this.formInitializationService.moveToField('PART_DESC');
  }

  handlePartDescriptionDoubleClick(event: Event): void {
    this.handlePartDescriptionClick(event);
  }

  navigateToNextItem(): void {
    if (!this.validationService.validateFields()) {
      return;
    }
    this.formInitializationService.setPartStatus('A');
    this.formInitializationService.moveToField('PART_STATUS');
  }

  onPartNumberDoubleClick(): void {
    const globalParameter = this.formInitializationService.getGlobalParameter();
    if (globalParameter === 0) {
      this.formInitializationService.showLov('PARTNO_LOV');
    } else {
      this.formInitializationService.showLov('EDIT_PARTNO_LOV');
    }
    this.formInitializationService.moveToField('PART_DESC');
  }

  onPartNumberClick(): void {
    this.formInitializationService.disableSaveButton();
    this.formInitializationService.clearFields(['PART_ID', 'PARTNO', 'PART_DESC']);
    this.formInitializationService.moveToField('PARTNO');
  }

  validatePartNumber(): void {
    const globalParameter = this.formInitializationService.getGlobalParameter();
    if (!this.validationService.validatePartNumber(globalParameter)) {
      return;
    }
  }

  handleLineIdDoubleClick(event: Event): void {
    const globalParameter = this.formInitializationService.getGlobalParameter();
    if (globalParameter === 0) {
      this.formInitializationService.showLov('LINE_LOV');
    } else {
      this.formInitializationService.showLov('EDIT_LINE_LOV');
    }
    this.formInitializationService.moveToField('PARTNO');
  }

  handleLineIdClick(event: Event): void {
    this.formInitializationService.disableSaveButton();
    this.formInitializationService.clearFields(['LINE_ID', 'LINE_DESC', 'PART_ID', 'PARTNO', 'PART_DESC']);
    this.formInitializationService.moveToField('LINE_ID');
  }

  handleNextItem(event: Event): void {
    if (!this.validationService.validateUnitIdAndName() || !this.validationService.validateGroupIdAndName() || !this.validationService.validateLineIdAndDesc()) {
      return;
    }
    this.formInitializationService.moveToField('PARTNO');
  }

  validateLineId(): void {
    const globalParameter = this.formInitializationService.getGlobalParameter();
    if (!this.validationService.validateLineId(globalParameter)) {
      return;
    }
  }

  handleGroupIdDoubleClick(event: Event): void {
    const globalParameter = this.formInitializationService.getGlobalParameter();
    if (globalParameter === 0) {
      this.formInitializationService.showLov('GROUP_LOV');
    } else {
      this.formInitializationService.showLov('EDIT_GROUP_LOV');
    }
    this.formInitializationService.moveToField('LINE_ID');
  }

  handleGroupIdClick(event: Event): void {
    this.formInitializationService.disableSaveButton();
    this.formInitializationService.clearFields(['GROUP_ID', 'GROUP_NAME', 'LINE_ID', 'LINE_DESC', 'PART_ID', 'PARTNO', 'PART_DESC']);
    this.formInitializationService.moveToField('GROUP_ID');
  }

  validateGroupId(): void {
    const globalParameter = this.formInitializationService.getGlobalParameter();
    if (!this.validationService.validateGroupId(globalParameter)) {
      return;
    }
  }
}
