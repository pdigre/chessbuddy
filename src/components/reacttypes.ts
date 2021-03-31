export type CHANGE_EVENT = {
  name?: string | undefined;
  value: unknown;
};

export type HANDLE_CHANGE = (
  event: React.ChangeEvent<CHANGE_EVENT>,
  child: React.ReactNode
) => void;

export type HANDLE_CLICK = (event: React.MouseEvent<HTMLElement>) => void;
