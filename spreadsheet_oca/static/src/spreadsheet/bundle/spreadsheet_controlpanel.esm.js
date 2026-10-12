import { Component, proxy, usePlugin } from "@odoo/owl";
import {ControlPanel} from "@web/search/control_panel/control_panel";
import { ActionManagerPlugin } from "@web/webclient/actions/action_plugin";

const {proxy} = owl;

export class SpreadsheetName extends Component {
  setup() {
    this.state = proxy({
      name: this.props.name,
    });
  }
  _onNameChanged(ev) {
    if (this.props.isReadonly) {
      return;
    }
    if (ev.target.value) {
      this.env.saveRecord({name: ev.target.value});
    }
    this.state.name = ev.target.value;
    if (this.props.onChanged) {
      this.props.onChanged(ev);
    }
  }
}
SpreadsheetName.template = "spreadsheet_oca.SpreadsheetName";
SpreadsheetName.props = {
  name: String,
  isReadonly: Boolean,
  onChanged: {type: Function, optional: true},
};

export class SpreadsheetControlPanel extends ControlPanel {
  setup() {
    super.setup();
    this.actionService = usePlugin(ActionManagerPlugin);
  }

  onBreadcrumbClicked(jsId) {
    this.actionService.restore(jsId);
  }
}
SpreadsheetControlPanel.template = "spreadsheet_oca.SpreadsheetControlPanel";
SpreadsheetControlPanel.props = {
  ...ControlPanel.props,
  record: Object,
};
SpreadsheetControlPanel.components = {
  ...ControlPanel.components,
  SpreadsheetName,
};
