"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
const class_transformer_1 = require("class-transformer");
const typeorm_1 = require("typeorm");
const utilities_1 = require("../utilities");
class BaseRepository extends typeorm_1.Repository {
    constructor(repo) {
        super(repo.target, repo.manager, repo.queryRunner);
        this.repo = repo;
    }
    async createMultipleEntities(entities) {
        return (0, class_transformer_1.instanceToPlain)(await this.repo.save(entities));
    }
    async find(conditions, options) {
        return (0, class_transformer_1.instanceToPlain)(await this.repo.find(Object.assign({ where: conditions }, options)));
    }
    async findRaw(conditions, options) {
        return await this.repo.find(Object.assign({ where: conditions }, options));
    }
    async findOneBy(opts) {
        return (0, class_transformer_1.instanceToPlain)(await this.repo.findOneBy(opts));
    }
    async findOneByRaw(opts) {
        return await this.repo.findOneBy(opts);
    }
    async findOne(conditions, options) {
        return (await (0, class_transformer_1.instanceToPlain)(this.repo.findOne(Object.assign({ where: conditions }, options))));
    }
    async findOneRaw(conditions, options) {
        return await this.repo.findOne(Object.assign({ where: conditions }, options));
    }
    async findByIds(ids) {
        return (0, class_transformer_1.instanceToPlain)(await this.repo.findBy({ id: (0, typeorm_1.In)(ids) }));
    }
    async findByIdsRaw(ids) {
        return await this.repo.findBy({ id: (0, typeorm_1.In)(ids) });
    }
    async findAndCount(options) {
        const [items, count] = await this.repo.findAndCount(options);
        return [(0, class_transformer_1.instanceToPlain)(items), count];
    }
    async findAndCountRaw(options) {
        const [items, count] = await this.repo.findAndCount(options);
        return [items, count];
    }
    async save(entity) {
        return (0, class_transformer_1.instanceToPlain)(await this.repo.save(entity));
    }
    async update(id, entity) {
        return (0, class_transformer_1.instanceToPlain)(await this.repo.update(id, entity));
    }
    async delete(criteria) {
        return this.repo.delete(criteria);
    }
    async softDelete(entity) {
        return this.repo.softDelete(entity);
    }
    async paginationRepository(repository, pageOption, options, isRaw) {
        const { page, perPage } = (0, utilities_1.numberInputs)(pageOption);
        const [result, total] = await repository.findAndCount(Object.assign({ take: perPage || 10, skip: (page - 1) * perPage || 0 }, options));
        return {
            items: isRaw ? result : (0, class_transformer_1.instanceToPlain)(result),
            pagination: (0, utilities_1.genPagination)(page, perPage, total),
        };
    }
    async paginationQueryBuilder(queryBuilder, pageOptions, isRaw) {
        const { perPage = 10, page = 1 } = (0, utilities_1.numberInputs)(pageOptions);
        const total = await queryBuilder.getCount();
        const result = await queryBuilder
            .skip(perPage * (page - 1))
            .take(perPage || 10)
            .getMany();
        return {
            items: isRaw ? result : (0, class_transformer_1.instanceToPlain)(result),
            pagination: (0, utilities_1.genPagination)(page, perPage, total),
        };
    }
    getRepo() {
        return this.repo;
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=base.repository.js.map