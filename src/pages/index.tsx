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
import NetworksPage from '@components/network/NetworksPage';
import { Utils } from '@services/Utils';
import { NetworkIdentifier } from 'rosetta-client-typescript';
const HomePageRoute = ({ networks }: { networks: NetworkIdentifier[] }) => {
    return <NetworksPage networks={networks} />;
};

export async function getServerSideProps() {
    const rosettaClients = rosettaClientFactory.getAll();
    const networks = await Promise.all(
        rosettaClients.map((rosettaRestClientFactory) => rosettaRestClientFactory.network().networkList({}))
    ).then((responses) => {
        const list: NetworkIdentifier[] = [];
        return responses.reduce((acc, ids) => [...acc, ...ids.network_identifiers], list);
    });
    return {
        props: {
            networks: Utils.processDataForServerSideRendering(networks),
        },
    };
}
export default HomePageRoute;
