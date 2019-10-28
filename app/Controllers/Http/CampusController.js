'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Campus = use('App/Models/Campus');

/**
 * Resourceful controller for interacting with campuses
 */
class CampusController {
    /**
     * Show a list of all campuses.
     * GET campuses
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async index({ request, response, view }) {
        let params = request.all();
        params.columnName = params.columnName || 'name';
        params.columnValue = params.columnValue || '';

        let campuses = await Campus.query().where(params.columnName, 'ILIKE', `%${params.columnValue}%`).paginate(params.page, params.perPage);
        return campuses;
    }

    /**
     * Render a form to be used for creating a new campus.
     * GET campuses/create
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async create({ request, response, view }) {
    }

    /**
     * Create/save a new campus.
     * POST campuses
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async store({ request, response }) {
    }

    /**
     * Display a single campus.
     * GET campuses/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async show({ params, request, response, view }) {
        let campus = await Campus.find(params.id);
        return response.json(campus);
    }

    /**
     * Render a form to update an existing campus.
     * GET campuses/:id/edit
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async edit({ params, request, response, view }) {
    }

    /**
     * Update campus details.
     * PUT or PATCH campuses/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async update({ params, request, response }) {
        let campusUpdated = await Campus.query().where('id', params.id).update(request.all());
        return campusUpdated;
    }

    /**
     * Delete a campus with id.
     * DELETE campuses/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async destroy({ params, request, response }) {
        let campus = await Campus.query().where('id', params.id).delete();
        return campus;
    }
}

module.exports = CampusController
