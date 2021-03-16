import { Widget, WidgetMeta } from "../widgets/widget-models";
import { EntityState } from "@ngrx/entity";

export interface DashboardState extends EntityState<WidgetMeta> {
  selectedWidgets: Widget[];
  editing: boolean;
}