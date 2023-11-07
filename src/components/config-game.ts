import { MobxLitElement } from '@adobe/lit-mobx';
import { html } from 'lit';
import {customElement} from 'lit/decorators.js';
import {MdOutlinedButton} from '@material/web/button/outlined-button';
import {MdOutlinedSelect} from '@material/web/select/outlined-select';
import {MdSelectOption} from '@material/web/select/select-option';
import { configService, renderingService, playService } from '../service/index.service';
import { ConfigProp, ConfigService } from '../service/config.service';
import { action } from 'mobx';
import { property } from 'lit-element/decorators.js';


@customElement('cb-config-select')
export class ConfigSelect extends MobxLitElement {
  @property({ attribute: true })
  label!: string;
  @property({ attribute: true })
  id!: string;
  choices!: string[];
  props?: Map<string, ConfigProp<string>>;

  render() {
    new MdOutlinedSelect();
    new MdSelectOption();
    console.log("choices="+this.choices);
    const prop = (this.props ? this.props : configService.getItem.properties).get(this.id);
    const value = prop?.get();
    const choices = this.choices.map(name => 
        html`<md-select-option .selected=${name === value} value=${name}>
              <div slot="headline">${name}</div>
             </md-select-option>`);

    return html`
      <style>
       md-outlined-select {
          min-width: 200px;
        }
      </style>
      <form variant="filled">
        <label htmlFor="select">
          ${this.label}
        </label>
        <md-outlined-select
          @change=${action((event: MouseEvent) => {
            console.log("hi:"+event.target?.selectedIndex)
            prop?.set(event.target?.value);
          })
          }>
          <md-select-option/>
          ${choices}
        </md-outlined-select>
      </form>
      `;
  }
}

@customElement('cb-config-button')
export class ConfigButton extends MobxLitElement {
  onClick!: (event: MouseEvent) => void;
  @property({ attribute: true })
  label!: string;
  @property({ attribute: true })
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
      .disabled=${this.disabled ?? false}>
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
    <div class="main">
      <div>
        <cb-config-select 
        label="White" 
        id="white" 
        .choices=${playerNames} 
        .props=${this.config.properties} 
        ></cb-config-select>
        &nbsp;
        <cb-config-select 
        label="Black" 
        id="black" 
        .choices=${playerNames} 
        .props=${this.config.properties} 
        ></cb-config-select>
      </div>
      <div>&nbsp;</div>
      <cb-config-select
        label="Timer setting"
        id="clock"
        .choices=${this.config.clocks.map(x => x.name)}
        .props=${this.config.properties}
        ></cb-config-select>
      <div>&nbsp;</div>
      <div class="buttons">
        <cb-config-button
          @click=${action(playService.startGameAction)}
          label="Play"
          icon="MdPlayCircle"
        ></cb-config-button>
        <cb-config-button
          @click=${action(playService.endGameAction)}
          label="End game"
          icon="MdExitToApp"
          .disabled=${playService.isComplete}
          ></cb-config-button>
        <cb-config-button
          @click=${action(playService.resetGameAction)}
          label="Reset"
          icon="MdClear"
          ></cb-config-button>
        <cb-config-button 
          @click=${action(playService.editGameAction)} 
          label="Edit" 
          icon="MdEdit" 
          ></cb-config-button>
      </div>
    </div>
      `;
  }
}


