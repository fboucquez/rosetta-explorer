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
import BlocksPage from '@components/block/BlocksPage';
import NetworkErrorPage from '@components/error/NetworkErrorPage';
import Explorer from '@components/layout/Explorer';
import { BlockRowInformation, BlockUtils } from '@services/BlockUtils';
import { Constants } from '@services/Constants';
import { Utils } from '@services/Utils';
import { useRouter } from 'next/router';
const BlocksPageRoute = ({
    blocks,
    maxBlock,
    currentBlock,
}: {
    blocks?: BlockRowInformation[];
    maxBlock: number;
    currentBlock: number;
}) => {
    const router = useRouter();
    const { blockchain, network } = router.query;
    if (!blockchain || !network) {
        return <span />;
    }
    if (!blocks || !maxBlock || !currentBlock) {
        return (
            <NetworkErrorPage
                network={network.toString()}
                blockchain={blockchain.toString()}
                message={`Blocks for network could not be found!`}
            />
        );
    }
    return (
        <Explorer network={network.toString()} blockchain={blockchain.toString()}>
            <BlocksPage
                network={network.toString()}
                blockchain={blockchain.toString()}
                blocks={blocks}
                maxBlock={maxBlock}
                pageSize={Constants.PAGE_SIZE}
                currentBlock={currentBlock}
            />
        </Explorer>
    );
};

export async function getServerSideProps(context: any) {
    const { blockchain, network, pageNumber }: { blockchain: string; network: string; pageNumber?: string } = context.query;
    if (!blockchain || !network) {
        return { props: {} };
    }
    const networkIdentifier = { network, blockchain };
    const rosettaRestClientFactory = rosettaClientFactory.get(blockchain);

    const networkStatus = await rosettaRestClientFactory
        .network()
        .networkStatus({
            network_identifier: networkIdentifier,
        })
        .catch((e: Error) => null);
    if (!networkStatus) {
        return { props: {} };
    }
    const pageSize = Constants.PAGE_SIZE;
    const pageIndex = (parseInt(pageNumber?.toString() || '1') || 1) - 1;
    const maxBlock = networkStatus.current_block_identifier.index;
    const index = maxBlock - pageIndex * pageSize;

    const networkHandler = networkManager.getHandler(blockchain);
    // UGLY way, use some kind of block paginated search once rosetta provides it.
    const blockResponses = await BlockUtils.getBlocks({
        rosettaRestClientFactory,
        fromIndex: index,
        total: pageSize,
        networkIdentifier: networkIdentifier,
    });
    return Utils.processDataForServerSideRendering({
        props: {
            maxBlock: maxBlock,
            currentBlock: index,
            blocks: blockResponses.map((blockResponse) => BlockUtils.fromBlockToRow({ networkHandler, blockResponse })),
        },
    });
}
export default BlocksPageRoute;
