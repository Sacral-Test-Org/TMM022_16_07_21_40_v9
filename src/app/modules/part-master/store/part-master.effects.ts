import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { PartMasterService } from '../services/part-master.service';
import * as PartMasterActions from './part-master.actions';

@Injectable()
export class PartMasterEffects {
  constructor(
    private actions$: Actions,
    private partMasterService: PartMasterService
  ) {}

  // Effect for handling 'Edit' button click
  editButtonClickedEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PartMasterActions.editButtonClicked),
      switchMap(() =>
        this.partMasterService.clearFormData().pipe(
          map(() => PartMasterActions.editButtonClickedSuccess()),
          catchError((error) =>
            of(PartMasterActions.editButtonClickedFailure({ error }))
          )
        )
      )
    )
  );

  // Effect for handling UNIT_ID field interactions
  loadUnitIdLov$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PartMasterActions.unitIdDoubleClick),
      mergeMap(() =>
        this.partMasterService.getUnitIdLov().pipe(
          map((unitIds) =>
            PartMasterActions.unitIdDoubleClickSuccess({ unitIds })
          ),
          catchError((error) =>
            of(PartMasterActions.unitIdDoubleClickFailure({ error }))
          )
        )
      )
    )
  );

  validateUnitId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PartMasterActions.validateUnitId),
      mergeMap((action) =>
        this.partMasterService.validateUnitId(action.unitId).pipe(
          map((isValid) =>
            PartMasterActions.validateUnitIdSuccess({ isValid })
          ),
          catchError((error) =>
            of(PartMasterActions.validateUnitIdFailure({ error }))
          )
        )
      )
    )
  );

  // Effect for handling Part Description field interactions
  partDescriptionClickEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PartMasterActions.partDescriptionClick),
      map(() => PartMasterActions.clearPartDescriptionFields())
    )
  );

  // Effect for handling Part Number field interactions
  loadPartNumberLov$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PartMasterActions.partNumberDoubleClick),
      mergeMap(() =>
        this.partMasterService.getPartNumberLov().pipe(
          map((partNumbers) =>
            PartMasterActions.partNumberDoubleClickSuccess({ partNumbers })
          ),
          catchError((error) =>
            of(PartMasterActions.partNumberDoubleClickFailure({ error }))
          )
        )
      )
    )
  );

  validatePartNumber$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PartMasterActions.validatePartNumber),
      mergeMap((action) =>
        this.partMasterService.validatePartNumber(action.partNumber).pipe(
          map((isValid) =>
            PartMasterActions.validatePartNumberSuccess({ isValid })
          ),
          catchError((error) =>
            of(PartMasterActions.validatePartNumberFailure({ error }))
          )
        )
      )
    )
  );

  // Effect for handling Line ID field interactions
  loadLineIdLov$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PartMasterActions.lineIdDoubleClick),
      mergeMap(() =>
        this.partMasterService.getLineIdLov().pipe(
          map((lineIds) =>
            PartMasterActions.lineIdDoubleClickSuccess({ lineIds })
          ),
          catchError((error) =>
            of(PartMasterActions.lineIdDoubleClickFailure({ error }))
          )
        )
      )
    )
  );

  validateLineId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PartMasterActions.validateLineId),
      mergeMap((action) =>
        this.partMasterService.validateLineId(action.lineId).pipe(
          map((isValid) =>
            PartMasterActions.validateLineIdSuccess({ isValid })
          ),
          catchError((error) =>
            of(PartMasterActions.validateLineIdFailure({ error }))
          )
        )
      )
    )
  );

  // Effect for handling Group ID field interactions and validations
  loadGroupIdLov$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PartMasterActions.groupIdDoubleClick),
      mergeMap(() =>
        this.partMasterService.getGroupIdLov().pipe(
          map((groupIds) =>
            PartMasterActions.groupIdDoubleClickSuccess({ groupIds })
          ),
          catchError((error) =>
            of(PartMasterActions.groupIdDoubleClickFailure({ error }))
          )
        )
      )
    )
  );

  validateGroupId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PartMasterActions.validateGroupId),
      mergeMap((action) =>
        this.partMasterService.validateGroupId(action.groupId).pipe(
          map((isValid) =>
            PartMasterActions.validateGroupIdSuccess({ isValid })
          ),
          catchError((error) =>
            of(PartMasterActions.validateGroupIdFailure({ error }))
          )
        )
      )
    )
  );
}
