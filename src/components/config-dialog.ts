import { html } from 'lit';
import {customElement} from 'lit/decorators.js';
import {MdTabs} from '@material/web/tabs/tabs.js';
import {MdPrimaryTab} from '@material/web/tabs/primary-tab.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { action, runInAction } from 'mobx';
import { ConfigService } from '../service/config.service';
import { MdDialog } from '@material/web/dialog/dialog';
import { ConfigGame } from './config-game';


@customElement('cb-config-dialog')
export class ConfigDialog extends MobxLitElement {
  config!: ConfigService;

  tabpanel(){
    console.log("hi");
    new ConfigGame();
    switch(this.config.showTab){
      case 0: return html`<cb-config-game .config=${this.config} >ConfigGame</cb-config-game>`;
      case 1: return html`<div  config={config} rendering={renderingService} >ConfigDisplay</div>`;
      case 2: return html`<div  config={config} connect={connectService}>ConfigHuman</div>`;
      case 3: return html`<div  config={config} >ConfigBot</div>`;
      case 4: return html`<div  config={config} >ConfigClock</div>`;
      case 5: return html`<div  config={config} >ConfigBluetooth</div>`;
      default: return "";
    }
  }

  render() {
    console.log("config "+this.config.showConfig)
    if(!this.config.showConfig){
      return '';
    }

    new MdDialog();
    new MdTabs();
    new MdPrimaryTab();
    
    const choose = (index:number) => (event: MouseEvent) => {
      event.preventDefault();
      runInAction(() => this.config.switchTab(index));
    };

    const tab = (num:number, icon: string, title: string) => {
      return num === this.config.showTab
        ? html`<md-primary-tab @click=${choose(num)} active>
        <span class="material-symbols-outlined">${icon}</span>${title}</md-primary-tab>`
        : html`<md-primary-tab @click=${choose(num)} >
        <span class="material-symbols-outlined">${icon}</span>${title}</md-primary-tab>`;
    }


    return html`
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      <style>
        @font-face {
          font-family: "Material Design Icons";
          src: url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined") format("woff");
        }
        span {
          font-size: 1.875rem;
          line-height: 2.25rem;
        }
        md-dialog {
          width: 1000px;
          height: 500px;
        }
        md-tabs {
          width: 100%;
          font-size: 1.25rem;
          line-height: 1.75rem;
          text-align: center;
        }
        md-primary-tab div {
          font-size: 1.25rem;
          line-height: 1.75rem;
        }
      </style>
    <md-dialog
      aria-labelledby="simple-dialog-title"
      open
      @close=${action(this.config.closeConfigAction)}
      maxWidth="xl">
      <form slot="content" id="form-id" method="dialog">
      <md-tabs>
        ${tab(0,"chess", "Game")}
        ${tab(1,"monitor", "Display")}
        ${tab(2,"people", "Humans")}
        ${tab(3,"robot", "Bots")}
        ${tab(4,"av_timer", "Clocks")}
        ${tab(5,"bluetooth", "Bluetooth")}
      </md-tabs>
      ${this.tabpanel()}
      </form>
    </md-dialog>
    `;
  }
}


