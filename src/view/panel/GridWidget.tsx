import React, { MouseEvent, ReactNode, TouchEvent, useRef } from 'react';

export const GridWidget = (props: {
  children: ReactNode[];
  onClick: (event: MouseEvent<HTMLTableElement>) => void;
  scroll: boolean;
}) => {
  const endRef = useRef<HTMLTableRowElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  if (props.scroll) endRef.current?.scrollIntoView();

  let fingerStart = 0;
  let scrollStart = 0;
  let scrollMove = 0;
  const onTouchStart = (event: TouchEvent<HTMLTableElement>) => {
    fingerStart = event.touches[0].pageY;
    scrollStart = scrollMove;
    event.preventDefault();
  };
  const onTouchMove = (event: TouchEvent<HTMLTableElement>) => {
    const fingerMove = fingerStart - event.touches[0].pageY;
    scrollMove = scrollStart + fingerMove;
    scrollRef.current?.scroll({ top: scrollMove });
    event.preventDefault();
  };

  return (
    <div className="m-0 p-0 w-full overflow-auto" ref={scrollRef}>
      <table
        className="m-0 table-fixed w-full"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onClick={props.onClick}>
        {props.children}
        <tr ref={endRef} />
      </table>
    </div>
  );
};
