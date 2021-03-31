import React from 'react';
import styles from '../styles.module.scss';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core';
import type { HANDLE_CLICK } from './reacttypes';
import { useState } from 'react';

export type ConfirmationProps = {
  title?: string;
  msg?: string;
  ok?: string;
  cancel?: string;
  response?: (ok: boolean) => void;
};

export const Confirmation: React.FC<ConfirmationProps> = props => {
  const { title, msg, ok, cancel, response } = props;

  const handleOk: HANDLE_CLICK = event => {
    if (response) response(true);
  };

  const handleCancel: HANDLE_CLICK = event => {
    if (response) response(false);
  };

  return (
    <Dialog
      aria-labelledby="confirmation"
      open={title != undefined}
      onClose={handleCancel}
      className={styles.Dialog}>
      <DialogTitle id="confirmation">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{msg}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {cancel ? (
          <Button autoFocus onClick={handleCancel} color="primary">
            {cancel}
          </Button>
        ) : (
          ''
        )}
        <Button onClick={handleOk} color="primary" autoFocus>
          {ok}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
