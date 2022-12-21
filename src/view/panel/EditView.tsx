import React, { ReactNode, useState } from 'react';
import { DashboardService } from '../../services/dashboard.service';
import {
  FaChessBishop,
  FaChessKing,
  FaChessKnight,
  FaChessPawn,
  FaChessQueen,
  FaChessRook,
} from 'react-icons/fa';
import { ConfigButton, ConfigCheckbox } from '../config/ConfigWidgets';
import { MdCheck, MdDelete } from 'react-icons/md';
import { observer } from 'mobx-react';

export const EditView = observer(({ gameState }: { gameState: DashboardService }) => {
  const [wcck, setWcck] = useState(false);
  const [wccq, setWccq] = useState(false);
  const [bcck, setBcck] = useState(false);
  const [bccq, setBccq] = useState(false);
  const [bFirst, setBFirst] = useState(false);

  const TD = (name: string, img: ReactNode) => (
    <td onClick={() => gameState.editPiece(name)}>{img}</td>
  );

  const editDone = () => gameState.editDone(wcck, wccq, bcck, bccq, bFirst);

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
          <td onClick={() => gameState.editPiece(' ')}>
            <MdDelete className="text-7xl text-red-500" />
          </td>
          <td colSpan={2}>
            <ConfigCheckbox
              checked={wcck}
              onChange={() => setWcck(!wcck)}
              label="White castle-king"
            />
            <ConfigCheckbox
              checked={wccq}
              onChange={() => setWccq(!wccq)}
              label="White castle-queen"
            />
            <ConfigCheckbox
              checked={bcck}
              onChange={() => setBcck(!bcck)}
              label="Black castle-king"
            />
            <ConfigCheckbox
              checked={bccq}
              onChange={() => setBccq(!bccq)}
              label="Black castle-queen"
            />
            <ConfigCheckbox
              checked={bFirst}
              onChange={() => setBFirst(!bFirst)}
              label="Black goes first"
            />
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

      <ConfigButton onClick={editDone} label="Done" icon={<MdCheck />} />
    </div>
  );
});
