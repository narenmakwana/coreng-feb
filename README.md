# CoreNG

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.26.

For help with this theme, check out [Our Private Git Server](https://git.mediapixeldesign.com)!
To become part of the development team (or to report an issue or just follow along with development),
simply send an email to ["support@mediapixeldesign.com"](mailto:support@mediapixeldesign.com) with the following information:
    
* Your Name
* Desired Username
* Desired Email
* Your license code
    
An email will be sent to you to setup your Gitlab Account

####Scroll Down For Theme Use Information!


Before starting to use this project, you will need to run a few commands

This project uses [Yarn](yarnpkg.com) instead of npm to provide a more reliable development experience over traditional NPM

* `npm install -g angular-cli` 
* `npm install -g yarn`
* `yarn install`


## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Basic setup
Inside `src->app->app.module.ts`, you will a variable called `defaultOptions` near the top, 
```
const defaultOptions: ICoreOptions = {
  appTitle : 'CoreNG',
  openSidenavStyle: 'side',
  closedSidenavStyle: 'icon overlay'
};
```

This is where you'll modify default theme options including the app title which shows in the browser title and in the expanded sidenav along with other options:

* appTitle - Appears in browser tab/window title & next to icon in expanded sidenav
* openSidenavStyle - Dictates the sidenav style when 'open' ['side', 'icon', 'icon overlay', 'hidden', push', 'off'] (will default to 'hidden' on mobile, unless set to 'off')
* closedSidenavStyle - Dictates the sidenav style when 'closed'
* fixedNavbar - Allows making navbar to be fixed (doesn't work perfect yet, will be fixed on mobile soon)
* sidenavOpened - Which sidenav style to start with
  * Last sidenav position is saved to the users localStorage and will be restored on refresh
* titleSeparator - Character(s) which seperate appTitle from pageTitle in tab/window title

## Setup menu
1. Go to `src -> navigation -> menu-setup.tx`
2. Remove and modify items as needed
3. You will see the different possibilities for creating a MenuItem there to serve as examples

## Creating Routes
In your modules routing file, you must have the following syntax:
```
export const exampleRouting = RouterModule.forChild([
  {
    path : 'my-top-level-url', component : DefaultLayoutComponent, children : [
    {path : '', redirectTo : 'my-component', pathMatch: 'full'},
    {path : 'my-component', component : MyComponent},
  ]}
]);
```
You must use the DefaultLayoutComponent as your main path, then all actual components be set as children underneath!!
This top level path does NOT need to have a path set! (It can be blank (i.e. `''`'))

To lazy load your module, instead of importing it directly into AppModule, simple add it to app.routing.ts using `loadChildren()`

`{path : 'my-lazy-module', loadChildren : './path/to/my/lazy.module#LazyModule'}`

### Removing Examples
1. Delete examples folder
2. Remove `ExamplesModule.forRoot()` import from app.module.ts imports array and remove `import {ExamplesModule} from './examples/examples.module';`
3. Remove `SampleDialogComponent, SampleMenuDialogComponent, CompletedDialogComponent` from `entryComponents` array
4. Done


## Creating your own theme
1. Pick your 2 (or 3 if you want to modify the "warn" palette) colors
2. Go to http://mcg.mbitson.com/ and color box in the top right of the palette and paste in your color code
3. Click on view code (the clipboard icon) and click on "Angular JS 2 (Material 2)" and copy the code between the parenthesises
4. Paste into the appriopriate palette (whether primary or accent color) into `src->assets->scss->_variables.scss` (you will see a similar format currently there)
5. Repeat for accent color and your theme will be live!
6. (You can also manually set the primary(background) and secondary(font) colors for the sidenav (`$sidenav-primary-color` & `$sidenav-secondary-color`))

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.
For production, I recommend compiling using the aot flag as well

### ~~ng build --aot --prod~~ (AoT currently broken in angular-cli@1.0.0-beta.26)
### Use `ng build --prod`

## Further help

To get more help on the `angular-cli` use `ng --help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
