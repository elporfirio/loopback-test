'use strict';

/** dependencies **/
var path = require('path');
var fs = require('fs');
var app = require(path.resolve(__dirname, '../server'));

var outputPath = path.resolve(__dirname, '../../common/models');

var ds = app.dataSources.mysqlfirio;

function schemaCB(error, schema) {
  if (schema) {
    console.log('Auto discovery: ' + schema.name);
    var ouputName = outputPath + '/' + schema.name + '.json';

    fs.writeFile(ouputName, JSON.stringify(schema, null, 2), function (error) {
        if (error) {
          console.log(error);
        } else {
          console.log('JSON guardado: ' + ouputName);
        }
      }
    );
  }

  if (error) {
    console.log(error);
    return;
  }
}

ds.discoverSchema('invocar', {
  schema: 'equipos'
}, schemaCB);
