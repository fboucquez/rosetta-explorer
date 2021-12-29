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
import { RosettaRestClientFactory } from 'rosetta-client-typescript';

export class RosettaClientFactory {
    public static createFromCSV(networksCSV: string): RosettaClientFactory {
        const clients: Record<string, RosettaRestClientFactory> = {};
        networksCSV.split(',').map((networkProperties) => {
            const networkPropertiesValues = networkProperties.split('=');
            clients[networkPropertiesValues[0]] = new RosettaRestClientFactory({ url: networkPropertiesValues[1] });
        });
        return new RosettaClientFactory(clients);
    }

    constructor(private readonly clients: Record<string, RosettaRestClientFactory>) {}

    public get(blockchain: string): RosettaRestClientFactory {
        const client = this.clients[blockchain];
        if (!client) {
            throw new Error(`Client for blockchain ${blockchain} does not exist!`);
        }
        return client;
    }

    public getAll(): RosettaRestClientFactory[] {
        return Object.values(this.clients);
    }
}
