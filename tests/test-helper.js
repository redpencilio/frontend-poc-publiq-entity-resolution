import Application from 'frontend-poc-publiq-entity-resolution/app';
import config from 'frontend-poc-publiq-entity-resolution/config/environment';
import * as QUnit from 'qunit';
import { setApplication } from '@ember/test-helpers';
import { setup } from 'qunit-dom';
import { start } from 'ember-qunit';

setApplication(Application.create(config.APP));

setup(QUnit.assert);

start();
