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
import { NetworkIdentifier } from 'rosetta-client-typescript';

export type PeerIdentifierViewParams = NetworkIdentifier & { peerId: string };

export default function PeerIdentifierView(props: PeerIdentifierViewParams & { name?: string }) {
    return (
        <a href={`/networks/${props.blockchain}/${props.network}/peer/${props.peerId}`}>
            <span title={props.peerId}>{props.name || props.peerId}</span>
        </a>
    );
}
