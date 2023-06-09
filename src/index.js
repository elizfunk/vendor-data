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
Object.defineProperty(exports, "__esModule", { value: true });
const aws_1 = require("./aws");
const vendors_1 = require("./data/vendors");
const delay = (ms) => new Promise(res => setTimeout(res, ms));
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    const vendorsTableName = 'vendors';
    const vendorsTable = yield (0, aws_1.dynamodbDescribeTable)(vendorsTableName);
    if (!(vendorsTable instanceof Error)) {
        yield (0, aws_1.dynamodbDeleteTable)(vendorsTableName);
        yield delay(6000);
    }
    const vendorsTableParams = {
        TableName: vendorsTableName,
        KeySchema: [
            {
                AttributeName: 'twitterId',
                KeyType: 'HASH',
            }
        ],
        AttributeDefinitions: [
            {
                AttributeName: 'twitterId',
                AttributeType: 'S',
            }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 10,
            WriteCapacityUnits: 10,
        }
    };
    yield (0, aws_1.dynamodbCreateTable)(vendorsTableParams);
    yield delay(6000);
    for (const vendor of vendors_1.vendors) {
        const res = yield (0, aws_1.dynamodbCreateRecord)(vendorsTableName, vendor);
        if (res instanceof Error) {
            console.log('Error:', vendor, res);
        }
    }
});
init();
