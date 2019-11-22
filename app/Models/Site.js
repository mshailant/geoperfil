'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Site extends Model {

    static get createdAtColumn() {
        return null;
    }

    static get updatedAtColumn() {
        return null;
    }

    selectors() {
        return this.hasMany('App/Models/Selector');
    }

    status() {
        return this.belongsTo('App/Models/EquationStatus');
    }
}

module.exports = Site