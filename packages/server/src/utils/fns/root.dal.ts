/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { ModelType } from "@typegoose/typegoose/lib/types";
import {
    QueryFindOneAndUpdateOptions,
    Types,
    Document,
    FilterQuery,
} from "mongoose";
import { deleteProps } from "./object.util";
import { DALOptions } from "../../@types/types";

type InsertMany<T> = {
    result: object;
    ops: (Document & T)[];
    insertedCount: number;
    insertedIds: Record<string, Types.ObjectId>;
};

const opt: DALOptions = {
    select: "-__v",
    sort: {},
    upsert: false,
    skip: 0,
    limit: 0,
    arrayFilters: [],
};

export abstract class RootDAL<SchemaType extends object> {
    protected readonly options: DALOptions = opt;

    constructor(
        private readonly Model: ModelType<SchemaType>,
        private readonly ctx: FilterQuery<SchemaType> = {}
    ) {}

    async create(data: Partial<SchemaType>): Promise<SchemaType> {
        const newDoc = await this.Model.create(data);
        const doc = newDoc.toObject();

        return deleteProps(doc, ["__v"]) as Promise<SchemaType>;
    }

    createMany(data: Partial<SchemaType>[]): Promise<InsertMany<SchemaType>> {
        return (this.Model.insertMany(data, {
            rawResult: true,
        }) as unknown) as Promise<InsertMany<SchemaType>>;
    }

    findOne(options: DALOptions = {}): Promise<SchemaType> {
        const { select } = {
            ...this.options,
            ...options,
        };

        // @ts-ignore
        return this.Model.findOne(this.ctx)
            .select(select)
            .lean()
            .exec();
    }

    findAll(options: DALOptions = {}): Promise<SchemaType[]> {
        const { select, sort, limit, skip } = {
            ...this.options,
            ...options,
        };

        // @ts-ignore
        return this.Model.find(this.ctx)
            .select(select)
            .sort(sort)
            .skip(Number(skip))
            .limit(Number(limit))
            .lean()
            .exec();
    }

    updateOne(
        data: Partial<SchemaType | Record<string, unknown>>,
        options: DALOptions = {}
    ): Promise<SchemaType> {
        const { select, upsert, arrayFilters } = {
            ...this.options,
            ...options,
        };

        // @ts-ignore
        return this.Model.findOneAndUpdate(this.ctx, data, {
            new: true,
            upsert,
            arrayFilters,
        } as QueryFindOneAndUpdateOptions)
            .select(select)
            .lean()
            .exec();
    }

    updateMany(data: Partial<SchemaType>) {
        // @ts-ignore
        return this.Model.updateMany(this.ctx, data, { multi: true })
            .lean()
            .exec();
    }

    deleteOne(options: DALOptions = {}): Promise<SchemaType> {
        const { select } = {
            ...this.options,
            ...options,
        };

        // @ts-ignore
        return this.Model.findOneAndDelete(this.ctx)
            .select(select)
            .lean()
            .exec();
    }

    count() {
        // @ts-ignore
        return this.Model.countDocuments(this.ctx);
    }

    totalCount() {
        return this.Model.estimatedDocumentCount();
    }
}
