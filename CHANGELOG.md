# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.2.4] - 2020-03-08

### Fixes

* [#354] Getting errors on each drag and drop using react-trello/smooth-dnd
* [#317] Upgrade smooth-dnd to the latest version


## [2.2.3] - 2019-08-22

### Fixes

* [#312] Lane metadata not being passed to CustomLaneHeader

## [2.2.2] - 2019-07-30

### Improvements

* LaneHeaderComponent specified two editLaneTitle props, causing a warning to
  be shown
* Remove duplicated editLaneTitle propType

### Fixes

* [#306] Delete Icon not there in Custom Card Component

## [2.2.1] - 2019-07-22

### Improvements

* Cursor on lane header respects draggable
* Improve new lane title editor (auto close on click outside)

### Fixes

* [#298] onCardDelete Event doesn't get fired anymore

## [2.2.0] - 2019-07-20

### Added

* Availability to hide Add Card button for specific lane
* Internationalization support (property `t` and `lang`)
* Russian translation
* Dependency Injection mechanisim for all components customization 
  (property `components`)
* Add `onCardMoveAcrossLanes` handler property, called when a card is moved across lanes
* Add `onDeleteLane` handler property
* Add `laneStyle` property
* Add `editLaneTitle` and `onLaneUpdate` props (availability to inline edit lane
  title)

### Improvements

* Removed CSS style hardcoding (except `react-popover`)
* Upgrade dev dependencies and remove unnecessary pkgs
* Suppress debug prints in tests
* Add babel-plugin-module-resolver to root as ./src
* Removed `react-popover`'s CSS classes. 


### Fixes

* [#203] fixes Cannot drop a card near the bottom of a lane
* [#205] fix argument names in handleLaneDragEnd
* [#201] Fixed Warning: Failed prop type by replacing `react-popover` with `react-popopo`

### Breaking changes

* Removed props `addLaneTitle` and `addCardTitle`. Use `t('Add another lane')` and `t('Click to add card')` instead of it.
* Removed props `customLaneHeader`, `newCardTemplate`, `newLaneTemplate`, `customCardLayout`. Use `components` property instead of it.

Refer [upgrade instructions](UPGRADE.md) to migrate to new version.

## [0.0.0] - [2.1.4]

Lookin into `git log`
