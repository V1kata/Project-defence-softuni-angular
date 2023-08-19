# ProjectDefenceSoftuniAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

<h2>For the project</h2>

The server i am using is back4app, i will leave 1 premade user and some bid items
    * admin@abv.bg : admin

- There are public and private parts. As required, the public pages of the site are:
    * Main page;
    * Catalogue page;
    * Details page.
All additional pages are accessible upon registration and login.

- After creating it's own item, the user can view, edit or delete it. Anybody, except the item owner, can bid on that item.
Note: edit, delete operations are available, only if there are no bids on that item.

- Bidding option is available for logged in users who haven't placed a bid on that item. Each use can only bid once per item, as the last bidder is the winner.
Note: there is no time limit implemented, therefore there is no actual winner.

- To place a bid, click the "Bid" button, followed by mini form field shown. Type amount of your choice, place the bid and you WIN ;).

- The last dynamic page is the "Profile". There you can view your image, name, email, number of posts and the image of items you have created. When clicked, you are directly send to the details page of the product.