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
import { Constants } from '@services/Constants';
import { BasicTransactionInfo, NetworkHandler } from '@services/NetworkHandler';
import * as _ from 'lodash';
import { Block, Operation, Transaction } from 'rosetta-client-typescript';
export class NetworkHandlerEthereum implements NetworkHandler {
    public readonly blockchain = Constants.Ethereum;

    getBlockMiner(block: Block): string | undefined {
        const rewardOperation = this.getBlockRewardOperation(block);
        return rewardOperation?.account?.address;
    }

    getBlockRewardOperation(block: Block): Operation | undefined {
        return block.transactions.flatMap((t) => t.operations?.find((o) => o.type == 'MINER_REWARD')).find((i) => i);
    }

    getBasicTransactionInfo(transaction: Transaction): BasicTransactionInfo {
        // find better way to get the network native currency
        const currency = transaction.operations.flatMap((o) => o.amount?.currency).find((i) => i);
        const metadata = transaction.metadata as any;
        const from = metadata?.trace?.from?.toString();
        const to = metadata?.trace?.to?.toString();
        const value = metadata?.trace?.value?.toString();
        const amount =
            value && currency
                ? {
                      value: value,
                      currency: currency,
                  }
                : undefined;
        return _.omitBy(
            {
                from,
                to,
                amount,
            },
            (v) => _.isUndefined(v) || _.isNull(v)
        );
    }
}
