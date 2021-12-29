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
import { rosettaClientFactory } from '@components/basic/GlobalContext';
import NetworkErrorPage from '@components/error/NetworkErrorPage';
import Explorer from '@components/layout/Explorer';
import TransactionPage from '@components/transaction/TransactionPage';
import { Utils } from '@services/Utils';
import { useRouter } from 'next/router';
import { BlockResponse, Transaction } from 'rosetta-client-typescript';
const TransactionPageRoute = ({ blockResponse, transaction }: { blockResponse?: BlockResponse; transaction?: Transaction }) => {
    const router = useRouter();
    const { blockchain, network, block, hash } = router.query;
    if (!blockchain || !network || !block || !hash) {
        return <span />;
    }
    if (!blockResponse?.block) {
        return (
            <NetworkErrorPage
                network={network.toString()}
                blockchain={blockchain.toString()}
                message={`Block with index ${block} not found`}
            />
        );
    }
    if (!transaction) {
        return (
            <NetworkErrorPage
                network={network.toString()}
                blockchain={blockchain.toString()}
                message={`Transaction with hash ${hash} not found`}
            />
        );
    }
    return (
        <Explorer network={network.toString()} blockchain={blockchain.toString()}>
            <TransactionPage
                network={network.toString()}
                blockchain={blockchain.toString()}
                index={parseInt(block.toString())}
                hash={hash.toString()}
                blockResponse={blockResponse}
                transaction={transaction}
            />
        </Explorer>
    );
};

export async function getServerSideProps(context: any) {
    const { blockchain, network, block, hash }: { blockchain: string; network: string; block: string; hash: string } = context.query;
    if (!blockchain || !network || !block || !hash) {
        return { props: {} };
    }
    const index = parseInt(block.toString());
    if (!Number.isInteger(index)) {
        return { props: {} };
    }
    const rosettaRestClientFactory = rosettaClientFactory.get(blockchain);
    const networkIdentifier = { network, blockchain };
    const blockIdentifier = { index: index };
    const blockResponse: BlockResponse | null = await rosettaRestClientFactory
        .block()
        .block({ block_identifier: blockIdentifier, network_identifier: networkIdentifier })
        .catch(() => null);

    if (!blockResponse?.block?.transactions) {
        return { props: {} };
    }
    const transaction = blockResponse.block?.transactions.find((t) => t.transaction_identifier.hash == hash) || null;
    blockResponse.block.transactions = []; //reducing the size for ssr
    return Utils.processDataForServerSideRendering({ props: { blockResponse: blockResponse, transaction: transaction } });
}

export default TransactionPageRoute;
