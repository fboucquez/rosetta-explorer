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
import { NetworkHandler } from '@services/NetworkHandler';
import { NetworkHandlerDefault } from '@services/NetworkHandlerDefault';
import { NetworkHandlerEthereum } from '@services/NetworkHandlerEthereum';

export class NetworkManager {
    private readonly defaultHandler = new NetworkHandlerDefault();
    private readonly handlers: Record<string, NetworkHandler> = {};
    constructor() {
        this.addHandler(new NetworkHandlerEthereum());
    }

    addHandler(handler: NetworkHandler): void {
        this.handlers[handler.blockchain] = handler;
    }
    getHandler(blockchain: string): NetworkHandler {
        return this.handlers[blockchain] || this.defaultHandler;
    }
}
