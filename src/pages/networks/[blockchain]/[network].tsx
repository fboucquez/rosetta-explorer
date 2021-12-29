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
import GenericErrorPage from '@components/error/GenericErrorPage';
import Explorer from '@components/layout/Explorer';
import NetworkPage from '@components/network/NetworkPage';
import { BlockRowInformation, BlockUtils } from '@services/BlockUtils';
import { Constants } from '@services/Constants';
import { TransactionRowInformation } from '@services/TransactionUtils';
import { Utils } from '@services/Utils';
import { useRouter } from 'next/router';
import { NetworkOptionsResponse, NetworkStatusResponse } from 'rosetta-client-typescript';

const NetworkPageRoute = ({
    transactions,
    blocks,
    networkStatus,
    networkOptions,
}: {
    transactions?: TransactionRowInformation[];
    blocks?: BlockRowInformation[];
    networkStatus?: NetworkStatusResponse;
    networkOptions?: NetworkOptionsResponse;
}) => {
    const router = useRouter();
    const { blockchain, network } = router.query;

    if (!blockchain || !network) {
        return <span />;
    }
    if (!networkStatus) {
        return <GenericErrorPage message={`Network status for ${network.toString()} ${blockchain.toString()} not found`} />;
    }

    if (!networkOptions) {
        return <GenericErrorPage message={`Network options for ${network.toString()} ${blockchain.toString()} not found`} />;
    }

    if (!blocks) {
        return <GenericErrorPage message={`Blocks for ${network.toString()} ${blockchain.toString()} cannot be resolved`} />;
    }
    if (!transactions) {
        return <GenericErrorPage message={`Blocks for ${network.toString()} ${blockchain.toString()} cannot be resolved`} />;
    }

    return (
        <Explorer network={network.toString()} blockchain={blockchain.toString()}>
            <NetworkPage
                network={network.toString()}
                blockchain={blockchain.toString()}
                networkStatus={networkStatus}
                networkOptions={networkOptions}
                transactions={transactions}
                blocks={blocks}
            />
        </Explorer>
    );
};

export async function getServerSideProps(context: any) {
    const { blockchain, network }: { blockchain: string; network: string } = context.query;
    if (!blockchain || !network) {
        return {};
    }
    const rosettaRestClientFactory = rosettaClientFactory.get(blockchain);
    const networkIdentifier = { network, blockchain };
    const networkStatus = await rosettaRestClientFactory
        .network()
        .networkStatus({
            network_identifier: networkIdentifier,
        })
        .catch(() => null);
    const networkOptions = await rosettaRestClientFactory
        .network()
        .networkOptions({
            network_identifier: networkIdentifier,
        })
        .catch(() => null);
    if (!networkStatus) {
        return { props: {} };
    }
    const blockResponses = await BlockUtils.getBlocks({
        rosettaRestClientFactory: rosettaRestClientFactory,
        fromIndex: networkStatus.current_block_identifier.index,
        networkIdentifier: networkIdentifier,
        total: Constants.MAX_TABLE_ELEMENTS,
    });
    const networkHandler = networkManager.getHandler(blockchain.toString());
    const transactions = BlockUtils.getTransactions(Constants.MAX_TABLE_ELEMENTS, networkHandler, blockResponses);
    const blocks = blockResponses?.map((blockResponse) => BlockUtils.fromBlockToRow({ networkHandler, blockResponse }));
    return Utils.processDataForServerSideRendering({ props: { networkStatus, networkOptions, blocks, transactions } });
}

export default NetworkPageRoute;
