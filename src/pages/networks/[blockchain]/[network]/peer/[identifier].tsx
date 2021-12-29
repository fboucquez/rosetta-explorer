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
import PeerPage from '@components/peer/PeerPage';
import { Utils } from '@services/Utils';
import { useRouter } from 'next/router';
import { Peer as PeerData } from 'rosetta-client-typescript';
const PeerPageRoute = ({ peer }: { peer?: PeerData }) => {
    const router = useRouter();
    const { blockchain, network, identifier } = router.query;
    if (!blockchain || !network) {
        return <span />;
    }
    if (!peer) {
        return (
            <NetworkErrorPage
                network={network.toString()}
                blockchain={blockchain.toString()}
                message={`Peer with id ${identifier} not found`}
            />
        );
    }
    return (
        <Explorer network={network.toString()} blockchain={blockchain.toString()}>
            <PeerPage network={network.toString()} blockchain={blockchain.toString()} peer={peer} />
        </Explorer>
    );
};

export async function getServerSideProps(context: any) {
    const { blockchain, network, identifier }: { blockchain: string; network: string; identifier: string } = context.query;
    if (!blockchain || !network || !identifier) {
        return {
            props: {},
        };
    }
    const rosettaRestClientFactory = rosettaClientFactory.get(blockchain);
    const networkIdentifier = { network, blockchain };
    const networkStatusResponse = await rosettaRestClientFactory
        .network()
        .networkStatus({
            network_identifier: networkIdentifier,
        })
        .catch(() => null);
    const peer = networkStatusResponse?.peers.find((p) => p.peer_id == identifier) || null;

    return Utils.processDataForServerSideRendering({ props: { peer } });
}

export default PeerPageRoute;
