import { html } from 'lit-element';

export const STYLES = html`
  <link
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
    rel="stylesheet"
  />
  <style>
    @font-face {
      font-family: 'Material Design Icons';
      src: url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined') format('woff');
    }
    .flex {
      display: flex;
    }
    .flex-grow {
      flex-grow: 1;
    }
    .flex-row {
      flex-direction: row;
    }

    .flex-col {
      flex-direction: column;
    }
    .text-left {
      text-align: left;
    }

    .text-center {
      text-align: center;
    }

    .text-right {
      text-align: right;
    }

    .text-3xl {
      font-size: 1.875rem;
      line-height: 2.25rem;
    }

    .text-7xl {
      font-size: 4.5rem;
      line-height: 1;
    }

    .text-lg {
      font-size: 1.125rem;
      line-height: 1.75rem;
    }
    .w-full {
      width: 100%;
    }
    .m-0 {
      margin: 0px;
    }
    .p-0 {
      padding: 0px;
    }
    .mx-5 {
      margin-left: 1.25rem;
      margin-right: 1.25rem;
    }
  </style>
`;
