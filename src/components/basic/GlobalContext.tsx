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
import { NetworkManager } from '@services/NetworkManager';
import { RosettaClientFactory } from '@services/RosettaClientFactory';
import { createContext, ReactNode } from 'react';

const networksCsv = process.env.NEXT_PUBLIC_NETWORKS;
if (!networksCsv) {
    throw new Error('Env NEXT_PUBLIC_NETWORKS could not be resolved!');
}
export const rosettaClientFactory = RosettaClientFactory.createFromCSV(networksCsv);
export const RosettaClientFactoryContext = createContext(rosettaClientFactory);
export const networkManager = new NetworkManager();
export const NetworkManagerContext = createContext(networkManager);

export default function GlobalContext(props: { children?: ReactNode }) {
    return (
        <NetworkManagerContext.Provider value={networkManager}>
            <RosettaClientFactoryContext.Provider value={rosettaClientFactory}>{props.children}</RosettaClientFactoryContext.Provider>
        </NetworkManagerContext.Provider>
    );
}
