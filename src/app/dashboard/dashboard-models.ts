import { Widget } from "../widgets/widget-models";
import { EntityState } from "@ngrx/entity";

export interface DashboardState extends EntityState<Widget> {
  userWidgets: Widget[];
  editing: boolean;
}