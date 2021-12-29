/*
 * Copyright 2022 Fernando Boucquez
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { NetworkHandler } from '@services/NetworkHandler';
import { TransactionRowInformation, TransactionUtils } from '@services/TransactionUtils';
import { Utils } from '@services/Utils';
import { Amount, BlockResponse, NetworkIdentifier, RosettaRestClientFactory } from 'rosetta-client-typescript';

export interface BlockRowInformation {
    index: number;
    timestamp: number;
    transactionsCount: number;
    miner?: string;
    rewardAmount?: Amount;
}

export class BlockUtils {
    public static async getBlocks({
        rosettaRestClientFactory,
        fromIndex,
        total,
        networkIdentifier,
    }: {
        rosettaRestClientFactory: RosettaRestClientFactory;
        fromIndex: number;
        total: number;
        networkIdentifier: NetworkIdentifier;
    }): Promise<BlockResponse[]> {
        const blockIndexes = Utils.range(Math.max(fromIndex - total, 0), fromIndex);
        const blockClient = rosettaRestClientFactory.block();
        const blocks = await Promise.all(
            blockIndexes.map((index) => {
                return blockClient.block({
                    network_identifier: networkIdentifier,
                    block_identifier: {
                        index: index,
                    },
                });
            })
        );
        blocks.sort((b1, b2) => {
            return (b2.block?.block_identifier.index || 0) - (b1.block?.block_identifier.index || 0);
        });
        return blocks;
    }

    public static getTransactions = (
        totalElements: number,
        networkHandler: NetworkHandler,
        blockResponses: BlockResponse[]
    ): TransactionRowInformation[] => {
        const allTransactions = blockResponses.reduce((list, blockResponse) => {
            const newTransactions: TransactionRowInformation[] = (blockResponse.block?.transactions || []).map((transaction) => {
                return TransactionUtils.fromTransactionToRow({ networkHandler, transaction, blockResponse });
            });
            return [...list, ...newTransactions];
        }, [] as TransactionRowInformation[]);
        return allTransactions.slice(0, Math.min(totalElements, allTransactions.length));
    };

    public static fromBlockToRow({
        networkHandler,
        blockResponse,
    }: {
        networkHandler: NetworkHandler;
        blockResponse: BlockResponse;
    }): BlockRowInformation {
        const block = blockResponse.block;
        if (!block) {
            throw new Error('Block must exist in response!');
        }
        const miner = networkHandler.getBlockMiner(block);
        const rewardAmount = networkHandler.getBlockRewardOperation(block)?.amount;
        return {
            index: block.block_identifier.index,
            timestamp: block.timestamp,
            transactionsCount: block.transactions.length,
            rewardAmount,
            miner,
        };
    }
}
