import React, { MouseEvent, ReactNode } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
} from '@mui/material';
import { observer } from 'mobx-react';
import { MessageService } from '../service/message.service';
import { ButtonType, ConfigButton } from './ConfigWidgets';
import {
  FaChessQueen,
  FaChessRook,
  FaChessKnight,
  FaChessBishop,
  FaChessKing,
  FaRegHandshake,
} from 'react-icons/fa';
import { MdCheck, MdCancel } from 'react-icons/md';
import { action } from 'mobx';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            "md-dialog": {
                open: any,
                type: string,
            };
            "md-text-button": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
        }
    }
}

export const MessageDialog = observer(({ message }: { message: MessageService }) => (
  <md-dialog
      open=""
      type="alert"
    aria-labelledby="message"
//    open={message.title != undefined}
//    onClose={action((e: MouseEvent) => message.onClose((e.target as HTMLButtonElement).innerHTML))}
    className="text-center text-lg">
    <div slot="headline">{message.title}</div>
    <form slot="content" id="form-id" method="dialog">
      {message.msg}
    </form>
    <div slot="actions">
      {message.buttons?.map(x => (
          <md-text-button
//              key={x.label}
//              form="form-id"
//              onClick={action((e: MouseEvent) =>
//                  message.onClose((e.target as HTMLButtonElement).innerHTML)
//              )}
//              icon={x.icon}
          >{x.label}</md-text-button>
      ))}
    </div>
  </md-dialog>
));

export const OK_BUTTON: () => ButtonType[] = () => [{ label: 'Ok' }];
export const YESNO_BUTTONS: () => ButtonType[] = () => [
  { label: 'Yes', icon: <MdCheck /> },
  { label: 'No', icon: <MdCancel /> },
];
export const PROMOTE_BUTTONS: () => ButtonType[] = () => [
  { label: 'Queen', icon: <FaChessQueen /> },
  { label: 'Rook', icon: <FaChessRook /> },
  { label: 'Knight', icon: <FaChessKnight /> },
  { label: 'Bishop', icon: <FaChessBishop /> },
];

export const WINNER_BUTTONS: (black: string, white: string) => ButtonType[] = (black, white) => [
  { label: white, icon: <FaChessKing className="text-white" /> },
  { label: 'Draw', icon: <FaRegHandshake /> },
  { label: black, icon: <FaChessKing className="text-black" /> },
];

export const WINNER_HTML: ReactNode = (
  <div className="text-3xl">
    Who won?
    <img src="/png/win.png" />
  </div>
);

export const ABOUT: ReactNode = (
  <div>
    This chess program is open source and available at github.
    <ul>
      <li>
        <Link href="https://github.com/pdigre/chessbuddy" target="_blank" rel="noopener">
          Github pdigre/chessbuddy
        </Link>
      </li>
      <li>
        <Link
          href="https://github.com/pdigre/chessbuddy/wiki/User-guide"
          target="_blank"
          rel="noopener">
          User Guide / instructions
        </Link>
      </li>
    </ul>
  </div>
);
