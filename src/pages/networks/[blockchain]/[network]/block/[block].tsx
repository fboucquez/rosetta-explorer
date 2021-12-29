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
import BlockPage from '@components/block/BlockPage';
import NetworkErrorPage from '@components/error/NetworkErrorPage';
import Explorer from '@components/layout/Explorer';
import { Utils } from '@services/Utils';
import { useRouter } from 'next/router';
import { BlockResponse } from 'rosetta-client-typescript';
const BlockPageRoute = ({ blockResponse }: { blockResponse?: BlockResponse }) => {
    const router = useRouter();
    const { blockchain, network, block } = router.query;
    if (!blockchain || !network || !block) {
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
    return (
        <Explorer network={network.toString()} blockchain={blockchain.toString()}>
            <BlockPage
                network={network.toString()}
                blockchain={blockchain.toString()}
                index={parseInt(block.toString())}
                blockResponse={blockResponse}
            />
        </Explorer>
    );
};

export async function getServerSideProps(context: any) {
    const { blockchain, network, block }: { blockchain: string; network: string; block: string } = context.query;
    if (!blockchain || !network || !block) {
        return { props: {} };
    }
    const index = parseInt(block.toString());
    if (!Number.isInteger(index)) {
        return { props: {} };
    }
    const rosettaRestClientFactory = rosettaClientFactory.get(blockchain);

    const networkIdentifier = { network, blockchain };
    const blockIdentifier = { index: index };
    const blockResponse = await rosettaRestClientFactory
        .block()
        .block({ block_identifier: blockIdentifier, network_identifier: networkIdentifier })
        .catch(() => null);
    return Utils.processDataForServerSideRendering({ props: { blockResponse: blockResponse } });
}
export default BlockPageRoute;
