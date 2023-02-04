import { DeepPartial, DeleteResult, FindManyOptions, FindOneOptions, FindOptionsWhere, ObjectID, Repository, SelectQueryBuilder, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { IPageOption, IPaginationResponse } from '../interfaces';
import { BaseTable } from './base.entity';
export declare class BaseRepository<Model extends BaseTable> extends Repository<Model> {
    protected readonly repo: Repository<Model>;
    constructor(repo: Repository<Model>);
    createMultipleEntities(entities?: DeepPartial<Model>[]): Promise<Array<Model>>;
    find(conditions?: any, options?: FindManyOptions<Model>): Promise<Model[]>;
    findRaw(conditions: any, options?: FindOneOptions<Model>): Promise<Model[]>;
    findOneBy(opts?: FindOptionsWhere<Model> | FindOptionsWhere<Model>[]): Promise<Model>;
    findOneByRaw(opts?: FindOptionsWhere<Model> | FindOptionsWhere<Model>[]): Promise<Model>;
    findOne(conditions: any, options?: FindOneOptions<Model>): Promise<Model>;
    findOneRaw(conditions: any, options?: FindOneOptions<Model>): Promise<Model>;
    findByIds(ids: any[]): Promise<Model[]>;
    findByIdsRaw(ids: any[]): Promise<Model[]>;
    findAndCount(options?: FindManyOptions<Model>): Promise<[Model[], number]>;
    findAndCountRaw(options?: FindManyOptions<Model>): Promise<[Model[], number]>;
    save(entity: Model[]): Promise<Model[]>;
    update(id: number, entity: QueryDeepPartialEntity<Model>): Promise<UpdateResult>;
    delete(criteria: string | string[] | number | number[] | Date | Date[] | ObjectID | ObjectID[] | FindOptionsWhere<Model>): Promise<DeleteResult>;
    softDelete(entity: any): Promise<UpdateResult>;
    paginationRepository(repository: Repository<Model>, pageOption: IPageOption, options?: FindManyOptions<Model>, isRaw?: boolean): Promise<IPaginationResponse<Model>>;
    paginationQueryBuilder(queryBuilder: SelectQueryBuilder<Model>, pageOptions: IPageOption, isRaw?: boolean): Promise<IPaginationResponse<Model>>;
    getRepo(): Repository<Model>;
}
