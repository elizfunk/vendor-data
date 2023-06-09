"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dynamodbCreateRecord = exports.dynamodbDeleteTable = exports.dynamodbDescribeTable = exports.dynamodbCreateTable = void 0;
const util_dynamodb_1 = require("@aws-sdk/util-dynamodb");
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const aws_1 = require("./types/aws");
aws_sdk_1.default.config.update({ region: aws_1.AWSRegions.US_EAST_1 });
const { DynamoDB } = aws_sdk_1.default;
const dynamodb = new DynamoDB();
// create a table
const dynamodbCreateTable = (params) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield dynamodb.createTable(params).promise();
        console.log('Table created:', result);
        return result;
    }
    catch (e) {
        if (e instanceof Error) {
            throw e;
        }
        throw new Error(`dynamodbCreateTable error object unknown type`);
    }
});
exports.dynamodbCreateTable = dynamodbCreateTable;
// describe a table
const dynamodbDescribeTable = (tableName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const table = yield dynamodb.describeTable({
            TableName: tableName
        }).promise();
        console.log('Table retrieved:', table);
        return table;
    }
    catch (e) {
        if (e instanceof Error) {
            return e;
        }
        throw new Error(`dynamodbDescribeTable error object unknown type`);
    }
});
exports.dynamodbDescribeTable = dynamodbDescribeTable;
// delete a table
const dynamodbDeleteTable = (tableName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield dynamodb.deleteTable({
            TableName: tableName
        }).promise();
        console.log('Table deleted:', result);
        return result;
    }
    catch (e) {
        if (e instanceof Error) {
            return e;
        }
        throw new Error(`dynamodbDeleteTable error object unknown type`);
    }
});
exports.dynamodbDeleteTable = dynamodbDeleteTable;
// create a record
const dynamodbCreateRecord = (tableName, vendor) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield dynamodb.putItem({
            TableName: tableName,
            Item: (0, util_dynamodb_1.marshall)(vendor),
        }).promise();
        console.log('Record created');
    }
    catch (e) {
        if (e instanceof Error) {
            return e;
        }
        throw new Error(`dynamodbCreateRecord error object unknown type`);
    }
});
exports.dynamodbCreateRecord = dynamodbCreateRecord;
