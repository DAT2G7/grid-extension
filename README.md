# grid-extension

This repository contains the `grid-extension` code accompanying AAU cs-23-DAT-2-07's P2 report

This is the browser extension made to automatically open the grid client and start computations.

## Setup

Clone repository

```sh
git clone https://github.com/DAT2G7/grid-extension
```

Install dependencies

```sh
npm install
```

Build project

```sh
npm run build
```

To install and try out the extension, see the [chrome installation guide](https://github.com/DAT2G7/grid-extension/releases).

## Unused code sections

Certain directories in this repo contain what looks to be example code. This is code that was usefull in understanding extension development, but was not used in the final product. None of these sections are referenced in the extensions manifest file, and are therefore not included in published versions of the extension, were it to be published in the future.

Unused sections include

| Directory   | Description                                                                                                                                                 |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| src/actions | Files for creating a popup menu containing actions the user can perform. Did not end up being a priority, but is left as is for possible future development |
| src/content | Exists to contain scripts interacting directly with active browser tabs. This is however not relevant to the scope of this extension.                       |
