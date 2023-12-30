import React, { ReactNode } from 'react';
import {
  FaChessBishop,
  FaChessKing,
  FaChessKnight,
  FaChessPawn,
  FaChessQueen,
  FaChessRook,
} from 'react-icons/fa';
import { MdCheck, MdDelete } from 'react-icons/md';
import { observer } from 'mobx-react';
import { EditService } from '../../common/service/edit.service';
import { action } from 'mobx';
import { ConfigBoolean, ConfigButton } from './config-widgets';

export const PanelEdit = observer(({ edit }: { edit: EditService }) => {
  const TD = (name: string, img: ReactNode) => (
    <td onClick={action(() => edit.editPiece(name))}>{img}</td>
  );
  const props = edit.boolprops;
  return (
    <div>
      <table className="m-0 table-fixed w-full border-spacing-2">
        <tr>
          {TD('k', <FaChessKing className="text-7xl text-black" />)}
          {TD('q', <FaChessQueen className="text-7xl text-black" />)}
          {TD('r', <FaChessRook className="text-7xl text-black" />)}
        </tr>
        <tr>
          {TD('b', <FaChessBishop className="text-7xl text-black" />)}
          {TD('n', <FaChessKnight className="text-7xl text-black" />)}
          {TD('p', <FaChessPawn className="text-7xl text-black" />)}
        </tr>
        <tr>
          <td onClick={action(() => edit.editPiece(' '))}>
            <MdDelete className="text-7xl text-red-500" />
          </td>
          <td colSpan={2}>
            <ConfigBoolean props={props} id="wcck" label="White castle-king" />
            <ConfigBoolean props={props} id="wccq" label="White castle-queen" />
            <ConfigBoolean props={props} id="bcck" label="Black castle-kin" />
            <ConfigBoolean props={props} id="bccq" label="Black castle-quee" />
            <ConfigBoolean props={props} id="bFirst" label="Black goes first" />
          </td>
        </tr>
        <tr>
          {TD('K', <FaChessKing className="text-7xl text-white" />)}
          {TD('Q', <FaChessQueen className="text-7xl text-white" />)}
          {TD('R', <FaChessRook className="text-7xl text-white" />)}
        </tr>
        <tr>
          {TD('B', <FaChessBishop className="text-7xl text-white" />)}
          {TD('N', <FaChessKnight className="text-7xl text-white" />)}
          {TD('P', <FaChessPawn className="text-7xl text-white" />)}
        </tr>
      </table>

      <ConfigButton onClick={action(edit.editDoneAction)} label="Done" icon={<MdCheck />} />
    </div>
  );
});
