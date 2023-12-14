import React, { MouseEvent, ReactNode, useEffect, useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { observer } from 'mobx-react';
import { CALLBACK, MessageService, messageType } from '../../common/service/message.service';
import {
  FaChessQueen,
  FaChessRook,
  FaChessKnight,
  FaChessBishop,
  FaChessKing,
  FaRegHandshake,
} from 'react-icons/fa';
import { MdCheck, MdCancel } from 'react-icons/md';
import { configService } from '../../common/service/index.service';
import { ConfigButton } from './config-widgets';

const msgHolder: {
  title: string;
  msg: string;
  buttons: ButtonType[];
  callback?: CALLBACK;
} = {
  title: '',
  msg: '',
  buttons: [],
};
export const MessageDialog = observer(({ message }: { message: MessageService }) => {
  const [show, setShow] = useState(false);
  const clicked = '';
  const func = (msgtype: messageType) => {
    msgHolder.title = msgtype.title;
    msgHolder.msg = msgtype.msg;
    msgHolder.buttons = getButtons(msgtype.name);
    msgHolder.callback = msgtype.callback;
    setShow(true);
  };
  message.initialize(func);
  const closeFunc = (e: MouseEvent) => {
    setShow(false);
    if (msgHolder.callback) {
      msgHolder.callback((e.target as HTMLButtonElement).innerHTML);
    }
  };

  return (
    <Dialog
      aria-labelledby="message"
      open={show}
      onClose={closeFunc}
      className="text-center text-lg"
    >
      <DialogTitle id="message">{msgHolder.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{getMsg(msgHolder.msg)}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {msgHolder.buttons?.map(x => (
          <ConfigButton key={x.label} onClick={closeFunc} label={x.label} icon={x.icon} />
        ))}
      </DialogActions>
    </Dialog>
  );
});

function getButtons(name: string): ButtonType[] {
  switch (name) {
    case 'about':
    case 'load':
      return [{ name: 'ok', label: 'Ok' }];
    case 'undo':
    case 'revert':
      return [
        { name: 'y', label: 'Yes', icon: <MdCheck /> },
        { name: 'n', label: 'No', icon: <MdCancel /> },
      ];
    case 'promotion':
      return [
        { name: 'q', label: 'Queen', icon: <FaChessQueen /> },
        { name: 'r', label: 'Rook', icon: <FaChessRook /> },
        { name: 'n', label: 'Knight', icon: <FaChessKnight /> },
        { name: 'b', label: 'Bishop', icon: <FaChessBishop /> },
      ];
    case 'end':
      const white = configService.game.white.split(' ')[0];
      const black = configService.game.black.split(' ')[0];
      return [
        {
          name: 'w',
          label: white,
          icon: <FaChessKing className="text-white" />,
        },
        { name: 'draw', label: 'Draw', icon: <FaRegHandshake /> },
        {
          name: 'b',
          label: black,
          icon: <FaChessKing className="text-black" />,
        },
      ];
    default:
      return [];
  }
}

type ButtonType = {
  name: string;
  label: string;
  icon?: JSX.Element;
};

function getMsg(name: string) {
  switch (name) {
    case 'about':
      return (
        <div>
          This chess program is open source and available at github.
          <ul>
            <li>
              <a href="https://github.com/pdigre/chessbuddy" target="_blank" rel="noopener">
                Github pdigre/chessbuddy
              </a>
            </li>
            <li>
              <a
                href="https://github.com/pdigre/chessbuddy/wiki/User-guide"
                target="_blank"
                rel="noopener"
              >
                User Guide / instructions
              </a>
            </li>
          </ul>
        </div>
      );
    case 'end':
      return (
        <div className="text-3xl">
          Who won?
          <img src="/png/win.png" />
        </div>
      );
    default:
      return <span>{name}</span>;
  }
}
