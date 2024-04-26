import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { WorkflowService } from '../../workflow/workflow.service';

@Injectable({
  providedIn: 'root'
})
export class MenuCountsService {

  menu: Subject<any>;

  constructor(private workflowService: WorkflowService) {
    this.menu = new Subject<any>();
  }

  async refreshCounts() {
    try {
      const res: any = await this.workflowService.getExecutionInProcessLoggedInUserIdCount();
      this.menu.next(res.data);
    } catch (err) {
    } finally {
    }
  }

  onSetTitle(): Observable<any> {
    return this.menu;
  }
}
