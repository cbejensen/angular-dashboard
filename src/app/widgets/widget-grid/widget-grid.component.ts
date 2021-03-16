import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnDestroy,
  ChangeDetectorRef,
  HostBinding,
  Output,
  EventEmitter,
} from '@angular/core';
import { Widget, WidgetGridArea } from 'src/app/widgets/widget-models';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';
import { Subject } from 'rxjs';

@Component({
  selector: 'fx-widget-grid',
  templateUrl: './widget-grid.component.html',
  styleUrls: ['./widget-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WidgetGridComponent implements OnDestroy {
  config: GridsterConfig = {
    pushItems: true,
    compactType: 'compactUp',
    gridType: 'verticalFixed',
    margin: 16,
  };

  @Input()
  public get widgets(): Widget[] {
    return this._widgets;
  }
  public set widgets(value: Widget[]) {
    this._widgets = value;
    console.log(this._widgets);
  }
  private _widgets: Widget[] = [];

  @Input()
  @HostBinding('class.editing')
  get editing(): boolean {
    return this._editing;
  }
  set editing(editing: boolean) {
    this._editing = editing;
    this._updateConfig(editing);
  }
  private _editing = false;

  @Output() addWidget = new EventEmitter<WidgetGridArea>();

  private _destroyed = new Subject();

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.config.emptyCellClickCallback = (_, gridArea) => {
      console.log(gridArea);
    };
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }

  private _updateConfig(editing: boolean) {
    this.config.resizable = { enabled: editing };
    this.config.draggable = { enabled: editing };
    this.config.displayGrid = editing ? 'always' : 'none';
    this.config.enableEmptyCellClick = editing;
    this.config.emptyCellClickCallback = editing
      ? (_, item) => this.addWidget.emit(item)
      : undefined;
    // Tell Gridster the config has changed.
    this.config.api?.optionsChanged?.();
    // Tell Angular the view should update.
    this.cd.detectChanges();
  }
}
