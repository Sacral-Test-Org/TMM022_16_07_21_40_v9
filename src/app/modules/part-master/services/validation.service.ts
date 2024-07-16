import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor(private http: HttpClient) {}

  validateFields(formData: any, globalParam: number): any {
    const validationResults = {
      isValid: true,
      messages: []
    };

    if (!formData.PART_STATUS) {
      validationResults.isValid = false;
      validationResults.messages.push('PART_STATUS field is required.');
    }

    if (!formData.UNIT_ID || !formData.UNIT_NAME) {
      validationResults.isValid = false;
      validationResults.messages.push('UNIT_ID and UNIT_NAME fields are required.');
    }

    if (!formData.GROUP_ID || !formData.GROUP_NAME) {
      validationResults.isValid = false;
      validationResults.messages.push('GROUP_ID and GROUP_NAME fields are required.');
    }

    if (!formData.LINE_ID || !formData.LINE_DESC) {
      validationResults.isValid = false;
      validationResults.messages.push('LINE_ID and LINE_DESC fields are required.');
    }

    if (globalParam === 0 && !formData.PARTNO) {
      validationResults.isValid = false;
      validationResults.messages.push('PARTNO field is required when GLOBAL.PARA is 0.');
    }

    if (globalParam === 1 && !formData.PART_ID) {
      validationResults.isValid = false;
      validationResults.messages.push('PART_ID field is required when GLOBAL.PARA is 1.');
    }

    return validationResults;
  }

  validatePartNumber(partNumber: string, globalParam: number): Observable<any> {
    const url = globalParam === 0 ? '/api/partMaster/validatePartNumber' : '/api/partMaster/validateEditPartNumber';
    return this.http.post(url, { partNumber }).pipe(
      map(response => response)
    );
  }

  showLineLov(): Observable<any> {
    return this.http.get('/api/lineMaster/lineLov').pipe(
      map(response => response)
    );
  }

  showEditLineLov(): Observable<any> {
    return this.http.get('/api/lineMaster/editLineLov').pipe(
      map(response => response)
    );
  }

  validateUnitId(unitId: string, unitName: string): Observable<any> {
    return this.http.post('/api/unitMaster/validateUnitId', { unitId, unitName }).pipe(
      map(response => response)
    );
  }

  validateGroupId(groupId: string, groupName: string): Observable<any> {
    return this.http.post('/api/groupMaster/validateGroupId', { groupId, groupName }).pipe(
      map(response => response)
    );
  }

  validateLineId(lineId: string, lineDesc: string, globalParam: number): Observable<any> {
    const url = globalParam === 0 ? '/api/lineMaster/validateLineId' : '/api/lineMaster/validateEditLineId';
    return this.http.post(url, { lineId, lineDesc }).pipe(
      map(response => response)
    );
  }

  queryLineMaster(lineId: string, lineDesc: string): Observable<any> {
    return this.http.post('/api/lineMaster/queryLineMaster', { lineId, lineDesc }).pipe(
      map(response => response)
    );
  }

  queryPartMaster(lineId: string, lineDesc: string): Observable<any> {
    return this.http.post('/api/partMaster/queryPartMaster', { lineId, lineDesc }).pipe(
      map(response => response)
    );
  }
}
