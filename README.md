# CSS Lab

CSS experiments for the [CSS Overview](http://www.thruzero.com/jcat3/apps/resources/resources.jsf?rid=css.overview) at ThruZero.

## Description

The primary purpose of *CSS Lab* is to explore CSS.
Partly to dig deeper into the mystery of why things don't work as expected (which always seems to happen as deadlines loom),
and partly just to play around with some new *CSS3* features.

A further purpose is to gain experience with JavaScript.
CSS Lab is built using [LabKit JS](https://github.com/georgenorman/lab-kit-js/blob/master/README.md), which is a JavaScript library created to keep the example code in sync with the rendered results (the rendered results are created using the example code).
LabKit JS is also used to generate the *Table of Contents* for each page, which automatically keeps it in sync with the document sections.

Third-party libraries (e.g., jQuery) are not used, because that would interfere with the goal of getting exposed to the fundamentals
(i.e., using jQuery would be like exploring the Amazon by jet - instead, I want to explore it on foot, even if it means sinking to my eyebrows in quicksand).

## Experiments

* [CSS Lab Demo](http://www.thruzero.com/pages/jcat3/css-lab/index.html)
  * [At Rules](http://www.thruzero.com/pages/jcat3/css-lab/atRule.html)
  * [Selectors](http://www.thruzero.com/pages/jcat3/css-lab/selectors.html)
  * [Box Model](http://www.thruzero.com/pages/jcat3/css-lab/boxModel.html)
  * [Positioning](http://www.thruzero.com/pages/jcat3/css-lab/positioning.html)
  * [Floats](http://www.thruzero.com/pages/jcat3/css-lab/floats.html)
  * [Transparency/Display](http://www.thruzero.com/pages/jcat3/css-lab/transparencyDisplay.html)
  * [Filters](http://www.thruzero.com/pages/jcat3/css-lab/filters.html)
  * Modal Dialog (in progress)

## Testing Locally

Just cd to the project directory and open the ```src/index.html``` file in your browser.
The CSS and JavaScript files will be accessed in a non-minified and non-amalgamated way.

Alternatively, you can perform a build, which will optimize the CSS and JavaScript files for deployment.

## Building a Release

### Setup

The project's build process uses Node.js and Grunt.
If you don't have Grunt, you can follow the [Getting Started](http://gruntjs.com/getting-started) guide.
Next, just do an `npm install` which will install Grunt locally as well as all of the project dependencies:

```bash
npm install
```

### Default Build

The default build cleans the target directory and generates the current release.

```bash
grunt
```

## License

Copyright 2014 George Norman

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this software except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
