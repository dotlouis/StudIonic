Studionic
=====================

Studapp mobile application using Ionic Framework and Cordova.

## Setting up the project

#### Get the code

_If you don't wanna bother with the command line, just download the github application for 
[Mac](https://mac.github.com/) or [Windows](https://windows.github.com/) and skip to *Get all the tools*_


First clone this repo. Git will ask you for your credentials (private repo). 
```bash
$ git clone https://github.com/studapp/Studionic.git
```

If you have 2FA activated you need to clone using ssh and ssh keys.
For this to work you'll need to head over https://help.github.com/articles/generating-ssh-keys.
Proceed to add a ssh key to Github.
Then clone using ssh:
```bash
$ git clone git@github.com:studapp/Studionic.git
```

#### Get all the tools

Now you have the foundation, you need the tools to build it.

First download and install [NodeJs](http://nodejs.org/) (wich comes with its package manager `npm`)
Then we will use npm to install the rest of the tools.

We'll start with the [Ionic Framework](http://ionicframework.com/) which uses [Cordova](http://cordova.apache.org/) under the hood to package the code into a native app
```bash
$ sudo npm install -g cordova ionic
```
Now all you need to do is cd in the repository you cloned and run
```bash
$ npm install
```
This will download all the tools required by the project.
You can find the list of dependencies in the `package.json` file

#### Get the dependencies

Ok now you may use the newly installed `bower` tool to download all the librairies used by application by running
```bash
$ bower install
```
Great still with us ?

## Using the app

#### Testing in a Browser

Beeing a packaged webapp Studionic can run on the browser. You can fireup a local server to see the app from your browser with
```bash
$ ionic serve [http-port] [livereload-port] [options]
```

Command-line flags/options:

    [--nobrowser|-b]  ......  Disable launching a browser
    [--nolivereload|-r]  ...  Do not start live reload
    
This is will open a browser tab with livereload to immediately reflect the changes of your files.
Studionic uses SASS for styling. The above command takes care of watching and compiling scss files thanks to `gulp`.

#### Run on platform

To run the application on an iOS or Android device you first need to "add" the plateform to ionic with:
```bash
$ ionic platform add ios
```
_Replace ios by android for corresponding needs_

Then install compile and run on a device (or emulator if no devices plugged in) with
```bash
$ ionic run ios
```
_Again replace ios with android to suit your needs_
_*Note:* for now using ios platform require OSX with Xcode_


## Updating Ionic

You can learn more about the `ionic` utility on its [github page](https://github.com/driftyco/ionic-cli)

#### Ionic CLI

```bash
$ sudo npm update -g ionic
```

#### Ionic libs

Update Ionic library files, which are found in the `www/lib/ionic` directory. If bower is being used
by the project, this command will automatically run `bower update ionic`, otherwise this command updates 
the local static files from Ionic's CDN.

```bash
$ ionic lib update
```
