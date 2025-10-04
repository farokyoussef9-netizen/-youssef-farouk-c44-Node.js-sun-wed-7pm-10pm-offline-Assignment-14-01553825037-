"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//عملنها عشان لو غيرنا الداتا بيز نغير method هنا بس
class AbstractRepository {
    model;
    constructor(model) {
        this.model = model;
    }
    async create(item) {
        //prebare data
        const doc = new this.model(item);
        return await doc.save();
    }
    async getone(filter, projection, option) {
        return await this.model.findOne(filter, projection, option);
    }
    async exist(filter, projection, option) {
        return await this.model.findOne(filter, projection, option);
    }
    async update(filter, update, option) {
        return await this.model.updateOne(filter, update, option);
    }
    async delete(filter) {
        return await this.model.deleteOne(filter);
    }
}
exports.default = AbstractRepository;
