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
import { networkManager, rosettaClientFactory } from '@components/basic/GlobalContext';
import NetworkErrorPage from '@components/error/NetworkErrorPage';
import Explorer from '@components/layout/Explorer';
import TransactionsPage from '@components/transaction/TransactionsPage';
import { BlockUtils } from '@services/BlockUtils';
import { Constants } from '@services/Constants';
import { TransactionRowInformation } from '@services/TransactionUtils';
import { Utils } from '@services/Utils';
import { useRouter } from 'next/router';

const TransactionsPageRoute = ({ transactionRows }: { transactionRows?: TransactionRowInformation[] }) => {
    const router = useRouter();
    const { blockchain, network } = router.query;
    if (!blockchain || !network) {
        return <span />;
    }
    if (!transactionRows) {
        return (
            <NetworkErrorPage
                network={network.toString()}
                blockchain={blockchain.toString()}
                message={`Transactions for network could not be found!`}
            />
        );
    }
    return (
        <Explorer network={network.toString()} blockchain={blockchain.toString()}>
            <TransactionsPage network={network.toString()} blockchain={blockchain.toString()} transactions={transactionRows} />
        </Explorer>
    );
};

export async function getServerSideProps(context: any) {
    const { blockchain, network, fromBlock }: { blockchain: string; network: string; fromBlock?: string } = context.query;
    if (!blockchain || !network) {
        return { props: {} };
    }
    const networkIdentifier = { network, blockchain };
    const rosettaRestClientFactory = rosettaClientFactory.get(blockchain);
    let index = parseInt(fromBlock?.toString() || '');
    if (!Number.isInteger(index)) {
        const networkStatus = await rosettaRestClientFactory
            .network()
            .networkStatus({
                network_identifier: networkIdentifier,
            })
            .catch((e: Error) => null);
        if (!networkStatus) {
            return { props: {} };
        }
        index = networkStatus.current_block_identifier.index;
    }

    //Ugly way, use transactions/search once https://github.com/coinbase/rosetta-ethereum/issues/94 is fixed.
    //OFC other implementations may have that search already, replace when testing another blockchain.
    const networkHandler = networkManager.getHandler(blockchain);
    const blockResponses = await BlockUtils.getBlocks({
        rosettaRestClientFactory,
        fromIndex: index,
        total: Constants.PAGE_SIZE,
        networkIdentifier: networkIdentifier,
    });
    const transactionRows = BlockUtils.getTransactions(Constants.PAGE_SIZE, networkHandler, blockResponses);
    return Utils.processDataForServerSideRendering({
        props: {
            transactionRows: transactionRows,
        },
    });
}

export default TransactionsPageRoute;
