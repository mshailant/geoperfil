'use strict'

/*
|--------------------------------------------------------------------------
| CareerSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Career = use('App/Models/Career');
const csv = require('csvtojson');
const Logger = use('Logger');
const Helper = use('App/Helper/Utils')

const CAREERS_FILES = __dirname + '/files/careers/';

class CareerSeeder {
    async run() {
        if (Helper.isDirectory(CAREERS_FILES)) {
            let careersFiles = Helper.getDirectories(CAREERS_FILES);

            for (const file of careersFiles) {
                let career = await csv().fromFile(CAREERS_FILES + file);
                let count = await Career.query().where(career[0]).getCount();

                if (count == 0) {
                    let instance = await Career.create(career[0]);
                }

            }

            Logger.info('[Seeder] - Se cargaron las carreras correctamente');
        }
    }
}

module.exports = CareerSeeder