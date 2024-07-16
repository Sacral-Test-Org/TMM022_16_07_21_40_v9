import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';

import { PartMasterComponent } from './part-master.component';
import { partMasterReducer } from './state/part-master.reducer';
import { PartMasterEffects } from './state/part-master.effects';

const routes: Routes = [
  { path: '', component: PartMasterComponent }
];

@NgModule({
  declarations: [
    PartMasterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('partMaster', partMasterReducer),
    EffectsModule.forFeature([PartMasterEffects]),
    LoggerModule.forRoot({
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.ERROR
    })
  ]
})
export class PartMasterModule { }
