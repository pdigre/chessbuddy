import { MobxLitElement } from '@adobe/lit-mobx';
import { LitElement, html } from 'lit';
import {customElement} from 'lit/decorators.js';
import {MdOutlinedButton} from '@material/web/button/outlined-button';
import {MdOutlinedSelect} from '@material/web/select/outlined-select';
import {MdSelectOption} from '@material/web/select/select-option';
import { configService, renderingService } from '../service/index.service';

import { DashboardService } from '../service/dashboard.service';
import { EditService } from '../service/edit.service';
import {
  playService,
  historyService,
} from '../service/index.service';
import { ConfigProp, ConfigService } from '../service/config.service';
import { action } from 'mobx/dist/api/action';


@customElement('cb-config-select')
export class ConfigSelect extends MobxLitElement {
  label!: string;
  id!: string;
  choices!: string[];
  props?: Map<string, ConfigProp<string>>;

  render() {
    new MdOutlinedSelect();
    new MdSelectOption();
    console.log("choices="+this.choices);
    const choices = this.choices.map(name => html`
      <md-select-option value="${name}">
      <div slot="headline">${name}</div>
      </md-select-option>
    `).join('');
    const prop = configService.getItem.properties.get(this.id);

    return html`
      <style>
       md-outlined-select {
          min-width: 200px;
        }
      </style>
      <form variant="filled">
        <label variant="standard" htmlFor="select">
          ${this.label}
        </label>
        <md-outlined-select
          value="${prop?.get()}"
          change="{action(event => this.prop?.set(event.target.value))}">
          <md-select-option aria-label="None" value="" />
          ${choices}
        </md-outlined-select>
      </form>
      `;
  }
}

@customElement('cb-config-button')
export class ConfigButton extends MobxLitElement {
  onClick!: (event: MouseEvent) => void;
  label!: string;
  icon?: string;
  disabled?: boolean;

  render() {
    new MdOutlinedButton();
    return html`
      <style>
        md-outlined-button {
          flex-grow: 1;
          height: 3.5rem;
          font-size: 1.125rem;
          line-height: 1.75rem;
          margin: 0.5rem;
          backgroundColor: ${renderingService.darkTheme ? 'green' : 'darkgreen'};
        }
        .icon {
          font-size: 1.875rem;
          line-height: 2.25rem;
        }
        .text {
          font-size: 1.125rem;
          line-height: 1.75rem;
          margin-left: 0.5rem;
        }

      </style>
    <md-outlined-button
      @click=${this.onClick}
      disabled=${this.disabled ?? false}>
      <span class="icon">${this.icon}</span>
      <span class="text">${this.label}</span>
    </md-outlined-button>
      `;
  }
}

@customElement('cb-config-game')
export class ConfigGame extends MobxLitElement {
  config!: ConfigService;

  render() {
    const players = [...this.config.humans, ...this.config.bots];
    console.log(players);
    const playerNames = Array.from(players.map(x => x.getName()));
    console.log(playerNames);
      new ConfigSelect();
      new ConfigButton();
    
    return html`
      <style>
        .main {
          display: flex;
          flex-direction: column;
          width: 800px;
          height: 400px;
          text-align: center;
          div {
            text-align: left;
          }
        }
       .buttons {
          margin-left: 0.5rem;
          margin-right: 0.5rem;
        }
      </style>
    <div class="main" Name="text-center [&>div]:text-left">
      <div>
        <cb-config-select 
        .label="White" 
        .id="white" 
        .choices=${playerNames} 
        .props=${this.config.properties} />
        &nbsp;
        <cb-config-select 
        .label="Black" 
        .choices=${playerNames} 
        .id="black" 
        .props=${this.config.properties} />
      </div>
      <div>&nbsp;</div>
      <cb-config-select
        .label="Timer setting"
        .id="clock"
        .choices=${this.config.clocks.map(x => x.name)}
        .props=${this.config.properties}
      />
      <div>&nbsp;</div>
      <div class="buttons">
        <cb-config-button
          @click={action(playService.startGameAction)}
          .label="Play"
          .icon="MdPlayCircle"
        />
        <cb-config-button
          @click={action(playService.endGameAction)}
          .label="End game"
          .icon="MdExitToApp"
          .disabled={playService.isComplete}
        />
        <cb-config-button
          @click={action(playService.resetGameAction)}
          .label="Reset"
          .icon="MdClear"
        />
        <cb-config-button 
        @click={action(playService.editGameAction)} 
        .label="Edit" 
        .icon="MdEdit" />
      </div>
    </div>
      `;
  }
}


